import React from "react";

export default function Badge({className,value,label}){
    return(
        <h3> {label}: <span className={"badge " + className}>{value}</span></h3>
    );
}