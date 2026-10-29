const navigation = ['Dashboard', 'Opportunities', 'Emerging Trends', 'Saved']

export default function Sidebar({ active, onChange }) {
  return (
    <aside className="sidebar">
      <nav aria-label="Main navigation">
        {navigation.map((item) => (
          <button
            key={item}
            className={active === item ? 'nav-item active' : 'nav-item'}
            onClick={() => onChange(item)}
            type="button"
          >
            {item}
          </button>
        ))}
      </nav>
      <div className="profile-strength">
        <strong>AI profile strength</strong>
        <p>Your profile is ready for personalized matching.</p>
        <div className="progress"><span /></div>
        <small>88% complete</small>
      </div>
    </aside>
  )
}
