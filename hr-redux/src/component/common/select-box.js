import FormGroup from "./form-group";

export default function SelectBox({value,values,onChange,label,id}) {
    return (
        <>
            <label htmlFor={id}
                   className="form-label">{label}:</label>
            <select
                id={id}
                name={id}
                value={value}
                className="form-control"
                onChange={onChange}>
                {values.map((name,index)=>
                    <option key={name} value={name}>{name}</option>
                )}
            </select>
        </>
    );
}