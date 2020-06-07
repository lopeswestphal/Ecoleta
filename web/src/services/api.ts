import axios from 'axios';

//O bom de se usar o axios e que se pode criar uma (baseURL:)
const api = axios.create({
    baseURL: 'http://localhost:3333'
})

export default api;