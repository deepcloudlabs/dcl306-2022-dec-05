import React from "react";

export default function TableHead({headers}){
    return(
        <thead>
        <tr>
            {
                headers.split(",").map((name,index)=>
                    <th key={index}>{name}</th>
                )
            }
        </tr>
        </thead>
    );
}