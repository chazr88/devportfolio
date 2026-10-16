import { useEffect, useState } from 'react'
import { GITHUB_USERNAME } from '../data'

export default function GitHubRepos() {
  const [state, setState] = useState({ status: 'loading', repos: [], error: '' })

  useEffect(() => {
    const controller = new AbortController()
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=12`, { signal: controller.signal })
      .then((res) => {
        if (res.status === 404) throw new Error(`No GitHub user named "${GITHUB_USERNAME}". Set GITHUB_USERNAME in src/data.js.`)
        if (!res.ok) throw new Error(`GitHub returned status ${res.status}. Try again in a minute.`)
        return res.json()
      })
      .then((repos) => setState({ status: 'ready', repos: repos.filter((r) => !r.fork).slice(0, 6), error: '' }))
      .catch((err) => {
        if (err.name !== 'AbortError') setState({ status: 'error', repos: [], error: err.message })
      })
    return () => controller.abort()
  }, [])

  if (state.status === 'loading') return <p className="note">Loading repositories from GitHub…</p>
  if (state.status === 'error') return <p className="error">{state.error}</p>
  if (state.repos.length === 0) return <p className="note">No public repositories to show yet.</p>

  return (
    <ul className="repos">
      {state.repos.map((r) => (
        <li key={r.id}>
          <a href={r.html_url} target="_blank" rel="noopener noreferrer"><strong>{r.name}</strong></a>
          <p className="note">{r.description || 'No description.'}</p>
          <span className="note">{r.language || 'Mixed'}</span>
        </li>
      ))}
    </ul>
  )
}
