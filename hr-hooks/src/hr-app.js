import {useState} from "react";
import Employee from "./employee";
import Container from "./component/common/container";
import EmployeeForm from "./component/employee-form";

function HrApp() {
  let [employee, setEmployee] = useState(new Employee({}));
  let [employees, setEmployees] = useState([]);

  return (
    <Container>
      <EmployeeForm></EmployeeForm>
    </Container>
  );
}

export default HrApp;
