import { useRef, useState } from 'react'

const STAGES = ['Lead', 'Contacted', 'Proposal', 'Won']
const SOURCES = ['Referral', 'Website', 'Event']

const START = [
  { id: 1, name: 'Dana Whitfield', company: 'Whitfield Roofing', source: 'Referral', stage: 0 },
  { id: 2, name: 'Marcus Bell', company: 'Bell Family Dental', source: 'Website', stage: 1 },
  { id: 3, name: 'Priya Shah', company: 'Shah Logistics', source: 'Event', stage: 2 },
]

export default function MiniCRM() {
  const [contacts, setContacts] = useState(START)
  const [tasks, setTasks] = useState([])
  const [ruleOn, setRuleOn] = useState(true)
  const [ruleStage, setRuleStage] = useState(3)
  const [ruleTask, setRuleTask] = useState('Send welcome packet')
  const [name, setName] = useState('')
  const [source, setSource] = useState(SOURCES[0])
  const nextId = useRef(100)

  function move(contact, delta) {
    const stage = contact.stage + delta
    if (stage < 0 || stage >= STAGES.length) return
    setContacts((all) => all.map((c) => (c.id === contact.id ? { ...c, stage } : c)))
    if (ruleOn && stage === ruleStage && ruleTask.trim()) {
      setTasks((all) => [{ id: nextId.current++, text: `${contact.name}: ${ruleTask.trim()}` }, ...all])
    }
  }

  function addContact(e) {
    e.preventDefault()
    if (!name.trim()) return
    setContacts((all) => [...all, { id: nextId.current++, name: name.trim(), company: '', source, stage: 0 }])
    setName('')
  }

  return (
    <div className="crm">
      <div className="board">
        {STAGES.map((label, i) => (
          <div className="col" key={label}>
            <h4>
              {label} <span className="note">{contacts.filter((c) => c.stage === i).length}</span>
            </h4>
            {contacts.filter((c) => c.stage === i).map((c) => (
              <div className="card" key={c.id}>
                <strong>{c.name}</strong>
                {c.company && <span>{c.company}</span>}
                <span className="note">Source: {c.source}</span>
                <div className="row">
                  <button className="mini" disabled={i === 0} onClick={() => move(c, -1)} aria-label={`Move ${c.name} back a stage`}>←</button>
                  <button className="mini" disabled={i === STAGES.length - 1} onClick={() => move(c, 1)} aria-label={`Move ${c.name} forward a stage`}>→</button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="rule">
        <label>
          <input type="checkbox" checked={ruleOn} onChange={(e) => setRuleOn(e.target.checked)} /> Automation:
        </label>
        <span>when a contact reaches</span>
        <select value={ruleStage} onChange={(e) => setRuleStage(Number(e.target.value))} aria-label="Stage that triggers the automation">
          {STAGES.map((s, i) => <option key={s} value={i}>{s}</option>)}
        </select>
        <span>create task</span>
        <input value={ruleTask} onChange={(e) => setRuleTask(e.target.value)} aria-label="Task to create" />
      </div>

      <form className="rule" onSubmit={addContact}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="New contact name" aria-label="New contact name" />
        <select value={source} onChange={(e) => setSource(e.target.value)} aria-label="Source (custom field)">
          {SOURCES.map((s) => <option key={s}>{s}</option>)}
        </select>
        <button className="btn" type="submit">Add contact</button>
      </form>

      <div className="tasks">
        <h4>Tasks created by automations</h4>
        {tasks.length === 0 ? (
          <p className="note">None yet. Move a contact to the stage in the rule above.</p>
        ) : (
          <ul>
            {tasks.map((t) => (
              <li key={t.id}>
                {t.text}{' '}
                <button className="mini" onClick={() => setTasks((all) => all.filter((x) => x.id !== t.id))}>Done</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
