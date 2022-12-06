import CardBody from "./common/card-body";
import CardHeader from "./common/card-header";
import Card from "./common/card";
import FormGroup from "./common/form-group";
import Input from "./common/input";
import SelectBox from "./common/select-box";
import Image from "./common/image";
import CheckBox from "./common/check-box";

export default function EmployeeForm({value, onChange, handleFileChange}) {
    let departments = ["IT", "Sales", "Finance", "HR"];
    return (
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
                        <button className="btn btn-success">Find Employee</button>
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
                            <button type="button" className="btn btn-success">Hire Employee</button>
                            <button type="button" className="btn btn-danger">Fire Employee</button>
                            <button type="button" className="btn btn-warning">Update Employee</button>
                            <button type="button" className="btn btn-warning">Retrieve Employees</button>
                        </div>
                    </div>
                </FormGroup>
            </CardBody>
        </Card>
    );
}