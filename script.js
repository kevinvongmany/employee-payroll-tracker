// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector("#add-employees-btn");

// Collect employee data
const collectEmployees = function () {
  const employees = [];
  let addEmployees = true; 
  while (addEmployees) { // repeat forever until user wants to finish
    const employee = {
      firstName: "",
      lastName: "",
      salary: 0, 
    };

    employee.firstName = prompt("Enter first name: ");
    employee.lastName = prompt("Enter last name: ");
    let inputSalary = prompt("Enter salary: "); 
    employee.salary = validateSalary(inputSalary);

    employees.push(employee);
    addEmployees = confirm("Do you wish to add more employees?"); // ask user to go again or finish
  };
  return employees;
};

// Validate salary input to ensure it's a number
const validateSalary = function (salary) {
  while (isNaN(salary)) {
    salary = prompt("Entered value is invalid, please enter a number (e.g. 120020, 38000.99):")
  };
  return Number(salary);
}

// Display the average salary
const displayAverageSalary = function (employeesArray) {
  // creates an array: `[123, 456, ...]` refer to README.md
  const salaries = employeesArray.map(a => a.salary); 
  const employeeTotal = salaries.length; 
  // sums all values in number array, refer to README.md
  const sum = salaries.reduce((acc, current) => {
    return acc + current;
  }, 0); 
  // calculate the average and round to 2 decimal places, e.g 100.67
  const average = parseFloat((sum / employeeTotal)).toFixed(2); 

  console.log(`The average employee salary between our ${employeeTotal} employee(s) is $${average}`);
};

// Select a random employee
const getRandomEmployee = function (employeesArray) {
  const numEmployees = employeesArray.length;
  const randomIdx = getRandomInt(numEmployees);
  const randomEmployee = employeesArray[randomIdx];
  const randomEmployeeName = `${randomEmployee.firstName} ${randomEmployee.lastName}`

  console.log(`Congratulations to ${randomEmployeeName}, our random drawing winner!`);
};

/* 
Generates a number from 0 to `max`.
Example: `getRandomInt(3);` will output 0, 1 or 2.
Refer to README.md.
*/
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function (employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector('#employee-table');

  // Clear the employee table
  employeeTable.innerHTML = '';

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement('tr');

    const firstNameCell = document.createElement('td');
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement('td');
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement('td');
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
};

const trackEmployeeData = function () {
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log('==============================');

  getRandomEmployee(employees);

  employees.sort(function (a, b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
};

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener('click', trackEmployeeData);