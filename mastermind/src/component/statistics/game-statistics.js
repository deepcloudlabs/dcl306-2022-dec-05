import React from "react";
import Card from "../common/card";
import CardHeader from "../common/card-header";
import CardBody from "../common/card-body";
import Badge from "../common/badge";

export default function GameStatistics({statistics}) {
    return (
        <Card>
            <CardHeader title="Game Statistics"/>
            <CardBody>
                <Badge label="Wins" className="bg-success" value={statistics.wins}></Badge>
                <Badge label="Loses" className="bg-danger" value={statistics.loses}></Badge>
            </CardBody>
        </Card>
    );

}