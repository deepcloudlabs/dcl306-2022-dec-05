import Container from "./component/common/container";
import EmployeeForm from "./component/employee-form";

function HrApp(props) {
     return (
        <Container>
            <p></p>
            <EmployeeForm props={props}/>
        </Container>
    );
}

export default HrApp;
