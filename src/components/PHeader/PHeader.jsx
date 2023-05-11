import { Link } from "react-router-dom";
import { Header, Segment, Image, Icon } from "semantic-ui-react";

function pHeader({loggedInUser, handleLogout}) {
    return (
        <Segment clearing>
          <h1 align="center" >Chronic Wanderer</h1>
      <Header as="h2" floated="right" align="center">
        <Link to="/">
          <Icon name="home" color='pink' />
        </Link>
        <Link to="" onClick={handleLogout} >
          Logout
        </Link>
      </Header>
      <Header as="h2" floated="left">
        <Link to={`/${loggedInUser?.username}`}>
          <Image
            src={
                loggedInUser?.photoUrl
                ? loggedInUser?.photoUrl
                : "https://react.semantic-ui.com/images/wireframe/square-image.png" 
            }
            avatar circular
          ></Image>
        </Link>
      </Header>
    </Segment>
    );
}

export default pHeader;