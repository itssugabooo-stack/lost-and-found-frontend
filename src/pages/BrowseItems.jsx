import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ReportModal from "../components/ReportModal";
import ItemDetailModal from "../components/ItemDetailModal";
import { useAuth } from "../hooks/useAuth.js";
import { apiRequest } from "../lib/api.js";
import {
  formatDate,
  formatRole,
  formatStatus,
} from "../lib/formatters.js";
import "../App.css";

export default function BrowseItems() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, token, isAuthenticated, logout } = useAuth();
  const [reportOpen, setReportOpen] = useState(false);
  const [reportType, setReportType] = useState("lost");
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedItemDetail, setSelectedItemDetail] = useState(null);
  const [items, setItems] = useState([]);
  const [statsItems, setStatsItems] = useState([]);
  const [q, setQ] = useState(() => searchParams.get("q") || "");
  const [cat, setCat] = useState(() => searchParams.get("category") || "All Categories");
  const [tab, setTab] = useState(() => searchParams.get("report_type")?.toLowerCase() || "all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionMessage, setActionMessage] = useState("");

  useEffect(() => {
    const nextQ = searchParams.get("q") || "";
    const nextCategory = searchParams.get("category") || "All Categories";
    const nextTab = searchParams.get("report_type")?.toLowerCase() || "all";

    setQ((current) => (current === nextQ ? current : nextQ));
    setCat((current) => (current === nextCategory ? current : nextCategory));
    setTab((current) => (current === nextTab ? current : nextTab));
  }, [searchParams]);

  useEffect(() => {
    const nextParams = {};

    if (q) {
      nextParams.q = q;
    }

    if (cat !== "All Categories") {
      nextParams.category = cat;
    }

    if (tab !== "all") {
      nextParams.report_type = tab.toUpperCase();
    }

    const currentParams = Object.fromEntries(searchParams.entries());
    const currentValue = new URLSearchParams(currentParams).toString();
    const nextValue = new URLSearchParams(nextParams).toString();

    if (currentValue !== nextValue) {
      setSearchParams(nextParams, { replace: true });
    }
  }, [cat, q, searchParams, setSearchParams, tab]);

  const loadItems = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await apiRequest("/items", {
        params: {
          q,
          category: cat === "All Categories" ? undefined : cat,
          report_type: tab === "all" ? undefined : tab.toUpperCase(),
        },
      });
      setItems(data);
    } catch (nextError) {
      setError(nextError.message);
    } finally {
      setLoading(false);
    }
  }, [cat, q, tab]);

  const loadStatsItems = useCallback(async () => {
    try {
      const data = await apiRequest("/items", {
        params: {
          q,
          category: cat === "All Categories" ? undefined : cat,
        },
      });
      setStatsItems(data);
    } catch (nextError) {
      setError(nextError.message);
    }
  }, [cat, q]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  useEffect(() => {
    loadStatsItems();
  }, [loadStatsItems]);

  useEffect(() => {
    if (!selectedItemId) {
      setSelectedItemDetail(null);
      return;
    }

    let cancelled = false;

    apiRequest(`/items/${selectedItemId}`)
      .then((item) => {
        if (!cancelled) {
          setSelectedItemDetail(item);
        }
      })
      .catch((nextError) => {
        if (!cancelled) {
          setError(nextError.message);
          setSelectedItemId(null);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [selectedItemId]);

  const categories = useMemo(() => {
    const values = new Set(statsItems.map((item) => item.category));
    return ["All Categories", ...Array.from(values).sort()];
  }, [statsItems]);

  const tabTotal = statsItems.length;
  const tabLostCount = statsItems.filter((item) => item.report_type === "LOST").length;
  const tabFoundCount = statsItems.filter((item) => item.report_type === "FOUND").length;
  const visibleTotal = items.length;
  const visibleLostCount = items.filter((item) => item.report_type === "LOST").length;
  const visibleFoundCount = items.filter((item) => item.report_type === "FOUND").length;

  const handleCreateItem = async (payload) => {
    if (!isAuthenticated) {
      navigate("/signin");
      return;
    }

    await apiRequest("/items", {
      method: "POST",
      token,
      body: payload,
    });

    setReportOpen(false);
    setActionMessage("Report submitted successfully.");
    await Promise.all([loadItems(), loadStatsItems()]);
  };

  return (
    <div className="browsePage">
      <header className="browseNav">
        <div className="container browseNavRow premiumNavRow">
          <div className="brandRow premiumBrand clickable" onClick={() => navigate("/")}> 
            <div className="brandIcon"><img src="/location.png" alt="location" /></div>
            <div>
              <div className="brandName">Lost &amp; Found</div>
              <div className="browseSub">Verified recovery network</div>
            </div>
          </div>

          <div className="navCenter appNavCenter">
            <button className="navLinkBtn active" type="button" onClick={() => navigate("/browse")}>Browse</button>
            {isAuthenticated && <button className="navLinkBtn" type="button" onClick={() => navigate("/my-posts")}>Reports</button>}
            {isAuthenticated && <button className="navLinkBtn" type="button" onClick={() => navigate("/my-claims")}>Claims</button>}
          </div>

          <div className="browseNavRight">
            {isAuthenticated && (
              <>
                <button
                  className="pillBtn"
                  type="button"
                  onClick={() => {
                    setReportType("lost");
                    setReportOpen(true);
                  }}
                >
                  + Report Lost Item
                </button>

                <button
                  className="pillBtn"
                  type="button"
                  onClick={() => {
                    setReportType("found");
                    setReportOpen(true);
                  }}
                >
                  + Report Found Item
                </button>
              </>
            )}

            {isAuthenticated ? (
              <>
                <div className="userChip">
                  <span className="userDot" />
                  {user.email} ({formatRole(user.role)})
                </div>
                <button className="pillBtn" type="button" onClick={logout}>
                  Sign Out
                </button>
              </>
            ) : (
              <button className="pillBtn" type="button" onClick={() => navigate("/signin")}>
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      <section className="browseHero">
        <div className="container browseHeroInner">
          <div className="eyebrow">Live item intelligence</div>
          <h1>Find, report, and recover lost property</h1>
           <p>Browse real item reports, inspect richer case details, and submit verified claims when you find a match.</p>

          <div className="browseSearchRow">
            <div className="searchBox">
              <span className="searchIcon">?</span>
              <input
                value={q}
                onChange={(event) => setQ(event.target.value)}
                className="searchInput"
                placeholder="Search by title, description, or location"
              />
            </div>

            <select className="selectBox" value={cat} onChange={(event) => setCat(event.target.value)}>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select className="selectBox" value={tab} onChange={(event) => setTab(event.target.value)}>
              <option value="all">All Reports</option>
              <option value="lost">Lost Reports</option>
              <option value="found">Found Reports</option>
            </select>
          </div>
        </div>
      </section>

      <section className="browseStats">
        <div className="container statsGrid">
          <div className="stat">
            <div className="statNum">{visibleTotal}</div>
            <div className="statLabel">Visible Reports</div>
          </div>
          <div className="stat">
            <div className="statNum">{visibleLostCount}</div>
            <div className="statLabel">Lost Reports</div>
          </div>
          <div className="stat">
            <div className="statNum">{visibleFoundCount}</div>
            <div className="statLabel">Found Reports</div>
          </div>
        </div>
      </section>

      <section className="browseTabsWrap">
        <div className="container browseControlPanel">
          <div>
            <div className="controlKicker">Current View</div>
            <h2 className="controlTitle">{tab === "all" ? "All visible reports" : tab === "lost" ? "Lost reports" : "Found reports"}</h2>
          </div>
          <div className="segTabs">
            <button className={`segTab ${tab === "all" ? "active" : ""}`} onClick={() => setTab("all")}>
              All ({tabTotal})
            </button>
            <button className={`segTab ${tab === "lost" ? "active" : ""}`} onClick={() => setTab("lost")}>
              Lost ({tabLostCount})
            </button>
            <button className={`segTab ${tab === "found" ? "active" : ""}`} onClick={() => setTab("found")}>
              Found ({tabFoundCount})
            </button>
          </div>
        </div>
      </section>

      <section className="browseGridSection">
        <div className="container">
          {actionMessage && <div className="formMessage success">{actionMessage}</div>}
          {error && <div className="formMessage error">{error}</div>}

          {loading ? (
            <div className="emptyState">Loading items...</div>
          ) : items.length === 0 ? (
            <div className="emptyState">No items matched the current filters.</div>
          ) : (
            <div className="itemsGrid">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="itemCard surfaceCard"
                  onClick={() => setSelectedItemId(item.id)}
                  style={{ cursor: "pointer" }}
                  >
                    <img className="itemImg" src={item.image_urls?.[0] || "/seco.png"} alt={item.title} />

                  <div className="itemBody">
                    <div className="itemTop">
                      <h3 className="itemTitle">{item.title}</h3>
                      <span className={`badge statusBadge ${item.report_type.toLowerCase()}`}>
                        {item.report_type === "LOST" ? "Lost" : "Found"}
                      </span>
                    </div>

                    <p className="itemDesc">{item.description_public}</p>

                    <div className="meta">
                      <div className="metaRow">Location: {item.location_text}</div>
                      <div className="metaRow">Report Type: {item.report_type === "LOST" ? "Lost" : "Found"}</div>
                      <div className="metaRow">Date: {formatDate(item.happened_at)}</div>
                      <div className="metaRow">Category: {item.category}</div>
                      <div className="metaRow">Brand / Color: {[item.brand, item.color].filter(Boolean).join(" / ") || "Unknown"}</div>
                      <div className="metaRow">Status: {formatStatus(item.status)}</div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <footer className="browseFooter">
        <div className="browseFooterInner">
          <div className="brandRow">
            <div className="brandIcon">
              <img src="/location.png" alt="location icon" />
            </div>
            <div className="brandName">Lost &amp; Found</div>
          </div>

          <div className="browseFooterText">
            Search, reporting, and claim verification are now backed by the live API.
          </div>
        </div>
      </footer>

      {reportOpen && (
        <ReportModal
          type={reportType}
          onClose={() => setReportOpen(false)}
          onSubmit={handleCreateItem}
        />
      )}

      {selectedItemId && selectedItemDetail && (
        <ItemDetailModal
          item={selectedItemDetail}
          onClose={() => setSelectedItemId(null)}
          onClaimSubmitted={async () => {
            setActionMessage("Claim submitted successfully.");
            setSelectedItemId(null);
            await loadItems();
          }}
        />
      )}
    </div>
  );
}
