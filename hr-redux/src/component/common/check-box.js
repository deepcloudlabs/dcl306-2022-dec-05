export default function CheckBox({id,label,value,handleChange}){
    return (
            <div className="form-check">
                <label className="form-check-label"
                       htmlFor={id}>{label}
                    <input id={id}
                           type="checkbox"
                           checked={value}
                           name={id}
                           onChange={handleChange}
                           className="form-check-input"></input>
                </label>
            </div>
    );
}