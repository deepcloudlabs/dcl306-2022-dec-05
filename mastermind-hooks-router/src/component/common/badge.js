import React from "react";

export default function Badge({showLabel=true, className,value,label}){
    if (showLabel === false)
        return(
            <h5><span className={"badge " + className}>{value}</span></h5>
        );
    return(
        <h5> {label}: <span className={"badge " + className}>{value}</span></h5>
    );
}