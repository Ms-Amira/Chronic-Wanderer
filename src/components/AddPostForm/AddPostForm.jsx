import { useState, useEffect } from "react";
import { Button, Form, Segment} from 'semantic-ui-react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import {geocodeByPlaceId, getLatLng} from "react-google-places-autocomplete";



export default function AddPostForm({handleAddPost}) {
    const [selectImage, setSelectImage] = useState('')
	const [value, setValue] = useState(null);
	const [state, setState] = useState({
        body: '',
        location: '',
        latitude: '',
        longitude: '',
    });


    function handleChange(c) {
		setState({
            ...state,
            [c.target.name]: c.target.value
			})
    }

    function handlePhoto(p) {
        setSelectImage(p.target.files[0])
    }

    function handleSubmit(s) {
        s.preventDefault();

        const formData = new FormData();
       
        formData.append('photo', selectImage);
		for (let input in state) {
            formData.append(input, state[input])
        }
        handleAddPost(formData);
    }


	useEffect(() => {
        if(value){
            geocodeByPlaceId(value.value.place_id)
            .then(results => getLatLng(results[0]))
            .then(({ lat, lng }) => {
      
            setState({
                ...state,
                location: value.value.description,
                latitude: lat, 
                longitude: lng
            })
        })}
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
				
				 <GooglePlacesAutocomplete
						selectProps={{
						value,
						onChange: setValue,
						}}
						apiKey='AIzaSyBxWCFRo8mxNv2rP_wmpmH70jE0IdTPf7I'
						apiOptions={{langauge: 'en'}}
					/>

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