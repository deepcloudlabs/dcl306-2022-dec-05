function handleInputFileChange(event, {handleFileChange}){
    const filename = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        handleFileChange(e.target.result);
    }
    reader.readAsDataURL(filename);
}

export default function Image({id,label,image,handleFileChange}) {
    return (
        <div className="input-group">
            <label className="input-group-text"
                   htmlFor={id}>{label}</label>
            <img id={id}
                 alt=""
                 className="img-thumbnail"
                 src={image}/>
            <label>
                <input style={{'display': 'none'}}
                       className="form-control"
                       onChange={(event) => handleInputFileChange(event,{handleFileChange})}
                       type="file"/>
                <span className="btn btn-lg btn-info">File</span>
            </label>
        </div>
    );
}