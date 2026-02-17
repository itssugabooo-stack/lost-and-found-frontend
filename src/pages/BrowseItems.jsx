import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import ReportModal from "../components/ReportModal";


const ITEMS = [
  {
    id: 1,
    title: "Black Leather Wallet",
    status: "lost",
    desc: "Black leather wallet with multiple card slots...",
    location: "Central Park",
    date: "Feb 15, 2026",
    category: "Accessories",
    image: "/seco.png",
  },
  {
    id: 2,
    title: "Blue Backpack",
    status: "found",
    desc: "Found a blue backpack with a laptop inside...",
    location: "Downtown Coffee Shop",
    date: "Feb 16, 2026",
    category: "Bags",
    image: "/seco.png",
  },
  {
    id: 3,
    title: "Purple Gym Bag",
    status: "found",
    desc: "Found a purple gym bag with workout clothes...",
    location: "Community Sports Center",
    date: "Feb 15, 2026",
    category: "Bags",
    image: "/seco.png",
  },
  {
    id: 4,
    title: "Car Keys with Tesla Fob",
    status: "lost",
    desc: "Lost my car keys with a Tesla key fob attached...",
    location: "Business District",
    date: "Feb 16, 2026",
    category: "Keys",
    image: "/seco.png",
  },
  {
    id: 5,
    title: "iPhone 15 Pro",
    status: "found",
    desc: "Found an iPhone 15 Pro in black color at the gym...",
    location: "FitLife Gym",
    date: "Feb 17, 2026",
    category: "Electronics",
    image: "/seco.png",
  },
];

export default function BrowseItems() {
  const [reportOpen, setReportOpen] = useState(false);
  const [reportType, setReportType] = useState("lost"); // "lost" | "found"

  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All Categories");
  const [tab, setTab] = useState("all"); // all | lost | found

  const categories = useMemo(() => {
    const set = new Set(ITEMS.map((i) => i.category));
    return ["All Categories", ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    const text = q.trim().toLowerCase();
    return ITEMS.filter((i) => {
      const tabOk = tab === "all" ? true : i.status === tab;
      const catOk = cat === "All Categories" ? true : i.category === cat;
      const qOk =
        !text ||
        i.title.toLowerCase().includes(text) ||
        i.desc.toLowerCase().includes(text) ||
        i.location.toLowerCase().includes(text);
      return tabOk && catOk && qOk;
    });
  }, [q, cat, tab]);

  const total = ITEMS.length;
  const lostCount = ITEMS.filter((i) => i.status === "lost").length;
  const foundCount = ITEMS.filter((i) => i.status === "found").length;

  return (
    <div className="browsePage">
      {/* Top Navbar */}
      <header className="browseNav">
        <div className="container browseNavRow">
          <div className="brandRow">
            <div className="brandIcon"><img src="/location.png" alt="location" /></div>
            <div>
              <div className="brandName">Lost &amp; Found</div>
              <div className="browseSub">Reuniting people with their belongings</div>
            </div>
          </div>

          <div className="browseNavRight">
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

            <div className="userChip">
              <span className="userDot" />
              chutheint.t65
            </div>
          </div>
        </div>
      </header>

      {/* Hero search */}
      <section className="browseHero">
        <div className="container browseHeroInner">
          <h1>Find What You've Lost</h1>
          <p>Browse through lost and found items or report something you've lost or found</p>

          <div className="browseSearchRow">
            <div className="searchBox">
              <span className="searchIcon">🔎</span>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="searchInput"
                placeholder="Search for items..."
              />
            </div>

            <select className="selectBox" value={cat} onChange={(e) => setCat(e.target.value)}>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select className="selectBox" value={tab} onChange={(e) => setTab(e.target.value)}>
              <option value="all">All Items</option>
              <option value="lost">Lost Items</option>
              <option value="found">Found Items</option>
            </select>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="browseStats">
        <div className="container statsGrid">
          <div className="stat">
            <div className="statNum">{total}</div>
            <div className="statLabel">Total Items</div>
          </div>
          <div className="stat">
            <div className="statNum">{lostCount}</div>
            <div className="statLabel">Lost Items</div>
          </div>
          <div className="stat">
            <div className="statNum">{foundCount}</div>
            <div className="statLabel">Found Items</div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="browseTabsWrap">
        <div className="container">
          <div className="segTabs">
            <button className={`segTab ${tab === "all" ? "active" : ""}`} onClick={() => setTab("all")}>
              All Items ({total})
            </button>
            <button className={`segTab ${tab === "lost" ? "active" : ""}`} onClick={() => setTab("lost")}>
              Lost ({lostCount})
            </button>
            <button className={`segTab ${tab === "found" ? "active" : ""}`} onClick={() => setTab("found")}>
              Found ({foundCount})
            </button>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="browseGridSection">
        <div className="container itemsGrid">
          {filtered.map((it) => (
            <article key={it.id} className="itemCard">
              <img className="itemImg" src={it.image} alt={it.title} />
              <div className="itemBody">
                <div className="itemTop">
                  <h3 className="itemTitle">{it.title}</h3>
                  <span className={`badge ${it.status}`}>{it.status === "lost" ? "Lost" : "Found"}</span>
                </div>

                <p className="itemDesc">{it.desc}</p>

                <div className="meta">
                  <div className="metaRow">📍 {it.location}</div>
                  <div className="metaRow">📅 {it.date}</div>
                  <div className="metaRow">🏷 {it.category}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="browseFooter">
  <div className="browseFooterInner">
    <div className="brandRow">
      <div className="brandIcon">
        <img src="./location.png" alt="location icon" />
      </div>
      <div className="brandName">Lost &amp; Found</div>
    </div>

    <div className="browseFooterText">
      Helping communities reunite with their lost belongings.
    </div>
  </div>
</footer>
          {reportOpen && (
  <ReportModal
    type={reportType}
    onClose={() => setReportOpen(false)}
    onSubmit={(data) => {
      console.log(data);
      setReportOpen(false);
    }}
  />
)}

    </div>
  );
}
