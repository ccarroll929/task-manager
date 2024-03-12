const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

// Click on edit blog post
const editHandler = async (event) => {
    event.preventDefault();
    const title = document.querySelector('input[name="task-title"]').value;
    const content = document.querySelector('textarea[name="task-content"]').value;

    const response = await fetch(`/api/task/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            taskId: id,
            title,
            content,
        }),
        headers: {'Content-Type': 'application/json'},
    });
    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert("Something went wrong!");
    }
};

document.querySelector('.edit-form').addEventListener('submit', editHandler);