import axios from "axios";
import { useState } from "react";
import { FcGraduationCap } from "react-icons/fc";

export const CourseForm = () => {

    const [courseCode, setCourseCode] = useState('');
    const [courseName, setCourseName] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [courseFee, setCourseFee] = useState(0);
    const [msg,setMsg] = useState('');

    const handleSaveCourse = async(e) => {
        e.preventDefault();
        const course = {
            course_name:courseName,
            course_code:courseCode,
            description:courseDescription,
            course_fee:courseFee
        };
        const request = axios.create({
            baseURL:'http://localhost:3000/api/v1/courses',
            headers:{'Content-Type':'application/json'}
        });
        await request.post('/create',course).then(
            (response) => {
                response.status === 201 ? setMsg(response.data.msg) 
                : setMsg('Course not saved!');
            }
        );
        alert(msg);
    }

    return(
        <div>
            <form onSubmit={handleSaveCourse} className="p-6 shadow-lg rounded-lg bg-white mb-6">
                <h1 className="text-2xl font-bold flex items-center gap-2 mb-4">
                    <FcGraduationCap className="w-10 h-10"/>
                    <span>Add New Course</span>
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <input type="text" placeholder="Course Code"
                    className="p-2 border rounded" required
                    onChange={(e) => setCourseCode(e.target.value)}
                    />
                    <input type="text" placeholder="Course Name"
                    className="p-2 border rounded" required
                    onChange={(e) => setCourseName(e.target.value)}/>
                    <input type="number" placeholder="Course Fee"
                    className="p-2 border rounded" required
                    onChange={(e) => setCourseFee(e.target.value)}/>
                    <textarea className="p-2 rounded border" 
                    placeholder="Description"
                    onChange={(e) => setCourseDescription(e.target.value)}></textarea>
                </div>
                <button type="submit" className="px-4 py-2 bg-sky-500
                 hover:bg-sky-600
                text-white rounded">Add Course</button>
            </form>
        </div>
    );
}