import React from "react";

export default function Badge({showLabel=true, className,value,label}){
    console.log(showLabel)
    if (showLabel == false)
        return(
            <h3><span className={"badge " + className}>{value}</span></h3>
        );
    return(
        <h3> {label}: <span className={"badge " + className}>{value}</span></h3>
    );
}