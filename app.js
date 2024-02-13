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

    clearField() {
    document.querySelector('#nameField').value = '';
    document.querySelector('#SalaryField').value = '';
    document.querySelector('#taxField').value = '';
    }

    alertMessage(messageType, message) {
        const markup = `<div class="alert alert-${messageType}"
                        role="alert">${message}</div>`;

        const form = document.querySelector('form');
        form.insertAdjacentHTML('beforebegin', markup);

        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 2000);
    }

    deleteEmployee(target) {
        if(target.matches('.delete')) {
            target.parentElement.parentElement.remove();
        }
    }

}

const addEmployeeButton = document.querySelector('#add_employee');
addEmployeeButton.addEventListener('click', e => {
    const name = document.querySelector('#nameField').value;
    const salary = document.querySelector('#SalaryField').value;
    const tax = document.querySelector('#taxField').value;

    const employeeUi = new EmployeeUI();

    if(name === '' || salary === '' || tax === '') {
        employeeUi.alertMessage('danger', 'Please complete the form.');
    } else {
        const employee = new Employee(name, salary, tax);

        // Assign a random id to the employee
        employee.id = employee.generateId();
        employee.netSalary = employee.calculateSalary();

        employeeUi.addEmployee(employee);
        employeeUi.alertMessage('success', 'Employee is added successfully!');
        employeeUi.clearField();

    }
});

document.querySelector('tbody').addEventListener('click', e => {
    const employeeUi = new EmployeeUI;
    
    employeeUi.deleteEmployee(e.target);
})

document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();
})

