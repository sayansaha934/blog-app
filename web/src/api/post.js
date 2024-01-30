import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;
console.log("apiUrl", apiUrl)

export async function getAllPosts() {
    const response = await axios.get(`${apiUrl}/posts`, {
        headers: {
            'accept': 'application/json',
        },
    });
    return response;

};
export async function getPostById(id) {
    const response = await axios.get(`${apiUrl}/posts/${id}`, {
        headers: {
            'accept': 'application/json',
        },
    });
    return response;

};

export async function updatePost(id, title, body) {
    const response = await axios.put(`${apiUrl}/posts/${id}`, { title: title, body: body }, {
        headers: {
            'accept': 'application/json',
        },
    });
    return response;

};


export async function deletePost(id) {
    const response = await axios.delete(`${apiUrl}/posts/${id}`, {
        headers: {
            'accept': 'application/json',
        },
    });
    return response;

};

export async function createPost(title, body) {
    const response = await axios.post(`${apiUrl}/posts`, { title: title, body: body }, {
        headers: {
            'accept': 'application/json',
        },
    });
    return response;

};