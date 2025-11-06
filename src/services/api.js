import axios from "axios";

const api = axios.create(
    {
        baseURL:'http://localhost:3000/api/v1',
        headers:{
            'Content-Type':'application/json'
        }
    }
);

export const studentAPI = {
    createStudent: (studnet) => api.post('/students/create',studnet),
    getAllStudent: () => api.get('/students/all')
}