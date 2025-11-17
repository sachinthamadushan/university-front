import { FcWorkflow } from "react-icons/fc";
import { CourseForm } from "../components/CourseForm";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useCallback, useEffect, useState } from "react";
import { courseAPI } from "../services/api";
import toast from "react-hot-toast";

export const CoursePage = () => {
  const [courses, setCourses] = useState([]);
  const [hasCourse, setHasCourses] =  useState(false);
  
  const fetchCourses = useCallback(async () => {
    try {
      const response = await courseAPI.getAllCourses();
      if(response.data){
        setCourses(response.data.data);
        setHasCourses(true);
      }
    } catch (error) {
      console.error("Faild to fetch courses", error);
    }
  }, []);
  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm("Are you want to delete the course")) {
      const deletePromise = courseAPI.deleteCourse(courseId);
      toast
        .promise(deletePromise, {
          loading: "Deleting course",
          success: <b>Course deleted successfully!</b>,
          error: <b>Failed course delete</b>,
        })
        .then(() => fetchCourses())
        .catch((error) => console.error(error));
    }
  };

  return (
    <div>
      <CourseForm onCourseAdded={fetchCourses} />

      <div className="bg-white rounded-lg shadow-md p-6 overflow-x-auto">
        <h1 className="flex items-center text-2xl font-bold mb-4 gap-2">
          <FcWorkflow className="w-10 h-10" />
          <span>Courses List</span>
        </h1>
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-6 py-3">Code</th>
              <th className="px-6 py-3">Course Name</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Course Fee</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {
            hasCourse ? (
              courses.map((course) => {
              return (
                <tr key={course.course_id} className="hover:bg-gray-50">
                  <td
                    className="px-6 py-4 text-gray-900
                        font-light whitespace-pre-line"
                  >
                    {course.course_code}
                  </td>
                  <td
                    className="px-6 py-4 text-gray-900
                        font-light whitespace-pre-line"
                  >
                    {course.course_name}
                  </td>
                  <td
                    className="px-6 py-4 text-gray-900
                        font-light whitespace-pre-line"
                  >
                    {course.description}
                  </td>
                  <td
                    className="px-6 py-4 text-gray-900
                        font-light whitespace-pre-line"
                  >
                    Rs.{course.course_fee}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        className="px-2 py-2 border border-amber-400
                                rounded hover:bg-amber-500 hover:text-white
                                hover:shadow-md text-amber-500"
                      >
                        <FaEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          handleDeleteCourse(course.course_id);
                        }}
                        className="px-2 py-2 border border-red-400
                                rounded hover:bg-red-500 hover:text-white
                                hover:shadow-md text-red-500"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
            ) : (
              <tr><td className="px-6 py-4 font-bold">Course not found</td></tr>
            )

            }
          </tbody>
        </table>
      </div>
    </div>
  );
};
