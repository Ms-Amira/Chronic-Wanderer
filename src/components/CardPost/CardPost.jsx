import { Card, Icon, Image, TextArea, Button, Form, Comment, Checkbox } from "semantic-ui-react";
import { Link, useNavigate} from "react-router-dom";
import { useState } from "react";
import GoogleMapReact from 'google-map-react'


export default function CardPost({ post, isProfile, removeComment, addComment, loggedInUser, photoColumn, deletePost}) {

  const navigate = useNavigate()
  const [body, setBody] = useState('')
  const [showMap, setShowMap] = useState(false)
  const [state, setState] = useState(true)
  const handleLocationClick = async () => {
    setShowMap(!showMap);
  };

  const defaultProps = {center: {
    lat: post.latitude,
    lng: post.longitude
  },zoom:8}


  function handleChange(c) {
    setBody(c.target.value)
}


// CLEAR FORM ISSUE
  function handleSubmit(s) {
    s.preventDefault();
    addComment(post._id, body);
    setBody({
      body: ''
    })
}

function handleDelete() {
  deletePost(post._id);
}

function handleCheckbox() {
  setState(!state)
}



    return (
      <Card raised>
          {isProfile ? (
            ""
            ) : (
            <Card.Content textAlign="left">
              <Card.Header>
                <Link to={`/${post.user.username}`}>
                  <Image
                    size="large"
                    avatar circular
                    src={
                      post.user.photoUrl
                      ? post.user.photoUrl
                      : "https://react.semantic-ui.com/images/wireframe/square-image.png"
                    }
                  />
                  {post.user.username}
                </Link>
                  
                <Card.Header textAlign="right" > <div onClick={handleLocationClick}>{post.location}</div>  </Card.Header>
              </Card.Header>
              {showMap && (
        <Card.Content textAlign="center">
          <div style={{ height: 200, width: "100%" }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: "AIzaSyBxWCFRo8mxNv2rP_wmpmH70jE0IdTPf7I",
            language: "en" }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
            >
              <div></div>
            </GoogleMapReact>
          </div>
        </Card.Content>
      )}
            </Card.Content>
          )}
          <Image src={`${post?.photoUrl}`} wrapped ui={false} />
          <Card.Content>
            <Card.Description>{post.body}</Card.Description>
          </Card.Content>
       
        <Card.Content>
          <Button onClick={() => {
            deletePost(post._id)
            navigate('/')
            }}>Delete Card</Button>
        </Card.Content>
        <Checkbox
          defaultChecked
          label='Collapse comments'
          onChange={handleCheckbox}
          />
          <Card.Content extra textAlign={"right"}>
              {post.comments.length} Comments
            <Comment.Group collapsed={state}>
              {post.comments.map((comment) => {
                return (
           <Comment>
            <Comment.Content>
            <Comment.Author>{comment.username}</Comment.Author>
            <Comment.Text>{comment.comments}
            </Comment.Text>
            </Comment.Content>
              <Button icon color="red" onClick={() => removeComment(comment._id)}>
                <Icon name="trash alternate outline" />
              </Button>
            </Comment>  
                )
              })}
            </Comment.Group>
          <Card.Content> 
          <Form onSubmit={handleSubmit}>
          <TextArea rows={2} placeholder="What's on your mind?"
          name="body" onChange={handleChange} />
          <br/>
          <br/>
        <Button content='Add Reply' labelPosition='right' icon='edit' primary />
          </Form>
          </Card.Content>
          <br/>
          <br/>
          </Card.Content>
           
        </Card>
      );

}
