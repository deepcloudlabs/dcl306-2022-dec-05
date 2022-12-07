import CardBody from "./common/card-body";
import CardHeader from "./common/card-header";
import Card from "./common/card";
import FormGroup from "./common/form-group";
import Input from "./common/input";
import SelectBox from "./common/select-box";
import Image from "./common/image";
import CheckBox from "./common/check-box";
import TableHead from "./common/table-head";

export default function EmployeeForm({props}) {
    let departments = ["IT", "Sales", "Finance", "HR"];

    return (
        <>
            <Card>
                <CardHeader title="Employee Form"></CardHeader>
                <CardBody>
                    <FormGroup>
                        <Input type="text"
                               id="identityNo"
                               label="Identity"
                               value={props.hr.employee.identityNo}
                               onChange={props.onChange}></Input>
                        <div className="input-group-append">
                            <button onClick={() => props.findEmployeeById(props.hr.employee.identityNo)}
                                    className="btn btn-success">Find Employee
                            </button>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Input type="text"
                               id="fullname"
                               label="Full Name"
                               value={props.hr.employee.fullname}
                               onChange={props.onChange}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Input type="text"
                               id="salary"
                               label="Salary"
                               value={props.hr.employee.salary}
                               onChange={props.onChange}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Input type="text"
                               id="iban"
                               label="IBAN"
                               value={props.hr.employee.iban}
                               onChange={props.onChange}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Input type="text"
                               id="birthYear"
                               label="Birth Year"
                               value={props.hr.employee.birthYear}
                               onChange={props.onChange}></Input>
                    </FormGroup>
                    <FormGroup>
                        <SelectBox
                            id="department"
                            label="Department"
                            value={props.hr.employee.department}
                            values={departments}
                            onChange={props.onChange}></SelectBox>
                    </FormGroup>
                    <FormGroup>
                        <Image id="photo"
                               label="Photo"
                               image={props.hr.employee.photo}
                               handleFileChange={props.handleFileChange}
                               onChange={props.onChange}></Image>
                    </FormGroup>
                    <FormGroup>
                        <CheckBox id="fulltime"
                                  handleChange={props.onChange}
                                  value={props.hr.employee.fulltime}
                                  label="FULL-TIME?"></CheckBox>
                    </FormGroup>
                    <FormGroup>
                        <div className="btn-group">
                            <div className="d-grid gap-4 d-md-block">
                                <button type="button"
                                        onClick={() => props.hireEmployee(props.hr.employee) }
                                        className="btn btn-success">Hire Employee
                                </button>
                                <button type="button"
                                        onClick={() => props.fireEmployee(props.hr.employee)}
                                        className="btn btn-danger">Fire Employee
                                </button>
                                <button type="button"
                                        onClick={() => props.updateEmployee(props.hr.employee)}
                                        className="btn btn-warning">Update Employee
                                </button>
                                <button type="button"
                                        onClick={props.findEmployees}
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
                            props.hr.employees.map( (emp,index) =>
                               <tr key={emp.identityNo} onClick={() => props.copyTableRowToModel(emp)}>
                                   <td>{index+1}</td>
                                   <td><img alt="" className="img-thumbnail" src={emp.photo}/></td>
                                   <td>{emp.identityNo}</td>
                                   <td>{emp.fullname}</td>
                                   <td>{emp.salary}</td>
                                   <td>{emp.iban}</td>
                                   <td>{emp.birthYear}</td>
                                   <td>{emp.department}</td>
                                   <td>{emp.fulltime ? 'FULL TIME':'PART TIME'}</td>
                                   <td><button  onClick={() => props.fireEmployeeByIdentity(emp.identityNo) }
                                                className="btn btn-danger">Fire Employee</button></td>
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