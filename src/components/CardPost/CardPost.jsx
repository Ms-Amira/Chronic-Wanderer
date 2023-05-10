import { Card, Icon, Image, TextArea, Button, Form } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useState } from "react";


export default function CardPost({ post, isProfile, removeComment, addComment, loggedInUser, photoColumn, deletePost}) {
  const [body, setBody] = useState('')
    console.log(loggedInUser)


  function handleChange(c) {
    setBody(c.target.value)
}


  function handleSubmit(s) {
    s.preventDefault();
    addComment(post._id, body);
}

function handleDelete() {
  deletePost(post._id);
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
                  
              </Card.Header>
            </Card.Content>
          )}
          <Image src={`${post?.photoUrl}`} wrapped ui={false} />
          <Card.Content>
            <Card.Description>{post.body}</Card.Description>
          </Card.Content>
       
        <Card.Content>
          <Button onClick={() => deletePost(post._id)}>Delete Card</Button>
        </Card.Content>
          <Card.Content extra textAlign={"right"}>
            {post.comments.length} Comments
          </Card.Content>
          <Card.Content> 
          <Form onSubmit={handleSubmit}>
          <TextArea rows={2} placeholder="What's on your mind?"
          name="body" onChange={handleChange} />
       <Button type="submit">Add Comment</Button>
          </Form>
          </Card.Content>
          <Card.Group itemsPerRow={photoColumn} stackable>
              {post.comments.map((comment) => {
                return (
                  <div className="commentsEl">
                    <Card>
                  <Card.Content
                  key={comment._id}>
                    {comment.comments}
                    </Card.Content>
              <Button icon color="red" onClick={() => removeComment(comment._id)}>
                <Icon name="trash alternate outline"/>
              </Button>
                    </Card>
                  </div>
                );
              })}
            </Card.Group>
           
        </Card>
      );

}
