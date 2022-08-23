import axios from 'axios';

const hostUrl = process.env.REACT_APP_API_HOST_URL

export const getAllUsers = async () => {
    return await axios.get(`${hostUrl}/users`).then(response => response).catch(error => error);
}

export const getUser = async (id) => {
    return await axios.get(`${hostUrl}/users/${id}`).then(response => response).catch(error => error);
}

export const AddUser = async (data) => {
    return await axios.post(`${hostUrl}/users`, data).then(response => response).catch(error => error);
}

export const editUser = async(id, data) => {
    return await axios.put(`${hostUrl}/users/${id}`, data).then(response => response).catch(error => error);
}

export const deleteUser = async (id) => {
    return await axios.delete(`${hostUrl}/users/${id}`).then(response => response).catch(error => error);
}