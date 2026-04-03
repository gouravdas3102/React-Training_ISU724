// This simulates a database call
export async function addFeedbackAction(formData) {
  // Wait for 1 second to simulate network lag
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const newFeedback = {
    id: Date.now(),
    name: formData.get("name"),
    rating: Number(formData.get("rating")),
    comment: formData.get("comment"),
  };

  return newFeedback;
}