// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector("#add-employees-btn");

// Collect employee data
const collectEmployees = function () {
  // TODO: Get user input to create and return an array of employee objects
  const employees = [];

  let addEmployees = true; // initialise a flag to start loop
  while (addEmployees) {
    // initialise a blank employee object
    const employee = {
      firstName: "",
      lastName: "",
      salary: 0, // initialise the salary to be 0, this can be overwritten later if the user enters a valid number
    };

    // we need to prompt the user to enter in:
    // 'first name',
    employee.firstName = prompt("Enter first name: ");
    // 'last name'
    employee.lastName = prompt("Enter last name: ");
    // 'salary'
    let inputSalary = prompt("Enter salary: "); // we store it in a temporary variable, to check if its valid, instead of loading it straight into the `employee` object

    // we also have to validate that the salary is a number, otherwise leave it as 0.
    if (!isNaN(inputSalary)) {
      employee.salary = Number(inputSalary);
    }

    // finally we have to push the user-entered employee details into the `employees` array
    employees.push(employee);

    // ask the user to add another OR finish and break out of the loop
    addEmployees = confirm("Do you wish to add more employees?");
  }
  return employees;
};

// Display the average salary
const displayAverageSalary = function (employeesArray) {
  // TODO: Calculate and display the average salary
  // we know that the employees array that we built in collectEmployees() will return an object with the `salary` attribute.
  // we have to extract a list of all the values, explicitly from the employees array.
  const salaries = employeesArray.map(a => a.salary); // returns `[100000, 90000, ...]`
  // the `map` function returns an array of values from an object, and we select the salary key to extract the values from
  // ref: https://stackoverflow.com/questions/19590865/from-an-array-of-objects-extract-value-of-a-property-as-array

  // calculate the average of all of the values, we know that the average should be the sum of all values, divided by the total number of values.
  const employeeTotal = salaries.length; // get the total number of salaries by getting the length of the salary array
  let sum = salaries.reduce((acc, current) => {
    return acc + current;
  }, 0); // this function sums all the numbers of an array into a total number
  // ref: https://www.freecodecamp.org/news/how-to-add-numbers-in-javascript-arrays/
  
  const average = parseFloat((sum / employeeTotal)).toFixed(2); // calculate the average and round off to 2 decimal places

  // log the value in the console, we don't need to return anything
  console.log(`The average employee salary between our ${employeeTotal} employee(s) is $${average}`);
};

// Select a random employee
const getRandomEmployee = function (employeesArray) {
  // TODO: Select and display a random employee
  let randomEmployeeName;
  
  // we need to get the number of employees entered in the table
  let numEmployees = employeesArray.length;

  // we take the number, and pass it into our RNG function below, to generate a random index
  let randomIdx = getRandomInt(numEmployees);

  // we access the array using the index we randomly generate and grab the person's first and last name
  let randomEmployee = employeesArray[randomIdx];
  randomEmployeeName = `${randomEmployee.firstName} ${randomEmployee.lastName}`

  // we log the person into console
  console.log(`Congratulations to ${randomEmployeeName}, our random drawing winner!`);
};

/* 
Generates a number from 0 to `max`.
Example: `getRandomInt(3);` will output 0, 1 or 2.
Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
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
  const employeeTable = document.querySelector("#employee-table");

  // Clear the employee table
  employeeTable.innerHTML = "";

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
};

const trackEmployeeData = function () {
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log("==============================");

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
addEmployeesBtn.addEventListener("click", trackEmployeeData);
