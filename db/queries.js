const pool = require('./connection');

class Database {
  // Add a department
  addDepartment(name) {
    return pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
  }

  // Add a role
  addRole(title, salary, departmentId) {
    return pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, departmentId]);
  }

  // Add an employee
  addEmployee(firstName, lastName, roleId, managerId) {
    return pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [firstName, lastName, roleId, managerId]);
  }

  // Update an employee's role
  updateEmployeeRole(employeeId, roleId) {
    return pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [roleId, employeeId]);
  }

  // View all departments
  viewAllDepartments() {
    return pool.query('SELECT * FROM department');
  }

  // View all roles
  viewAllRoles() {
    return pool.query('SELECT * FROM role');
  }

  // View all employees
  viewAllEmployees() {
    return pool.query('SELECT * FROM employee');
  }
}

module.exports = new Database(pool);
const pool = require('./connection');

class Database {
  // Add a department
  addDepartment(name) {
    return pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
  }

  // Add a role
  addRole(title, salary, departmentId) {
    return pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, departmentId]);
  }

  // Add an employee
  addEmployee(firstName, lastName, roleId, managerId) {
    return pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [firstName, lastName, roleId, managerId]);
  }

  // Update an employee's role
  updateEmployeeRole(employeeId, roleId) {
    return pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [roleId, employeeId]);
  }

  // View all departments, roles, and employees
  viewAllDepartments() {
    return pool.query('SELECT * FROM department');
  }

  viewAllRoles() {
    return pool.query('SELECT * FROM role');
  }

  viewAllEmployees() {
    return pool.query('SELECT * FROM employee');
  }
}

module.exports = new Database(pool);
