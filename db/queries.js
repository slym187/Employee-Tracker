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
  }viewAllDepartments() {
    return pool.query(`
      SELECT id, name
      FROM department
      WHERE id IN (
        SELECT MIN(id)
        FROM department
        GROUP BY name
      )
    `);
  }
  

  // View all roles
  viewAllRoles() {
    return pool.query(`
      SELECT id, title, salary, department_id
      FROM role
      WHERE id IN (
        SELECT MIN(id)
        FROM role
        GROUP BY title, salary, department_id
      )
    `);
  }
  
  
  

  // View all employees
  viewAllEmployees() {
    return pool.query(`
      SELECT id, first_name, last_name, role_id, manager_id
      FROM employee
      WHERE id IN (
        SELECT MIN(id)
        FROM employee
        GROUP BY first_name, last_name
      )
    `);
  }
  
  
  
}

module.exports = new Database(pool);

