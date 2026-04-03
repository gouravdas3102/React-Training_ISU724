export default function FeedbackList({ feedbacks }) {
  return (
    <div className="feedback-list">
      <h2>Recent Feedback ({feedbacks.length})</h2>
      
      {feedbacks.length === 0 && <p>No feedback yet. Be the first!</p>}

      {feedbacks.map((fb) => (
        <div 
          key={fb.id} 
          className={`feedback-card ${fb.sending ? "pending" : ""}`}
        >
          <div className="card-header">
            <strong>{fb.name}</strong>
            <span className="stars">{"⭐".repeat(fb.rating)}</span>
          </div>
          <p>{fb.comment}</p>
          {fb.sending && <small className="status">Saving...</small>}
        </div>
      ))}
    </div>
  );
}