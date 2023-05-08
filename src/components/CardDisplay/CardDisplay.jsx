import React from "react";
import { Card, Dimmer, Segment, Image } from "semantic-ui-react";
// import PostCard from "../PostCard/PostCard";
import Loader from "../Loader/Loader";

export default function CardDisplay({
    posts,
    isProfile,
    loading,
    addComment,
    removeComment,
    loggedInUser,
    photoColumn,
}) {
    if (loading) {
        return (
          <>
            <Segment>
              <Dimmer active inverted>
                <Loader size="small">Loading</Loader>
              </Dimmer>
              <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
            </Segment>
            {/* <Card.Group itemsPerRow={photoColumn} stackable>
              {posts.map((post) => {
                return (
                  <PostCard post={post} key={post._id} isProfile={isProfile} addComment={addComment}
                  removeComment={removeComment} loggedInUser={loggedInUser}/>
                );
              })}
            </Card.Group> */}
          </>
        );
      }

    //   return (
    //     <Card.Group itemsPerRow={photoColumn} stackable>
    //       {posts.map((post) => {
    //         return  <PostCard post={post} key={post._id} isProfile={isProfile} addComment={addComment}
    //         removeComment={removeComment} loggedInUser={loggedInUser}/>
    //       })}
    //     </Card.Group>
    //   );
}