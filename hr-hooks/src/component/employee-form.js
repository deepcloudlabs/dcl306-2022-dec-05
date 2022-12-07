import CardBody from "./common/card-body";
import CardHeader from "./common/card-header";
import Card from "./common/card";
import FormGroup from "./common/form-group";
import Input from "./common/input";
import SelectBox from "./common/select-box";
import Image from "./common/image";
import CheckBox from "./common/check-box";
import TableHead from "./common/table-head";

export default function EmployeeForm({value,values,setValues, onChange, handleFileChange}) {
    let departments = ["IT", "Sales", "Finance", "HR"];

    function hireEmployee() {
        fetch("http://localhost:4001/employees", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(value)
        }).then(response => response.json())
            .then(console.table)
    }

    function fireEmployee() {

    }

    function updateEmployee() {

    }

    function findEmployeeById() {

    }

    function findEmployees() {
        fetch("http://localhost:4001/employees",{
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        }).then(response=>response.json())
            .then(employees => setValues(employees));
    }


    return (
        <>
            <Card>
                <CardHeader title="Employee Form"></CardHeader>
                <CardBody>
                    <FormGroup>
                        <Input type="text"
                               id="identityNo"
                               label="Identity"
                               value={value.identityNo}
                               onChange={onChange}></Input>
                        <div className="input-group-append">
                            <button onClick={findEmployeeById}
                                    className="btn btn-success">Find Employee
                            </button>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Input type="text"
                               id="fullname"
                               label="Full Name"
                               value={value.fullname}
                               onChange={onChange}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Input type="text"
                               id="salary"
                               label="Salary"
                               value={value.salary}
                               onChange={onChange}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Input type="text"
                               id="iban"
                               label="IBAN"
                               value={value.iban}
                               onChange={onChange}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Input type="text"
                               id="birthYear"
                               label="Birth Year"
                               value={value.birthYear}
                               onChange={onChange}></Input>
                    </FormGroup>
                    <FormGroup>
                        <SelectBox
                            id="department"
                            label="Department"
                            value={value.department}
                            values={departments}
                            onChange={onChange}></SelectBox>
                    </FormGroup>
                    <FormGroup>
                        <Image id="photo"
                               label="Photo"
                               image={value.photo}
                               handleFileChange={handleFileChange}
                               onChange={onChange}></Image>
                    </FormGroup>
                    <FormGroup>
                        <CheckBox id="fulltime"
                                  handleChange={onChange}
                                  value={value.fulltime}
                                  label="FULL-TIME?"></CheckBox>
                    </FormGroup>
                    <FormGroup>
                        <div className="btn-group">
                            <div className="d-grid gap-4 d-md-block">
                                <button type="button"
                                        onClick={hireEmployee}
                                        className="btn btn-success">Hire Employee
                                </button>
                                <button type="button"
                                        onClick={fireEmployee}
                                        className="btn btn-danger">Fire Employee
                                </button>
                                <button type="button"
                                        onClick={updateEmployee}
                                        className="btn btn-warning">Update Employee
                                </button>
                                <button type="button"
                                        onClick={findEmployees}
                                        className="btn btn-warning">Retrieve Employees
                                </button>
                            </div>
                        </div>
                    </FormGroup>
                </CardBody>
            </Card>
            <p></p>
            <Card>
                <CardHeader title="Employees"></CardHeader>
                <CardBody>
                    <table className="table table-striped table-bordered table-responsive">
                        <TableHead headers="No,Photo,Identity,Full Name,Salary,Iban,BirthYear,Department,Job Style,Operations"></TableHead>
                        <tbody>
                        {
                            values.map( (emp,index) =>
                               <tr>
                                   <td>{index+1}</td>
                                   <td><img alt="" className="img-thumbnail" src={emp.photo}/></td>
                                   <td>{emp.identityNo}</td>
                                   <td>{emp.fullname}</td>
                                   <td>{emp.salary}</td>
                                   <td>{emp.iban}</td>
                                   <td>{emp.birthYear}</td>
                                   <td>{emp.department}</td>
                                   <td>{emp.fulltime ? 'FULL TIME':'PART TIME'}</td>
                                   <td><button className="btn btn-danger">Fire Employee</button></td>
                               </tr>
                            )
                        }
                        </tbody>
                    </table>
                </CardBody>
            </Card>
        </>
    );
}