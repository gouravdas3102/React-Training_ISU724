import { useState,useOptimistic } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import FeedbackForm from './components/FeedbackForm'
import FeedbackList from './components/FeedbackList'
import { addFeedbackAction } from './actions/feedback'

function App() {
  // 1. Real State (Data confirmed by the server)
  const [feedbacks, setFeedbacks] = useState([
  ]);

  // 2. Optimistic State (Shows the user's post instantly)
  const [optimisticFeedbacks, addOptimistic] = useOptimistic(
    feedbacks,
    (state, newEntry) => [...state, { ...newEntry, sending: true }]
  );

  // 3. The logic to handle adding new feedback
  async function handleAddFeedback(formData) {
    const tempEntry = {
      id: Date.now(),
      name: formData.get("name"),
      rating: Number(formData.get("rating")),
      comment: formData.get("comment"),
    };

    // Show it in the list immediately (Optimistic)
    addOptimistic(tempEntry);

    // Send it to the server
    const savedEntry = await addFeedbackAction(formData);

    // Update the real state once the server responds
    setFeedbacks((prev) => [...prev, savedEntry]);
  }

  return (
    <div className="app-container">
      <h1>Smart Feedback App</h1>
      <FeedbackForm onAdd={handleAddFeedback} />
      <FeedbackList feedbacks={optimisticFeedbacks} />
    </div>
  );
}

export default App
