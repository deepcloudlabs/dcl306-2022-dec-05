import React from "react";

export default function FormGroup({show=true,children}){
    if(!show)
        return "";
    return(
        <div className="form-group">
            {children}
        </div>
    );
}