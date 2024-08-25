-- Insert data into the department table
INSERT INTO department (name) VALUES 
('Sports Management'),
('Entertainment'),
('Law');

-- Insert data into the role table
INSERT INTO role (title, salary, department_id) VALUES 
('Sports Agent', 100000, 1),
('Singer', 80000, 2),
('Lawyer', 70000, 3);

-- Insert employees without managers
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
('Tasha', 'Mack', 1, NULL),
('Whitney', 'Houston', 2, NULL),
('Annalise', 'Keating', 3, NULL);

-- Fetch IDs for inserted employees and update manager_id

-- Get Tasha Mack's ID and update Whitney Houston's manager_id to Tasha's ID
UPDATE employee 
SET manager_id = (SELECT id FROM employee WHERE first_name = 'Tasha' AND last_name = 'Mack' LIMIT 1)
WHERE first_name = 'Whitney' AND last_name = 'Houston';

-- Get Whitney Houston's ID and update Annalise Keating's manager_id to Whitney's ID
UPDATE employee 
SET manager_id = (SELECT id FROM employee WHERE first_name = 'Whitney' AND last_name = 'Houston' LIMIT 1)
WHERE first_name = 'Annalise' AND last_name = 'Keating';
