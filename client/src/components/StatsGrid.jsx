const stats = [
  ['92%', 'Top opportunity match', 'AI for Healthcare'],
  ['12', 'New opportunities', 'This week'],
  ['3', 'Emerging trends', 'High relevance'],
  ['2', 'Deadlines soon', 'Next 30 days'],
]

export default function StatsGrid() {
  return (
    <section className="stats-grid" aria-label="Opportunity summary">
      {stats.map(([value, label, detail]) => (
        <article className="stat-card" key={label}>
          <strong>{value}</strong>
          <h3>{label}</h3>
          <p>{detail}</p>
        </article>
      ))}
    </section>
  )
}
