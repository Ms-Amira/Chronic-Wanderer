import tokenService from "./tokenService";


const BASE_URL = '/api/'


export function create(postId) {
    return fetch(`${BASE_URL}posts/${postId}/comments`, {
        method: 'POST',
        headers: {
            Authorization: "Bearer " + tokenService.getToken() 
        }
    }).then(res => res.json())
}


export function deleteComment(commentId) {
    return fetch(`${BASE_URL}comments/${commentId}`, {
        method: 'DELETE',
        headers: {
            Authorization: "Bearer " + tokenService.getToken() 
        }
    }).then(res => res.json())
}