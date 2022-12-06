import Badge from "../common/badge";
import React from "react";

export default function MoveEvaluation({move}) {
    if (move.perfectMatch === 0 & move.partialMatch === 0) {
        return (
            <Badge showLabel="false" className="bg-warning" value="No match"></Badge>
        );
    }
    let badgePerfectMatch = "";
    if (move.perfectMatch > 0)
        badgePerfectMatch = <Badge showLabel={false} className="bg-success" value={move.perfectMatch}></Badge>;
    let badgePartialMatch = "";
    if (move.partialMatch > 0)
        badgePartialMatch = <Badge showLabel={false} className="bg-danger" value={move.partialMatch}></Badge>;
    return (
        <>
            {badgePartialMatch}
            {badgePerfectMatch}
        </>
    )

}