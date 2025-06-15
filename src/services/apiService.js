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
        password: password,
        delay: 5000
    })
}

const postRegister = (email, password, username) => {
    return axios.post('register', {email, password, username})
}

const getQuizByUser = () => {
    return axios.get('quiz-by-participant')
}

const getDataQuiz = (quizId) => {
    return axios.get(`questions-by-quiz?quizId=${quizId}`);
}

const postSubmitQuiz = (data) => {
    return axios.post('quiz-submit', {...data})
}

const postCreateNewQuiz = (description, name, level, image) => {
    const data = new FormData();
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', level);
    data.append('quizImage', image);

    return axios.post('quiz', data)
}

const getAllQuizForAdmin = () => {
    return axios.get('quiz/all');
}

const deleteQuizForAdmin = (id) => {
    return axios.delete(`quiz/${id}`);
}

export { postCreateNewUser, getAllUsers, putUpdateUser, deleteUser,
    getUserWithPaginate, postLogin, postRegister, getQuizByUser, getDataQuiz,
    postSubmitQuiz, postCreateNewQuiz, getAllQuizForAdmin, deleteQuizForAdmin }