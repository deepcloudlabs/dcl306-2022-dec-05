import Badge from "../common/badge";
import React from "react";

export default function MoveEvaluation({move}) {
    if (move.perfectMatch === 0 & move.partialMatch === 0) {
        return (
            <h5><span className="badge bg-warning">No match</span></h5>
        );
    }
    let badgePerfectMatch = "";
    if (move.perfectMatch > 0)
        badgePerfectMatch = <span className="badge bg-success">{move.perfectMatch}</span>;
    let badgePartialMatch = "";
    if (move.partialMatch > 0)
        badgePartialMatch = <span className="badge bg-danger">{move.partialMatch}</span>;
    return (
        <>
            <h5>{badgePartialMatch} {badgePerfectMatch}</h5>
        </>
    )

}