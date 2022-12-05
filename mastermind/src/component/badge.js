import React from "react";

export default function Badge(props){
    return(
        <h3> {props.label}: <span className={"badge " + props.className}>{props.value}</span></h3>
    );
}