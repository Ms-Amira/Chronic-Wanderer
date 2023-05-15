import tokenService from "./tokenService";
const BASE_URL = "/api/posts/";

export function create(data) {
  return fetch(BASE_URL, {
    method: "POST",
    body: data,
    headers: {
      Authorization: "Bearer " + tokenService.getToken(),
    },
  }).then((serverResponse) => {
    if (serverResponse.ok) return serverResponse.json();
    throw new Error("Something went wrong in create post");
  });
}

export function getAll() {
  return fetch(BASE_URL, {
    headers: {
      Authorization: "Bearer " + tokenService.getToken(),
    },
  }).then((res) => res.json());
}

export function deletePost(postId) {
  return fetch(`${BASE_URL}${postId}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + tokenService.getToken(),
    },
  }).then((res) => res.json());
}
