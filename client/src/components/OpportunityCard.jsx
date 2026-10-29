export default function OpportunityCard({ opportunity, saved, onSave, onOpen, onEdit, onDelete }) {
  return (
    <article className="opportunity-card">
      <div className="opportunity-heading">
        <div>
          <button className="title-button" type="button" onClick={() => onOpen(opportunity)}>
            {opportunity.title}
          </button>
          <p>{opportunity.organization}</p>
        </div>
        <span className="match-badge">{opportunity.match}% match</span>
      </div>
      <div className="tags">
        {opportunity.tags.map((tag) => <span key={tag}>{tag}</span>)}
      </div>
      <div className="opportunity-footer">
        <strong>{opportunity.amount}</strong>
        <span>Deadline {opportunity.deadline}</span>
        <button type="button" onClick={() => onSave(opportunity.title)}>
          {saved ? 'Saved' : 'Save'}
        </button>
        <button type="button" onClick={() => onEdit(opportunity)}>Edit</button>
        <button className="delete-button" type="button" onClick={() => onDelete(opportunity.title)}>Delete</button>
      </div>
    </article>
  )
}
