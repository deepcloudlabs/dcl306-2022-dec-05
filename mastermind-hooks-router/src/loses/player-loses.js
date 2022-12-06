import CardHeader from "../component/common/card-header";
import CardBody from "../component/common/card-body";
import {Link} from "react-router-dom";
import Container from "../component/common/container";
import Card from "../component/common/card";

export default function PlayerLoses(){
    return(
        <>
            <p></p>
            <Container>
                <Card>
                    <CardHeader title="You have lost the game!"/>
                    <CardBody>
                        <Link to="/">Would you like to play again?</Link>
                    </CardBody>
                </Card>
            </Container>
        </>
    )
}