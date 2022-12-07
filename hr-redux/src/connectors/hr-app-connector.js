import HrApp from "../hr-app";
import {connect} from "react-redux";

const mapStateToProps = function (store) {
    return {
        "hr": store.hrStore
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        hireEmployee: (employee) => {
            fetch("http://localhost:4001/employees", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(employee)
            }).then(response => response.json())
                .then(response => {
                    dispatch({type: "HIRE_EMPLOYEE", data: response});
                })
        },
        fireEmployee: (employee) => {
            fetch(`http://localhost:4001/employees/${employee.identityNo}`, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json"
                }
            }).then(response => response.json())
                .then(emp => {
                    dispatch({type: "FIRE_EMPLOYEE", data: emp});
                });
        },
        fireEmployeeByIdentity: (identity) => {
            fetch(`http://localhost:4001/employees/${identity}`, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json"
                }
            }).then(response => response.json())
                .then(emp => {
                    dispatch({type: "FIRE_EMPLOYEE", data: emp});
                });
        },
        updateEmployee: (employee) => {
            fetch("http://localhost:4001/employees", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(employee)
            }).then(response => response.json())
                .then(response => {
                    dispatch({type: "UPDATE_EMPLOYEE", data: response});
                })
        },
        findEmployeeById: (identityNo) => {
            fetch(`http://localhost:4001/employees/${identityNo}`, {
                method: "GET",
                headers: {
                    "Accept": "application/json"
                }
            }).then(response => response.json())
                .then(emp => {
                    dispatch({type: "FIND_EMPLOYEE", data: emp});
                });
        }, findEmployees: () => {
            fetch("http://localhost:4001/employees", {
                method: "GET",
                headers: {
                    "Accept": "application/json"
                }
            }).then(response => response.json())
                .then(emps => {
                    dispatch({type: "FIND_EMPLOYEES", data: emps});
                });
        }, copyTableRowToModel: (emp) => {
            dispatch({type: "COPY_EMPLOYEE", data: emp});
        },
        handleFileChange: (photo) => {
            dispatch({type: "UPDATE_EMPLOYEE_PHOTO", data: photo});
        },
        onChange: (event) => {
            dispatch({type: "HANDLE_CHANGE", event});
        }

    }
};

const HrAppConnector = connect(
    mapStateToProps,
    mapDispatchToProps
)(HrApp);

export default HrAppConnector;