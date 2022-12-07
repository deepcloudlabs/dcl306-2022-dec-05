import Employee from "../employee";
import {NO_IMAGE} from "../utility/hr-utility";


export default function HrAppReducer(state, action) {
    if (state === undefined) {
        return {
            employee: new Employee(),
            employees: []
        }
    }
    let nextState = {...state};
    switch (action.type) {
        case "FIND_EMPLOYEE":
            nextState.employee = action.data;
            break;
        case "FIRE_EMPLOYEE":
            nextState.employee = action.data;
            const identityNo = action.data.identityNo;
            nextState.employees = [...state.employees].filter(e => e.identityNo !== identityNo)
            break;
        case "HIRE_EMPLOYEE":
            nextState.employees = [...state.employees]
            nextState.employees.push({...state.employee});
            break;
        case "UPDATE_EMPLOYEE":
            nextState.employees = [...state.employees].filter(e => e.identityNo !== nextState.employee.identityNo)
            nextState.employees.push({...state.employee});
            break;
        case "FIND_EMPLOYEES":
            nextState.employees = action.data;
            break;
        case "COPY_EMPLOYEE":
            nextState.employee = action.data;
            break;
        case "HANDLE_CHANGE":
            let {name, value} = action.event.target;
            nextState.employee[name] = value;
            break;
        case "UPDATE_EMPLOYEE_PHOTO":
            nextState.employee.photo = action.data;
            break;
    }
    return nextState;
}