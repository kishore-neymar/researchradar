feature/react-update-delete

 feature/frontend-components
 main
import { useMemo, useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import StatsGrid from './components/StatsGrid'
import OpportunityCard from './components/OpportunityCard'
import './App.css'

 feature/react-update-delete
const initialOpportunities = [

const opportunities = [
 main
  { title: 'AI for Healthcare Research Grant', organization: 'Global Health Research Foundation', amount: '$250,000', deadline: '15 Dec 2026', match: 92, tags: ['AI', 'Healthcare', 'Medical Imaging'] },
  { title: 'Medical Imaging Innovation Grant', organization: 'Digital Medicine Initiative', amount: '$180,000', deadline: '20 Jan 2027', match: 87, tags: ['Computer Vision', 'Healthcare'] },
  { title: 'Next Generation AI Research Program', organization: 'Future Computing Council', amount: '$300,000', deadline: '05 Feb 2027', match: 81, tags: ['Generative AI', 'ML'] },
]

export default function App() {
feature/react-update-delete
  const [opportunities, setOpportunities] = useState(initialOpportunities)
  const [editing, setEditing] = useState(null)

 main
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

 feature/react-update-delete
  const updateOpportunity = (event) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const updated = {
      ...editing,
      title: form.get('title').trim(),
      organization: form.get('organization').trim(),
      amount: form.get('amount').trim(),
      deadline: form.get('deadline').trim(),
    }
    setOpportunities((current) => current.map((item) => item.title === editing.title ? updated : item))
    setEditing(null)
  }

  const deleteOpportunity = (title) => {
    if (!window.confirm(`Delete “${title}”?`)) return
    setOpportunities((current) => current.filter((item) => item.title !== title))
    setSaved((current) => current.filter((item) => item !== title))
    if (selected?.title === title) setSelected(null)
  }


main
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
feature/react-update-delete
              <div>{filtered.map((item) => <OpportunityCard key={item.title} opportunity={item} saved={saved.includes(item.title)} onSave={toggleSaved} onOpen={setSelected} onEdit={setEditing} onDelete={deleteOpportunity} />)}</div>

              <div>{filtered.map((item) => <OpportunityCard key={item.title} opportunity={item} saved={saved.includes(item.title)} onSave={toggleSaved} onOpen={setSelected} />)}</div>
 main
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
 feature/react-update-delete
      {editing && <div className="modal-backdrop" role="presentation" onClick={() => setEditing(null)}><form className="detail-modal edit-form" onSubmit={updateOpportunity} onClick={(event) => event.stopPropagation()}><button className="close-button" type="button" onClick={() => setEditing(null)}>×</button><h2>Edit opportunity</h2><label>Title<input name="title" defaultValue={editing.title} required /></label><label>Organization<input name="organization" defaultValue={editing.organization} required /></label><label>Amount<input name="amount" defaultValue={editing.amount} required /></label><label>Deadline<input name="deadline" defaultValue={editing.deadline} required /></label><div className="form-actions"><button className="secondary-button" type="button" onClick={() => setEditing(null)}>Cancel</button><button className="primary-button" type="submit">Save changes</button></div></form></div>}

 main
      {selected && <div className="modal-backdrop" role="presentation" onClick={() => setSelected(null)}><article className="detail-modal" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}><button className="close-button" type="button" onClick={() => setSelected(null)}>×</button><h2>{selected.title}</h2><p>{selected.organization}</p><strong>{selected.amount}</strong><p>Deadline: {selected.deadline}</p><button className="primary-button" type="button" onClick={() => toggleSaved(selected.title)}>{saved.includes(selected.title) ? 'Saved' : 'Save opportunity'}</button></article></div>}
    </div>
  )
}
 feature/react-update-delete


import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
 main
 main
