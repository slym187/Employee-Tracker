const inquirer = require('inquirer');
const db = require('./db/queries'); // 


function mainMenu() {
  inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: [
      'View All Employees',
      'View All Roles',
      'View All Departments',  // <-- Add this line
      'Add an Employee',
      'Update an Employee Role',
      'Add a Department',
      'Add a Role',
      'Exit'
    ]
  }).then(answer => {
    switch (answer.action) {
      case 'View All Employees':
        viewAllEmployees();
        break;
      case 'View All Roles':
        viewAllRoles();
        break;
      case 'View All Departments':   // <-- Add this case
        viewAllDepartments();        // <-- Call the function here
        break;
      case 'Add an Employee':
        addEmployee();
        break;
      case 'Update an Employee Role':
        updateEmployeeRole();
        break;
      case 'Add a Department':
        addDepartment();
        break;
      case 'Add a Role':
        addRole();
        break;
      case 'Exit':
        console.log('Goodbye!');
        process.exit();
    }
  });
}



function viewAllEmployees() {
  db.viewAllEmployees().then(result => {
    const uniqueEmployees = Array.from(new Map(result.rows.map(emp => [emp.id, emp])).values());
    console.table(uniqueEmployees); // Display the employees in a table format
    mainMenu(); // Return to the main menu after displaying
  }).catch(err => console.error(err));
}

function viewAllRoles() {
  db.viewAllRoles().then(result => {
    console.table(result.rows); // Display the roles in a table format
    mainMenu(); // Return to the main menu after displaying
  }).catch(err => console.error(err));
}

function viewAllDepartments() {
  db.viewAllDepartments().then(result => {
    console.table(result.rows); // Display the departments in a table format
    mainMenu(); // Return to the main menu after displaying
  }).catch(err => console.error(err));
}




function addDepartment() {
  inquirer.prompt({
    name: 'name',
    message: 'Enter the name of the department:',
  }).then(answer => {
    db.addDepartment(answer.name)
      .then(() => console.log(`Added ${answer.name} to the database`))
      .then(() => mainMenu());
  });
}

function addRole() {
  db.viewAllDepartments().then(result => {
    const departments = result.rows.map(({ id, name }) => ({
      name: name,
      value: id
    }));
    
    inquirer.prompt([
      {
        name: 'title',
        message: 'Enter the title of the role:',
      },
      {
        name: 'salary',
        message: 'Enter the salary for the role:',
      },
      {
        type: 'list',
        name: 'departmentId',
        message: 'Select the department for this role:',
        choices: departments
      }
    ]).then(answers => {
      db.addRole(answers.title, answers.salary, answers.departmentId)
        .then(() => console.log(`Added ${answers.title} role to the database`))
        .then(() => mainMenu());
    });
  });
}


function addEmployee() {
  db.viewAllRoles().then(result => {
    const roles = result.rows.map(({ id, title }) => ({
      name: title,
      value: id
    }));

    db.viewAllEmployees().then(result => {
      const employees = result.rows.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
      }));
      
      employees.unshift({ name: 'None', value: null }); // Add a 'None' option for no manager

      inquirer.prompt([
        {
          name: 'firstName',
          message: "Enter the employee's first name:",
        },
        {
          name: 'lastName',
          message: "Enter the employee's last name:",
        },
        {
          type: 'list',
          name: 'roleId',
          message: "Select the employee's role:",
          choices: roles
        },
        {
          type: 'list',
          name: 'managerId',
          message: "Select the employee's manager:",
          choices: employees
        }
      ]).then(answers => {
        db.addEmployee(answers.firstName, answers.lastName, answers.roleId, answers.managerId)
          .then(() => console.log(`Added ${answers.firstName} ${answers.lastName} to the database`))
          .then(() => mainMenu());
      });
    });
  });
}


function updateEmployeeRole() {
  db.viewAllEmployees().then(result => {
    const employees = result.rows.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));

    db.viewAllRoles().then(result => {
      const roles = result.rows.map(({ id, title }) => ({
        name: title,
        value: id
      }));

      inquirer.prompt([
        {
          type: 'list',
          name: 'employeeId',
          message: 'Select the employee to update:',
          choices: employees
        },
        {
          type: 'list',
          name: 'roleId',
          message: 'Select the new role:',
          choices: roles
        }
      ]).then(answers => {
        db.updateEmployeeRole(answers.employeeId, answers.roleId)
          .then(() => console.log(`Updated employee's role`))
          .then(() => mainMenu());
      });
    });
  });
}


mainMenu();
