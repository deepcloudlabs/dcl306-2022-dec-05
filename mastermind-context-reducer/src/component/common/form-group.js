import React from "react";

export default function FormGroup({show=true,children}){
    if(!show)
        return "";
    return(
        <div className="mb-3">
            {children}
        </div>
    );
}