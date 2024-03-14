// Function to format a task for display
function formatTask(task) {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      dueDate: formatDate(task.dueDate),
      completed: task.completed,
    };
  }
  
  // Function to validate task input
  function validateTaskInput(title, description, dueDate) {
    if (!title || !description || !dueDate) {
      throw new Error('Title, description, and due date are required');
    }
    // Additional validation logic can be added here
  }
  
  module.exports = {
    formatTask,
    validateTaskInput,
  };