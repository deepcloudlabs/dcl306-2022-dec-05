import FormGroup from "./form-group";

export default function Input({id, label, type, value, onChange, children}) {
    return (
        <>
            <label htmlFor={id} className="form-label">{label}:</label>
            <div className="input-group mb-3">
                <input type={type}
                       id={id}
                       name={id}
                       value={value}
                       className="form-control"
                       onChange={onChange}></input>
                <div className="input-group-append">
                    {children}
                </div>
            </div>
        </>
    );
}