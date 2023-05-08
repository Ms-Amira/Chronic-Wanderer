import PHeader from "../../components/PHeader/PHeader";
import Loader from '../../components/Loader/Loader'
import CardDisplay from "../../components/CardDisplay/CardDisplay";
import userService from "../../utils/userService";
import * as commentsApi from '../../utils/commentsApi'
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";

export default function UserPage({loggedInUser, handleLogout}) {
    const [posts, setPosts] = useState([]);
    const [profileUser, setProfileUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const {username} = useParams();
    console.log(username, 'username');

    useEffect(() => {
        getProfile();
    }, []);

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

    async function addComment(postId) {
        try {
            const data = await commentsApi.create(postId);
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

    if (error) {
        return (
          <>
            <PHeader loggedInUser={user} handleLogout={handleLogout} />
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
            <Grid.Column width={5}>
            <CardDisplay
                posts={posts}
                numPhotosCol={3}
                isProfile={true}
                loggedInUser={loggedInUser}
                 addComment={addComment}
                removeComment={removeComment}
                />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      );

}