import AddPostForm from '../../components/AddPostForm/AddPostForm'
import PHeader from '../../components/PHeader/PHeader'
import CardDisplay from '../../components/CardDisplay/CardDisplay'
import * as postsApi from '../../utils/postApi';
import * as commentsApi from '../../utils/commentsApi'
import { Grid } from 'semantic-ui-react';
import tokenService from '../../utils/tokenService';
import { useState } from 'react';
import { useEffect } from 'react';


export default function MainPage({loggedInUser, handleLogout}) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    async function handleAddPost(post) {
        try {
            setLoading(true);
            const responseData = await postsApi.create(post);
            setPosts([responseData.data, ...posts]);
            setLoading(false);
        } catch(err) {
            setLoading(false);
            console.log(err, 'error in addPost')
            setError('error in creating a post')
        }
    }

    async function getPosts() {
        try {
            const response = await postsApi.getAll();
            console.log(response, 'data');
            setPosts(response.posts);
            setLoading(false);
        } catch(err) {
            console.log(err.message, 'getPost error');
            setLoading(false);
        }
    }

    async function addComment(postId) {
        try {
            const data = await commentsApi.create(postId);
            getPosts()

        } catch(err) {
            console.log(err, 'error with adding a comment')
        }
    }

    async function removeComment(commentId) {
        try {
            const data = await commentsApi.removeComment(commentId);
            getPosts()
        } catch(err) {
            console.log(err, 'error in deletion of comment')
        }
    }

    useEffect(() => {
        getPosts();
    }, []);

    if (error) {
        return (
          <>
            <PHeader loggedInUser={loggedInUser} handleLogout={handleLogout} />
          </>
        );
      }
      return (
        <Grid centered>
          <Grid.Row>
            <Grid.Column>
              <PHeader loggedInUser={loggedInUser} handleLogout={handleLogout} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
          <Grid.Column width={5}>
              <AddPostForm handleAddPost={handleAddPost} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
          <Grid.Column width={5}>
              <CardDisplay
                posts={posts}
                photoColumn={1}
                isProfile={false}
                loading={loading}
                addComment={addComment}
                removeComment={removeComment}
                loggedInUser={loggedInUser}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      );
    }
