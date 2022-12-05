// 1. Object-Based
let jack = { // Object
    "id": "1",
    "fullname": "jack bauer",
    "salary": 100000,
    "iban": "tr1",
    "department": "IT",
    "increaseSalary": function (rate) {
        this.salary = (1. + rate) * this.salary;
    }
}

// 2. Class-Based
function Employee(id, fullname, salary, iban, department) {
    this.id = id;
    this.fullname = fullname;
    this.salary = salary;
    this.iban = iban;
    this.department = department;

    this.increaseSalary = function (rate) {
        this.salary = (1. + rate) * this.salary;
    }
}

let kate = new Employee("2", "kate austen", 200000, "tr2", "Sales");

class Employee6 {
    constructor(id="11111111110", fullname="ben linus", salary=7500, iban="TR42", department="IT") {
        this.id = id;
        this.fullname = fullname;
        this.salary = salary;
        this.iban = iban;
        this.department = department;
        //this.increaseSalary = this.increaseSalary.bind(this)
    }

    increaseSalary = (rate=0.1) => {
        this.salary = (1. + rate) * this.salary;
        console.log(this)
    }
}
let james = new Employee6("3", "james sawyer", 150000, "tr3", "Finance");
let ben = new Employee6();
console.log(ben)
ben.increaseSalary(1.0);
console.log(ben)
window.setInterval(ben.increaseSalary, 3000)