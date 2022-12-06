import React from "react";

export default function CardHeader({title}){
    return(
        <div className="card-header">
            <h4 className="card-title">{title}</h4>
        </div>
    );
}