# Employee-Tracker

![Screenshot 2024-08-25 133314](https://github.com/user-attachments/assets/5529cc40-27b3-4712-bfa2-22cf69d37cba)
# Description
The Employee Tracker is a command-line application that helps businesses efficiently manage their employee databases. Built with Node.js, Inquirer, and PostgreSQL, the application allows users to view, add, and manage departments, roles, and employees within an organization.

# Installation
To install and use the Employee Management System on your local machine, follow these steps:

Clone the repository:
(https://github.com/slym187/Employee-Tracker.git)
Navigate to the project directory:

Copy code
cd employee-tracker

Install dependencies:
npm install

Set up the PostgreSQL database:
Open PostgreSQL and create a database named employee_tracker.

Run the schema file to set up the database structure:
Copy code
psql -U postgres -d employee_tracker -f db/schema.sql
(Optional) Seed the database with initial data:

Copy code
psql -U postgres -d employee_tracker -f db/seeds.sql

# Usage
To start the application navigate to the project directory and run
node index.js
View all departments, roles, or employees.
Add new departments, roles, or employees.
Update an employee's role.

# Technologies Used
Node.js: A JavaScript runtime used for building the server-side logic.
Inquirer.js: A library for creating interactive command-line prompts.
PostgreSQL: A powerful, open-source object-relational database system.
pg: A PostgreSQL client for Node.js that handles database operations.

# Credits
Chatgpt

# License
Please refer to the LICENSE in the repo.
