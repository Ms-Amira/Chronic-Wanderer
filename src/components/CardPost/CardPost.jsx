import { Card, Icon, Image, TextArea, Button, Form } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useState } from "react";


function CardPost({ post, isProfile, removeComment, addComment, loggedInUser, handleAddPost}) {
  const [body, setBody] = useState('')
    console.log(loggedInUser)

    const commentIndex = post.comments.findIndex(
        (comment) => comment.username === loggedInUser.username
    );

    const deleteComment = commentIndex > -1 ? 
    [
      ...post.comments.slice(0, commentIndex),
      ...post.comments.slice(commentIndex + 1)
  ] : post.comments;

  function handleChange(c) {
    setBody(c.target.value)
}

  function handleSubmit(s) {
    s.preventDefault();

    const formData = new FormData();
    formData.append('body', body);
    handleAddPost(formData);
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
          <Card.Content extra textAlign={"right"}>
            {post.comments.length} Comments
          </Card.Content>
          <Card.Content> 
          <Form onSubmit={handleSubmit}>
          <TextArea rows={2} placeholder="What's on your mind?"
          name="body" onChange={handleChange} />
       <Button deleteComment={deleteComment} type="submit">Add Post</Button>
          </Form>
          </Card.Content>
        </Card>
      );

}

export default CardPost;