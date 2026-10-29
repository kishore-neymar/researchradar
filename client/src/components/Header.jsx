export default function Header({ query, onQueryChange }) {
  return (
    <header className="header">
      <button className="brand" aria-label="ResearchRadar dashboard">
        <span className="brand-mark">RR</span>
        <span><strong>ResearchRadar</strong><small>Research intelligence</small></span>
      </button>
      <div className="header-actions">
        <label className="search-box">
          <span aria-hidden="true">⌕</span>
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search opportunities"
          />
        </label>
        <button className="profile-button" type="button">DA</button>
      </div>
    </header>
  )
}
