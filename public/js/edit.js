// Getting task-id value 
const taskId = document.querySelector('input[name="task-id"]').value;

// Function to edit task
const editHandler = async (event) => {
    event.preventDefault();
    const title = document.querySelector('input[name="task-title"]').value;
    const description = document.querySelector('input[name="task-description"]').value; 
    const status = document.querySelector('option[name="task-status"]').value;
    const response = await fetch(`/api/editTask/${taskId}`, {
        method: 'PUT',
        body: JSON.stringify({
            taskId: id,
            title,
            description,
            status,
        }),
        headers: {'Content-Type': 'application/json'},
    });
    // If edited task has valid inputs, return user to hompage
    if (response.ok) {
        document.location.replace('/homepage');
    } else {
        alert("Something went wrong!");
    }
};
// Event handler 
document.getElementById('edit-form').addEventListener('submit', editHandler);