import axios from "../utils/axiosCustomize";

const postCreateNewUser = (email, password, username, role, image) => {
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);

    return axios.post('participant', data);
}

const getAllUsers = () => {
    return axios.get('participant/all');
}

const putUpdateUser = (id, username, role, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);

    return axios.put('participant', data);
}

const deleteUser = (id) => {
    return axios.delete('participant', {
        data: {
            id: id
        }
    });
}

const getUserWithPaginate = (page, limit) => {
    return axios.get(`participant?page=${page}&limit=${limit}`);
}

const postLogin = (email, password) => {
    return axios.post('login', {
        email: email,
        password: password
    })
}

export { postCreateNewUser, getAllUsers, putUpdateUser, deleteUser, getUserWithPaginate, postLogin }