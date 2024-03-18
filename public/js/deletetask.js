// Getting id from delete button and task 
const delButton = document.getElementById('#del-task-btn');
const taskId = document.querySelector('input[name="task-id"]').value;

// Function to delete a task 
const deleteHandler = async () => {
    const response = await fetch(`/api/task-routes/${taskId}`, {
        method: 'DELETE'
    });
// Return user to homepage after deletion 
    if (response.ok) {
    document.location.replace('/homepage');
    } else {
        alert(response.statusText);
    }
};

// Event handler
if(delButton!=null){
    delButton.addEventListener('click', deleteHandler);
}