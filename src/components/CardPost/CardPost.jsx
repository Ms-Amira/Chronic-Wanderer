import { Card, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";


function CardPost({ post, isProfile, removeComment, addComment, loggedInUser}) {
    console.log(loggedInUser)

    const commentIndex = post.comments.findIndex(
        (comment) => comment.username === loggedInUser.username
    );

    // const deleteComment = commentIndex > -1 ? 

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
        </Card>
      );

}

export default CardPost;