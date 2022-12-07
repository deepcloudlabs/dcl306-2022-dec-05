import {NO_IMAGE} from "./utility/hr-utility";

export default class Employee {
    constructor(emp = {
                    identityNo : "98975619846",
                    fullname : "jack bauer",
                    iban : "TR560006231821616239331936",
                    photo:NO_IMAGE,
                    birthYear:1980,
                    salary:100000,
                    department:"IT",
                    fulltime: true
                }) {
        this.identityNo = emp.identityNo;
        this.fullname = emp.fullname;
        this.iban = emp.iban;
        this.photo = emp.photo;
        this.birthYear = emp.birthYear;
        this.salary = emp.salary;
        this.department = emp.department;
        this.fulltime = emp.fulltime;

    }
};