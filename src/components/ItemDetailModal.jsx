import React, { useEffect } from "react";
import "../App.css";

export default function ItemDetailModal({ item, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!item) return null;

  return (
    <div className="modalOverlay" onMouseDown={onClose}>
      <div className="modalCard" onMouseDown={(e) => e.stopPropagation()}>
        <button className="modalClose" onClick={onClose} type="button">
          ×
        </button>

        <div className="detailHeader">
          <div>
            <h2 className="detailTitle">{item.title}</h2>
            <div className="detailSub">Posted on {item.date}</div>
          </div>

          <span className={`detailBadge ${item.status}`}>
            {item.status === "lost" ? "Lost" : "Found"}
          </span>
        </div>

        <div className="detailImgWrap">
          <img className="detailImg" src={item.image} alt={item.title} />
        </div>

        <h3 className="detailSectionTitle">Description</h3>
        <p className="detailDescFull">
          {item.fullDesc || item.desc}
        </p>

        <div className="detailGrid">
          <div className="detailCell">
            <div className="detailLabel">Location</div>
            <div className="detailValue">{item.location}</div>
          </div>

          <div className="detailCell">
            <div className="detailLabel">Category</div>
            <div className="detailValue">{item.category}</div>
          </div>

          <div className="detailCell">
            <div className="detailLabel">Date</div>
            <div className="detailValue">{item.date}</div>
          </div>

          <div className="detailCell">
            <div className="detailLabel">Contact</div>
            <div className="detailValue">{item.contactName || "John Doe"}</div>
          </div>
        </div>

        <h3 className="detailSectionTitle">Contact Information</h3>

        <div className="detailActions">
          <button className="detailActionBtn" type="button">
            ✉️ Send Email
          </button>
          <button className="detailActionBtn" type="button">
            📞 Call/Text
          </button>
        </div>
      </div>
    </div>
  );
}
