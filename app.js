class Employee {
    constructor(name, salary, tax) {
        this.name = name;
        this.salary = salary;
        this.tax = tax;
    }
    
    calculateSalary() {
        this.netSalary = Math.round(this.salary - ((this.tax / 100) * this.salary));
        return this.netSalary;
    }

    generateId() {
        this.id = Math.floor(Math.random() * 100000);
        return this.id;
    }
}

class EmployeeUI {
    addEmployee(employee) {
        const employeeList = document.querySelector('tbody');

        const markup = `<tr>
                            <th scope="row">${employee.id}</th>
                            <th>${employee.name}</th>
                            <th>$${employee.salary}</th>
                            <th>${employee.tax}%</th>
                            <th>$${employee.netSalary}</th>
                            <th><a href="#" class="btn btn-danger delete">Delete</a></th>
                        </tr>`

        employeeList.insertAdjacentHTML('afterbegin', markup);               

    }
}

const addEmployeeButton = document.querySelector('#add_employee');
addEmployeeButton.addEventListener('click', e => {
    const name = document.querySelector('#nameField').value;
    const salary = document.querySelector('#SalaryField').value;
    const tax = document.querySelector('#taxField').value;

    if(name === '' || salary === '' || tax === '') {
        alert('Please complete the form.');
    } else {
        const employee = new Employee(name, salary, tax);

        // Assign a random id to the employee
        employee.id = employee.generateId();
        employee.netSalary = employee.calculateSalary();

        const employeeUi = new EmployeeUI();
        employeeUi.addEmployee(employee);

    }
});

document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();
})

