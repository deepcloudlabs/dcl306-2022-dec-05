import {NO_IMAGE} from "./utility/hr-utility";

export default class Employee {
    constructor({
                    identityNo = "98975619846",
                    fullname = "jack bauer",
                    iban = "TR560006231821616239331936",
                    photo=NO_IMAGE,
                    birthYear=1980,
                    salary=100000,
                    department="IT",
                    fulltime= true
                }) {
        this.identityNo = identityNo;
        this.fullname = fullname;
        this.iban = iban;
        this.photo = photo;
        this.birthYear = birthYear;
        this.salary = salary;
        this.department = department;
        this.fulltime = fulltime;

    }
};