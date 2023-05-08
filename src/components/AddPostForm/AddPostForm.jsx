import { useState } from "react";
import { Button, Form, Segment} from 'semantic-ui-react'

export default function AddPostForm({handleAddPost}) {
    const [body, setBody] = useState('')
    const [selectImage, setSelectImage] = useState('')

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
        handleAddPost(formData);
    }

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