import { useRef } from "react";

export default function FeedbackForm({ onAdd }) {
  const formRef = useRef(null);

  // This helper runs when the form is submitted
  async function handleFormAction(formData) {
    formRef.current?.reset(); // Clear the form fields immediately
    await onAdd(formData);    // Trigger the logic in App.jsx
  }

  return (
    <form ref={formRef} action={handleFormAction} className="feedback-form">
      <h3>Leave a Review</h3>
      
      <input name="name" placeholder="Your Name" required />

      <select name="rating">
        <option value="5">5 Stars - Excellent</option>
        <option value="4">4 Stars - Good</option>
        <option value="3">3 Stars - Okay</option>
        <option value="2">2 Stars - Poor</option>
        <option value="1">1 Star - Terrible</option>
      </select>

      <textarea name="comment" placeholder="Write your feedback..." required />

      <button type="submit">Post Feedback</button>
    </form>
  );
}