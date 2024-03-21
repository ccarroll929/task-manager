# Octo-Task Cruncher

## Description
It allows the user to securely create an account, and login. From there, it allows the user to create, edit, or delete tasks and their respective progress. 

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation
Unfortunately, we were unable to get this to deploy properly to Heroku, or Github Pages. 

### To install locally:
Clone the repository. Once cloned, open your command line and navigate to the folder that has the package.json in it. In your command line, type "npm i", this will install *most* dependencies. This application also used Redis, which has to be installed to your computer. [Please refer to this page, with documentation on how to install Redis](https://redis.io/docs/install/install-redis/install-redis-on-windows/). You also need to install MySQL, [please refer to this page, with documentation on how to install MySQL](https://www.w3schools.com/mysql/mysql_install_windows.asp). You will need to obtain a GoogleTasksAPI key, [please refer to this documentation](https://developers.google.com/tasks/overview) to get your key. You should end up with a .json file you have to download. Move that file into the root directory for this application, and rename it to "supersecretkey.json". You will also need to create a ".env" file in the root directory with the following credentials DB_NAME='tasktracker_db', DB_PASSWORD='YourMySQLPassword, DB_USER='YourMySQLUsername', REDIS_SERVER=127.0.0.1, REDIS_PORT=6379, REDIS_TIMEOUT=5, SESSION_SECRET=Happy, set GOOGLE_APPLICATION_CREDENTIALS='/your/specific/filepath/to/supersecretkey.json' 
Once these are installed, in a second command line, navigate to the /db/ folder, and run MySQL with the "mysql -u root -p" command, replacing "root" if you have changed your MySQL username. Type in your password for MySQL, and type "source schema.sql". Go back to your first command line, from here type in "npm run seed", and "npm start". This will open the application locally at localhost:3000. Enjoy!  



## Usage
Create a user (or login if you have already done so). Fill out the 'Add New Task' form with the desired information, and click submit. Once created, tasks can be edited, or deleted. Don't forget to CRUNCH them! 

## Screenshots
![image](https://github.com/ccarroll929/task-tracker/assets/149080702/f7ae992f-2a10-4965-b51a-57932a18a85d)
![image](https://github.com/ccarroll929/task-tracker/assets/149080702/fafa6131-6e51-483d-9557-f862516992b2)
![image](https://github.com/ccarroll929/task-tracker/assets/149080702/b8364291-0092-47c4-88c9-76ba2a15e9b3)
![image](https://github.com/ccarroll929/task-tracker/assets/149080702/a7ccc425-a96c-4dc5-91df-9848fafe0fdb)

## License
This project is licensed under the MIT license.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)]

For more information about the license, click [here](https://opensource.org/licenses/MIT).

## Contributing
 Please see the [Github Documents](https://docs.github.com/en/get-started/exploring-projects-on-github/contributing-to-a-project) on this topic. 

## Tests
No tests written. 

## Questions
If you have any questions, feel free to reach out to us:
- Github: [ccarroll929](https://github.com/ccarroll929)
- Github: [rayxis](https://github.com/rayxis)
- GitHub: [Sulxy](https://github.com/Sulxy),
