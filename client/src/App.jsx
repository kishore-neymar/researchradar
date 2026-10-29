import { useMemo, useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import StatsGrid from './components/StatsGrid'
import OpportunityCard from './components/OpportunityCard'
import './App.css'

const opportunities = [
  { title: 'AI for Healthcare Research Grant', organization: 'Global Health Research Foundation', amount: '$250,000', deadline: '15 Dec 2026', match: 92, tags: ['AI', 'Healthcare', 'Medical Imaging'] },
  { title: 'Medical Imaging Innovation Grant', organization: 'Digital Medicine Initiative', amount: '$180,000', deadline: '20 Jan 2027', match: 87, tags: ['Computer Vision', 'Healthcare'] },
  { title: 'Next Generation AI Research Program', organization: 'Future Computing Council', amount: '$300,000', deadline: '05 Feb 2027', match: 81, tags: ['Generative AI', 'ML'] },
]

export default function App() {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState('Dashboard')
  const [saved, setSaved] = useState([])
  const [selected, setSelected] = useState(null)

  const filtered = useMemo(() => opportunities.filter((item) =>
    `${item.title} ${item.organization} ${item.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase())
  ), [query])

  const toggleSaved = (title) => {
    setSaved((current) => current.includes(title)
      ? current.filter((item) => item !== title)
      : [...current, title])
  }

  return (
    <div className="app-shell">
      <Header query={query} onQueryChange={setQuery} />
      <div className="app-body">
        <Sidebar active={active} onChange={setActive} />
        <main className="main-content">
          <div className="welcome-row">
            <div><p className="eyebrow">Tuesday, 22 September 2026</p><h1>Good evening, Dr. Arun.</h1><p>Research opportunities and emerging topics relevant to your work.</p></div>
            <button className="primary-button" type="button">Edit research profile</button>
          </div>
          <StatsGrid />
          <section className="content-grid">
            <div className="panel">
              <div className="panel-heading"><div><h2>Top funding opportunities</h2><p>Ranked by your research profile</p></div><button type="button" onClick={() => setActive('Opportunities')}>View all</button></div>
              <div>{filtered.map((item) => <OpportunityCard key={item.title} opportunity={item} saved={saved.includes(item.title)} onSave={toggleSaved} onOpen={setSelected} />)}</div>
            </div>
            <aside className="panel trends-panel">
              <div className="panel-heading"><div><h2>Emerging trends</h2><p>Topics gaining momentum</p></div></div>
              <article><span className="trend-icon">AI</span><div><strong>Multimodal Medical AI</strong><p>+38% · Rapid cross-modal healthcare growth</p></div></article>
              <article><span className="trend-icon">GD</span><div><strong>AI for Drug Discovery</strong><p>+31% · Growing research activity</p></div></article>
              <article><span className="trend-icon">MI</span><div><strong>Medical Imaging AI</strong><p>+22% · Steady clinical application growth</p></div></article>
            </aside>
          </section>
        </main>
      </div>
      {selected && <div className="modal-backdrop" role="presentation" onClick={() => setSelected(null)}><article className="detail-modal" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}><button className="close-button" type="button" onClick={() => setSelected(null)}>×</button><h2>{selected.title}</h2><p>{selected.organization}</p><strong>{selected.amount}</strong><p>Deadline: {selected.deadline}</p><button className="primary-button" type="button" onClick={() => toggleSaved(selected.title)}>{saved.includes(selected.title) ? 'Saved' : 'Save opportunity'}</button></article></div>}
    </div>
  )
}
