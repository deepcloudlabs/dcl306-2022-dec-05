import {useState} from "react";
import Employee from "./employee";
import Container from "./component/common/container";
import EmployeeForm from "./component/employee-form";

function HrApp() {
    let [employee, setEmployee] = useState(new Employee({}));
    let [employees, setEmployees] = useState([]);
    let onChange = (event) => {
        let newEmployee = {...employee};
        newEmployee[event.target.name] = event.target.value;
        setEmployee(newEmployee);
    }
    let handlePhotoChange = (photo) => {
        setEmployee({...employee, photo});
    }
    function handleInputChange(event) {
        const {name, value} = event.target;
        let newEmployee = {...employee};
        if (name === 'fulltime') {
            newEmployee[name] = !newEmployee[name];
        } else {
            newEmployee[name] = value;
        }
        setEmployee(newEmployee);
    }
    return (
        <Container>
            <p></p>
            <EmployeeForm value={employee}
                          setValue={setEmployee}
                          values={employees}
                          setValues={setEmployees}
                          handleFileChange={handlePhotoChange}
                          onChange={handleInputChange}></EmployeeForm>
        </Container>
    );
}

export default HrApp;
