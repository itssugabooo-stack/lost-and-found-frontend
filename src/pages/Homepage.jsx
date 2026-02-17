import React from "react";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import Input from "../components/Input";
import "../App.css";
import { useNavigate } from "react-router-dom";



export default function Homepage() {
  const navigate = useNavigate();
  return (
    <div className="app">
      <Navbar />

      <section className="hero">
        <div className="container heroGrid">
          <div className="heroText">
            <h1>Reunite With What You've Lost</h1>
            <p>
              A community-driven platform helping people find their lost items
              and return found belongings to their rightful owners.
            </p>

            <div className="heroActions">
              <Button variant="primary">Report Lost Item →</Button>

              <div className="heroSearch">
                <Input placeholder="Search items (phone, wallet, bag...)" />
                <Button variant="ghost">Search</Button>
              </div>
            </div>
          </div>

          <div className="heroMedia">
            <img
              src="/seco.png"
              alt="Lost item"
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="sectionHead">
            <h2>Why Choose Lost &amp; Found?</h2>
            <p>Our platform makes it easy to report, search, and reunite with lost items</p>
          </div>

          <div className="cardGrid">
            <div className="card">
              <div className="iconBubble">🔎</div>
              <h3>Easy Search</h3>
              <p>Search through lost and found items with filters and keywords.</p>
            </div>

            <div className="card">
              <div className="iconBubble">🔔</div>
              <h3>Instant Alerts</h3>
              <p>Get notified when someone reports an item matching your description.</p>
            </div>

            <div className="card">
              <div className="iconBubble">🛡️</div>
              <h3>Secure Platform</h3>
              <p>We protect your privacy and only share contact info when you’re ready.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="sectionHead">
            <h2>How It Works</h2>
            <p>Three simple steps to reunite with your belongings</p>
          </div>

          <div className="steps">
            <div className="step">
              <div className="stepNum">1</div>
              <div className="stepTitle">Report Your Item</div>
              <div className="stepDesc">Post details with photos, location, and description.</div>
            </div>

            <div className="step">
              <div className="stepNum">2</div>
              <div className="stepTitle">Browse &amp; Match</div>
              <div className="stepDesc">Search our database or wait for potential matches.</div>
            </div>

            <div className="step">
              <div className="stepNum">3</div>
              <div className="stepTitle">Reunite &amp; Celebrate</div>
              <div className="stepDesc">Connect safely with the finder/owner to return the item.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container ctaBox">
          <h2>Ready to Find What You've Lost?</h2>
          <p>Join our community today and start your journey to reunite with your belongings</p>

          <div className="ctaActions">
            <Button variant="primary" onClick={() => navigate("/signin")}>
              Get Started Now →
            </Button>

            <Button variant="outline">Browse Items</Button>
          </div>
        </div>

        <footer className="footer">
          <div className="container footerGrid">
            <div>
              <div className="brandRow">
                <div className="brandIcon"><img src="/location.png" alt="location" /></div>
                <div className="brandName">Lost &amp; Found</div>
              </div>
              <p className="muted">
                Helping communities reunite with their lost belongings since 2026.
              </p>
            </div>

            <div>
              <h4>Quick Links</h4>
              <ul>
                <li>Home</li>
                <li>Browse Items</li>
                <li>How It Works</li>
                <li>About Us</li>
              </ul>
            </div>

            <div>
              <h4>Support</h4>
              <ul>
                <li>Help Center</li>
                <li>Safety Tips</li>
                <li>Contact Us</li>
                <li>FAQ</li>
              </ul>
            </div>

            <div>
              <h4>Legal</h4>
              <ul>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Cookie Policy</li>
              </ul>
            </div>
          </div>
        </footer>
      </section>
    </div>
  );
}
