import Container from "../component/common/container";
import Card from "../component/common/card";
import CardHeader from "../component/common/card-header";
import CardBody from "../component/common/card-body";
import {Link} from "react-router-dom";

export default function PlayerWins(){
    return(
        <>
         <p></p>
         <Container>
             <Card>
                 <CardHeader title="Good Game!"/>
                 <CardBody>
                     <Link to="/">Would you like to play again?</Link>
                 </CardBody>
             </Card>
         </Container>
        </>
    )
}