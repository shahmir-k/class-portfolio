import Link from "next/link";

export default function PublicNav() {
  return (
    <nav className="public-nav">
      <div className="public-nav-inner">
        <Link href="/" className="public-nav-logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://www.ct839.com/images/ctrc-logo-full-dark.svg"
            alt="Caution Tape Robotics Club"
            style={{ height: 36 }}
          />
        </Link>
        <div className="public-nav-links">
          <a href="https://www.ct839.com/en/" target="_blank" rel="noopener noreferrer">
            Main Site
          </a>
          <a href="#students">Students</a>
          <Link href="/login" className="btn-primary btn-small">
            Admin
            <svg className="btn-arrow" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3.5 8h9M8.5 4l4 4-4 4"/></svg>
          </Link>
        </div>
      </div>
    </nav>
  );
}
