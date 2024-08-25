const inquirer = require('inquirer');
const db = require('./db/queries'); // 


function mainMenu() {
  inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: [
      'Add a Department',
      'Add a Role',
      'Add an Employee',
      'Update an Employee Role',
      'Exit'
    ]
  }).then(answer => {
    switch (answer.action) {
      case 'Add a Department':
        addDepartment();
        break;
      case 'Add a Role':
        addRole();
        break;
      case 'Add an Employee':
        addEmployee();
        break;
      case 'Update an Employee Role':
        updateEmployeeRole();
        break;
      case 'Exit':
        console.log('Goodbye!');
        process.exit();
    }
  });
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
  db.viewAllDepartments().then(([rows]) => {
    const departments = rows.map(({ id, name }) => ({
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
  db.viewAllRoles().then(([roles]) => {
    const roleChoices = roles.map(({ id, title }) => ({
      name: title,
      value: id
    }));
    
    db.viewAllEmployees().then(([employees]) => {
      const managerChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
      }));
      
      managerChoices.unshift({ name: 'None', value: null }); // Add a 'None' option for no manager

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
          choices: roleChoices
        },
        {
          type: 'list',
          name: 'managerId',
          message: "Select the employee's manager:",
          choices: managerChoices
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
  db.viewAllEmployees().then(([employees]) => {
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));
    
    db.viewAllRoles().then(([roles]) => {
      const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id
      }));
      
      inquirer.prompt([
        {
          type: 'list',
          name: 'employeeId',
          message: 'Select the employee to update:',
          choices: employeeChoices
        },
        {
          type: 'list',
          name: 'roleId',
          message: 'Select the new role:',
          choices: roleChoices
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
