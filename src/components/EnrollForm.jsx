import { useEffect, useState } from "react";
import { FcMindMap } from "react-icons/fc";
import { courseAPI, entrollmentAPI, studentAPI } from "../services/api";
import toast from "react-hot-toast";

export const EntrollForm = ({onEnrollmentAdded}) => {
    const [students,setStudents] = useState([]);
    const [courses,setCourses] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState('');
    const [selectedCourse, setselectedCourse] = useState('');
    const [isSubmitting,setIsSubmitting] = useState(false);

    const fetchData = async() => {
        try {
            const studentData = await studentAPI.getAllStudent();
            setStudents(studentData.data.data);

            const couresData = await courseAPI.getAllCourses();
            setCourses(couresData.data.data);
        } catch (error) {
            console.error('Failed to fetch data',error);
        }
    }

    useEffect(
        () => {
            fetchData();
        }
    ,[]);

    const handleSaveEntrollment = async(e) => {
      e.preventDefault();
      setIsSubmitting(true);
      const entrollment = {
        student_id:selectedStudent,
        course_id:selectedCourse 
      }
      const entrollPromise = entrollmentAPI.createEntrollment(entrollment);
      toast.promise(entrollPromise,
        {
          loading:"Saving entrollment",
          success:<b>Student entrolled successfully!</b>,
          error:<b>Enrollmnet failed!</b>
        }
      ).then(
        () => {
          setSelectedStudent('');
          setselectedCourse('');
          onEnrollmentAdded();
        }
      ).catch(
        (error) => {console.error('Saving error:',error)}
      ).finally(
        () => {setIsSubmitting(false)}
      );
    }

  return (
    <div className="bg-white p-6 shadow-md rounded-lg mb-6">
      <h1 className="text-2xl flex items-center font-bold gap-2 mb-6">
        <FcMindMap className="w-10 h-10" />
        <span>Student Enrollment</span>
      </h1>
      <form onSubmit={handleSaveEntrollment}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm
                    font-medium mb-2"
            >
              Select Student
            </label>
            <select className="w-full p-2 border rounded font-light"
            onChange={(e)=> {setSelectedStudent(e.target.value)}} 
            value={selectedStudent} required>
              <option value="">-- Select a student --</option>
              {
                students.map(
                    student => {
                       return <option key={student.student_id} value={student.student_id}>
                        {student.student_id} - {student.first_name} {student.last_name}
                        </option>
                    }
                )
              }
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm
                    font-medium mb-2"
            >
              Select Course
            </label>
            <select className="w-full p-2 border rounded font-light"
            onChange={(e) => {setselectedCourse(e.target.value)}} 
            value={selectedCourse} required>
              <option value="">-- Select a course --</option>
              {
                courses.map(
                    course => {
                        return <option key={course.course_id} value={course.course_id}>
                            {course.course_name} | {course.course_code}
                            </option>
                    }
                )
              }
            </select>
          </div>
        </div>
        <button className="px-4 py-2 bg-sky-500 text-white
        hover:bg-sky-600 rounded" disabled={isSubmitting}>
          {isSubmitting ? "Saving...":"Enroll"}
        </button>
      </form>
    </div>
  );
};
