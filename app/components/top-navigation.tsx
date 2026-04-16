import { Link } from 'react-router';

export default function TopNavigation({ children }: { children: React.ReactNode }) {
  return (
    <div className="navigation">
      <Link to="/">
        <button
          type="button"
          className="navigate-back-button control-button nav-button"
        >
          <span
            aria-label="navigate back"
            className="material-symbols-rounded"
          >
            home
          </span>
        </button>
      </Link>
      {children}
    </div>
  );
}
