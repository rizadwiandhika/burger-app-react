import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://react-my-burger-1f5bc-default-rtdb.firebaseio.com/'
})

export default instance