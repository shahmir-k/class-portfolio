import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://www.ct839.com/images/ctrc-logo-full.svg"
                alt="Caution Tape Robotics Club"
                style={{ height: 32 }}
              />
            </Link>
            <p>
              Fostering critical thinking, problem-solving, and decision-making skills while helping youth discover their passion for STEAM.
            </p>
            <div className="footer-tagline">DREAM THE IMPOSSIBLE //</div>
          </div>
          <div className="footer-col">
            <h4>Programs</h4>
            <a href="https://stemlabs.ct839.com" target="_blank" rel="noopener noreferrer">STEM Labs</a>
            <a href="https://vexiq.ct839.com" target="_blank" rel="noopener noreferrer">VEX IQ Competition</a>
            <a href="https://coding.ct839.com" target="_blank" rel="noopener noreferrer">Coding Program</a>
            <a href="https://maker.ct839.com" target="_blank" rel="noopener noreferrer">Maker Program</a>
            <a href="https://portfolio.ct839.com" target="_blank" rel="noopener noreferrer">Portfolio Pathway</a>
          </div>
          <div className="footer-col">
            <h4>Locations</h4>
            <a href="https://www.ct839.com/en/locations/markham" target="_blank" rel="noopener noreferrer">Markham</a>
            <a href="https://www.ct839.com/en/locations/toronto" target="_blank" rel="noopener noreferrer">Toronto</a>
            <a href="https://www.ct839.com/en/locations/newmarket" target="_blank" rel="noopener noreferrer">Newmarket</a>
            <a href="https://www.ct839.com/en/locations/oakville" target="_blank" rel="noopener noreferrer">Oakville</a>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <a href="https://www.ct839.com/en/about" target="_blank" rel="noopener noreferrer">About Us</a>
            <a href="https://www.ct839.com/en/blog" target="_blank" rel="noopener noreferrer">Blog</a>
            <a href="https://www.ct839.com/en/contact" target="_blank" rel="noopener noreferrer">Contact</a>
            <Link href="/login">Admin Login</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Caution Tape Robotics Club. All rights reserved.</p>
          <div style={{ display: "flex", gap: 16 }}>
            <a href="https://www.ct839.com/en/terms-of-service" target="_blank" rel="noopener noreferrer">Terms of Service</a>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>|</span>
            <a href="https://www.ct839.com/en/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
