import { useState, useEffect } from "react";
import { Button, Form, Segment} from 'semantic-ui-react'
// import GooglePlacesAutocomplete from 'react-google-places-autocomplete';



export default function AddPostForm({handleAddPost}) {
    const [body, setBody] = useState('')
    const [selectImage, setSelectImage] = useState('')
	const [value, setValue] = useState(null);
	const [location, setLocation] = useState('')


    function handleChange(c) {
        setBody(c.target.value)
    }

    function handlePhoto(p) {
        setSelectImage(p.target.files[0])
    }

    function handleSubmit(s) {
        s.preventDefault();

        const formData = new FormData();
        formData.append('body', body);
        formData.append('photo', selectImage);
		formData.append('location', location)
        handleAddPost(formData);
    }


	useEffect(() => {
        if(value){
            setLocation(value.value.description)
        }
    },[value])

    return (
		<Segment>
			<Form onSubmit={handleSubmit}>
				<Form.TextArea 
					placeholder='Where did you wander to?'
					required
					style={{ minHeight: 100 }}
					name="body"
					onChange={handleChange}
				/>
				
				 {/* <GooglePlacesAutocomplete
						selectProps={{
						value,
						onChange: setValue,
						}}
						apiKey='AIzaSyAToURi9EBlbQkghR2Qm0lHYu3cVQ2H6Pk'
					/> */}

				<Form.Input 
					type='file'
					placeholder="upload image"
					onChange={handlePhoto}
				/>
				<Button type="submit">Add Post</Button>
			</Form>
		</Segment>
	)


}