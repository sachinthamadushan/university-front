import axios from "axios";

const api = axios.create(
    {
        baseURL:'http://localhost:5000/api/v1',
        headers:{
            'Content-Type':'application/json'
        }
    }
);

export const studentAPI = {
    createStudent: (studnet) => api.post('/students/create',studnet),
    getAllStudent: () => api.get('/students/all'),
    deleteStudent: (studentId) => api.put(`/students/delete/${studentId}`) 
}

export const courseAPI ={
    createCourse: (course) => api.post('/courses/create',course),
    getAllCourses: () => api.get('/courses/all'),
    deleteCourse: (courseId) => api.put(`/courses/delete/${courseId}`)
}

export const entrollmentAPI = {
    createEntrollment: (entrollment) => api.post('/entrollments/create',entrollment),
    getAllEntrollments: () => api.get('/entrollments/all')
}