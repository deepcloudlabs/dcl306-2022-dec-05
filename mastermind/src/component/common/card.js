import React from "react";

export default function Card({show=true,children}){
    if(!show)
        return "";
    return(
        <div className="card">
            {children}
        </div>
    );
}