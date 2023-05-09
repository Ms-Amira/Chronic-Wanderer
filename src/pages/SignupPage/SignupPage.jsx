import {
    Button,
    Form,
    Grid,
    Header,
    Image,
    Message,
    Segment,
  } from "semantic-ui-react";
  
  import { useState } from "react";
  import userService from "../../utils/userService";
  import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
  import { useNavigate } from "react-router-dom";



export default function Signup({handleSignUpOrLogin}) {
    const navigate = useNavigate()
    const [sign, setSign] = useState({
        username: '',
        email: '',
        password: '',
        passwordConf: '',
    });
    
    const [selectImage, setSelectImage] = useState('')
    const [error, setError] = useState('');

    function handleChange(c) {
        setSign({
            ...sign,
            [c.target.name]: c.target.value
        })
    }

    function handlePhoto(p) {
      console.log(p.target.files)
        setSelectImage(p.target.files[0]);
    }

    async function handleSubmit(s) {
        s.preventDefault();

        const formData = new FormData();
        formData.append('photo', selectImage);

        for (let input in sign) {
            formData.append(input, sign[input])
        }
        console.log(formData.forEach((item) => console.log(item)));

        try {
            await userService.signup(formData);
            handleSignUpOrLogin();
            navigate('/');

        } catch(err) {
            console.log(err.message, 'signup error')
            setError('check your terminal, there was an error signing up')
        }
    }
    
    return (
        <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
           <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" color="pink" textAlign="center">Chronic Wanderer</Header>
              <Image src="https://i.imgur.com/Bv9Wa9J.jpg" />
        <Header as="h2" color="pink" textAlign="center">
        Sign Up
            </Header>
            <Form autoComplete="off" onSubmit={handleSubmit}>
              <Segment raised>
                <Form.Input
                  name="username"
                  placeholder="username"
                  value={sign.username}
                  onChange={handleChange}
                  required
                />
                <Form.Input
                  type="email"
                  name="email"
                  placeholder="email"
                  value={sign.email}
                  onChange={handleChange}
                  required
                />
                <Form.Input
                  name="password"
                  type="password"
                  placeholder="password"
                  value={sign.password}
                  onChange={handleChange}
                  required
                />
                <Form.Input
                  name="passwordConf"
                  type="password"
                  placeholder="Confirm Password"
                  value={sign.passwordConf}
                  onChange={handleChange}
                  required
                />
                <Form.Field>
                  <Form.Input
                    type="file"
                    name="photo"
                    placeholder="upload image"
                    onChange={handlePhoto}
                  />
                </Form.Field>
                <Button 
                type="submit"
                className="btn"
                color="pink"
                fluid
                size="large">
                  Signup
                </Button>
              </Segment>
              {error ? <ErrorMessage error={error} /> : null}
            </Form>
          </Grid.Column>
        </Grid>
      );
}

