import './App.css'
import { skills, jobs, GITHUB_USERNAME, REPO_NAME } from './data'
import MiniCRM from './components/MiniCRM'
import GitHubRepos from './components/GitHubRepos'

const LINKEDIN = 'https://www.linkedin.com/in/chazrowe/'
const EMAIL = 'chazrowe1988@gmail.com'

export default function App() {
  return (
    <>
      <div className="band">
        <div className="wrap">
      <nav className="nav" aria-label="Sections">
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#experience">Experience</a>
        <a href="#contact">Contact</a>
      </nav>

      <header className="hero">
        <h1>Chaz Rowe</h1>
        <p>Software developer. I build CRM features, web apps, and API integrations that turn what a business needs into software it can use.</p>
        <div className="actions">
          <a className="btn" href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className="btn" href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a className="btn" href={`${import.meta.env.BASE_URL}ChazRoweResume.pdf`} target="_blank" rel="noopener noreferrer">Download resume</a>
        </div>
      </header>
        </div>
      </div>

      <div className="wrap">
      <main>
        <section className="section" id="about">
          <h2>About</h2>
          <div>
            <p>
              I’ve spent 6+ years building features for client CRM systems and custom web applications with PHP, Laravel, JavaScript, and Vue.js, and I work directly with clients to figure out what they actually need.
            </p>
            <p>
              I’m freelancing now and looking for a full-time software development role. The demos below are built with React and run entirely in your browser.
            </p>
          </div>
        </section>

        <section className="section" id="skills">
          <h2>Skills</h2>
          <div>
            {skills.map((g) => (
              <div className="skillgroup" key={g.group}>
                <h3>{g.group}</h3>
                <ul className="chips">
                  {g.items.map((s) => (
                    <li key={s.name} className={s.shown ? 'chip shown' : 'chip'}>{s.name}</li>
                  ))}
                </ul>
              </div>
            ))}
            <p className="note">Filled skills are demonstrated on this site. The rest come from my client and professional work.</p>
          </div>
        </section>

        <section className="section" id="projects">
          <h2>Projects</h2>
          <div>
            <article className="project">
              <h3>Mini CRM</h3>
              <p>A pipeline with a custom field and an automation rule, the kind of CRM work I do for clients. Move a contact to the rule’s stage and a task appears. Demo data only.</p>
              <MiniCRM />
            </article>

            <article className="project">
              <h3>GitHub repositories</h3>
              <p>Live data from the GitHub API, with loading and error states.</p>
              <GitHubRepos />
            </article>

            <article className="project">
              <h3>This site</h3>
              <p>Built with Vite and React, responsive, keyboard accessible, and deployed to GitHub Pages.</p>
              <a href={`https://github.com/${GITHUB_USERNAME}/${REPO_NAME}`}target="_blank" rel="noopener noreferrer">View the code</a>
            </article>
          </div>
        </section>

        <section className="section" id="experience">
          <h2>Experience</h2>
          <div>
            {jobs.map((j) => (
              <div className="job" key={j.title}>
                <h3>{j.title}</h3>
                <p className="meta">{j.where}, {j.dates}</p>
                <ul>{j.points.map((p) => <li key={p}>{p}</li>)}</ul>
              </div>
            ))}
            <p className="note">Education: Lambda School, Software Development, 2020.</p>
          </div>
        </section>

        <section className="section" id="contact">
          <h2>Contact</h2>
          <div>
            <p>Hiring, or have a project in mind? Email me and I’ll reply within a day or two.</p>
            <p><a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
          </div>
        </section>
      </main>

      <footer className="note" style={{ padding: '2rem 0' }}>© {new Date().getFullYear()} Chaz Rowe</footer>
      </div>
    </>
  )
}
