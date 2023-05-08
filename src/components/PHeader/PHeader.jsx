import { Link } from "react-router-dom";
import { Header, Segment, Image, Icon } from "semantic-ui-react";

function pHeader({loggedInUser, handleLogout}) {
    return (
        <Segment clearing>
      <Header as="h2" floated="right">
        <Link to="/">
          <Icon name="home"></Icon>
        </Link>
        <Link to="" onClick={handleLogout}>
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