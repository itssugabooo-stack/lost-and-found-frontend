import React, { useEffect, useState } from "react";
import "../App.css";

export default function ReportModal({ type = "lost", onClose, onSubmit }) {
  const isLost = type === "lost";

  const [form, setForm] = useState({
    itemName: "",
    category: "",
    description: "",
    location: "",
    date: "",
    yourName: "",
    email: "",
  });

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const set = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.({ ...form, type });
  };

  return (
    <div className="modalOverlay" onMouseDown={onClose}>
      <div className="modalCard" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modalHead">
          <div>
            <h2 className="modalTitle">
              {isLost ? "Report Lost Item" : "Report Found Item"}
            </h2>
            <p className="modalSub">
              {isLost
                ? "Fill in the details to help reunite you with your item."
                : "Fill in the details to help reunite the item with its owner."}
            </p>
          </div>

          <button className="modalClose" type="button" onClick={onClose}>
            ✕
          </button>
        </div>

        <form className="modalBody" onSubmit={handleSubmit}>
          <label className="modalLabel">Item Name *</label>
          <input
            className="modalInput"
            placeholder="e.g., Black Leather Wallet"
            value={form.itemName}
            onChange={set("itemName")}
            required
          />

          <label className="modalLabel">Category *</label>
          <select
            className="modalInput"
            value={form.category}
            onChange={set("category")}
            required
          >
            <option value="">Select category</option>
            <option>Accessories</option>
            <option>Bags</option>
            <option>Keys</option>
            <option>Electronics</option>
            <option>Pets</option>
            <option>Documents</option>
            <option>Other</option>
          </select>

          <label className="modalLabel">Description *</label>
          <textarea
            className="modalTextarea"
            placeholder="Provide detailed information about the item..."
            value={form.description}
            onChange={set("description")}
            required
          />

          <label className="modalLabel">Location *</label>
          <input
            className="modalInput"
            placeholder="e.g., Central Park, New York"
            value={form.location}
            onChange={set("location")}
            required
          />

          <label className="modalLabel">
            {isLost ? "Date Lost *" : "Date Found *"}
          </label>
          <input
            className="modalInput"
            type="date"
            value={form.date}
            onChange={set("date")}
            required
          />

          <div className="modalDivider" />

          <h3 className="modalSectionTitle">Contact Information</h3>

          <label className="modalLabel">Your Name *</label>
          <input
            className="modalInput"
            placeholder="John Doe"
            value={form.yourName}
            onChange={set("yourName")}
            required
          />

          <label className="modalLabel">Email *</label>
          <input
            className="modalInput"
            type="email"
            placeholder="john@example.com"
            value={form.email}
            onChange={set("email")}
            required
          />

          <div className="modalActions">
            <button className="modalBtn outline" type="button" onClick={onClose}>
              Cancel
            </button>
            <button className="modalBtn primary" type="submit">
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
