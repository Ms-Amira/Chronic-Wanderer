import PHeader from "../../components/PHeader/PHeader";
import Loader from '../../components/Loader/Loader'
import CardDisplay from "../../components/CardDisplay/CardDisplay";
import userService from "../../utils/userService";
import * as commentsApi from '../../utils/commentsApi'
import * as postsApi from '../../utils/postApi'
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";

export default function UserPage({loggedInUser, handleLogout, deletePost, removePost}) {
    const [posts, setPosts] = useState([]);
    const [profileUser, setProfileUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const {username} = useParams();
    console.log(username, 'username');

    useEffect(() => {
        getProfile();
    }, [username]);

    async function getProfile() {
        try {
            const data = await userService.getProfile(username);
            setLoading(false);
            setPosts(data.posts);
            setProfileUser(data.user);

        } catch(err) {
            console.log('UserPage error ->', err);
            setError("Profile doesn't exist")
        }
    }

    async function addComment(postId, body) {
        try {
            const data = await commentsApi.create(postId, body);
            getProfile()

        } catch(err) {
            console.log(err, 'error with adding a comment')
        }
    }

    async function removeComment(commentId) {
        try {
            const data = await commentsApi.removeComment(commentId);
            getProfile()
        } catch(err) {
            console.log(err, 'error in deletion of comment')
        }
    }

    async function removePost(postId) {
      try {
        const data = await postsApi.deletePost(postId)
        getProfile();
        console.log(data, "Post deleted successfully");
      } catch (err) {
        console.error(err, "error in deletion of post:");
      }
    }

    if (error) {
        return (
          <>
            <PHeader loggedInUser={loggedInUser} handleLogout={handleLogout} />
            <ErrorMessage error={error} />;
          </>
        );
      }

      if (loading) {
        return (
          <>
            <PHeader loggedInUser={loggedInUser} handleLogout={handleLogout} />
            <Loader />
          </>
        );
      }
    
      return (
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <PHeader loggedInUser={loggedInUser} handleLogout={handleLogout}  />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
          <Grid.Column style={{ maxWidth: 800 }}>
            <CardDisplay
                posts={posts}
                numPhotosCol={2}
                isProfile={true}
                loggedInUser={loggedInUser}
                addComment={addComment}
                removeComment={removeComment}
                deletePost={removePost}
                />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      );

}