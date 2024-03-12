const newtaskFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('input[name="task-title"]').value;
    const content = document.querySelector('textarea[name="task-content"]').value;

    const response = await fetch('/api/task', {
        method: 'task',
        body: JSON.stringify({
            title,
            content,
        }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Something wrong!');
    }
};

document.querySelector('#newtask-form').addEventListener('submit', newtaskFormHandler);