import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import userService from "../../utils/userService";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";

export default function LoginPage(props) {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();
  function handleChange(c) {
    setLogin({
      ...login,
      [c.target.name]: c.target.value,
    });
  }

  async function handleSubmit(s) {
    s.preventDefault();

    try {
      await userService.login(login);
      props.handleSignUpOrLogin();
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <h1>Chronic Wanderer</h1>
        <Image src="https://i.imgur.com/b4Mmgog.jpg" />
        <Header as="h2" color="pink" textAlign="center">
          Login to your account
        </Header>
        <Form onSubmit={handleSubmit} success>
          <Segment raised>
            <Form.Input
              type="email"
              name="email"
              placeholder="email"
              value={login.email}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="password"
              type="password"
              placeholder="password"
              value={login.password}
              onChange={handleChange}
              required
            />
            <Button
              color="pink"
              fluid
              size="large"
              type="submit"
              className="btn"
            >
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New here? <Link to="/signup">Sign Up</Link>
        </Message>
        {error ? <ErrorMessage error={error} /> : null}
      </Grid.Column>
    </Grid>
  );
}
