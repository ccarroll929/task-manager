const newtaskFormHandler = async (event) => {
    event.preventDefault();

    // Getting values from user input
    const title = document.querySelector('input[name="task-title"]').value;
    const description = document.querySelector('input[name="task-description"]').value; 
    const status = document.querySelector('select[name="task-status"]').value;

    // Makes a POST request to /newTask with task title, desc, status
    const response = await fetch('/api/task', {
        method: 'POST',
        body: JSON.stringify({
            title,
            description,
            status
        }),
        headers: { 'Content-Type': 'application/json' },
    });
    // If POST request is successful, take user back to homepage with task list
    if (response.ok) {
        document.location.replace('/homepage');
    } else {
        alert('Something wrong!');
    }
};

async function fetchTasks() {
    try {
      const response = await fetch('/tasks');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const { taskList } = await response.json();
      return taskList;
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      throw error;
    }
  }
  
  function generateTaskHtml(task) {
      return `
          <div class="task">
              <h2>${task.title}</h2>
              <p>${task.notes}</p>
              <a href="${task.webViewLink}">View in Google Tasks</a>
          </div>
      `;
  }
  fetchTasks().then(tasks => {
      let taskContent = '';
      tasks.forEach(task => {
          taskContent += generateTaskHtml(task);
      });
      document.querySelector('#task-list').innerHTML = taskContent;
  }).catch(error => {
      // handle any errors, optionally update the HTML content with an error message
      document.querySelector('#task-list').innerHTML = 'Failed to load tasks.';
  });

// Event handler
document.querySelector('#newtask-form').addEventListener('submit', newtaskFormHandler);