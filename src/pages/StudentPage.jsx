import { FcDataSheet } from "react-icons/fc";
import { StudentForm } from "../components/StudentForm";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import { studentAPI } from "../services/api";
import toast from "react-hot-toast";

export const StudentPage = () => {
  const [students, setStudents] = useState([]);
  const [hasStudents,setHasStudents] = useState(false);

  const fetchStudents = useCallback(async () => {
    try {
      await studentAPI.getAllStudent()
      .then((response) => {
      if (response.data.data) {
        setStudents(response.data.data);
        setHasStudents(true);
      }
      });
    } catch (error) {
      console.error("Failed to fetch students", error);
    }
  },[]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleDeleteStudent = async (studentId) => {
    if (window.confirm("Are you want to delete th student?")) {
      const deletePromise = studentAPI.deleteStudent(studentId);
      toast
        .promise(deletePromise, {
          loading: "Deleting student...",
          success: <b>Student Deleted Succesfully!</b>,
          error: <b>Failed delete</b>,
        })
        .then(
          () => fetchStudents()
        )
        .catch((error) => console.error("Delete faild", error));
    }
  };

  return (
    <div>
      <StudentForm onStudentAdded={fetchStudents} />

      <div className=" bg-white rounded-lg shadow-md p-6 mb-4 overflow-x-auto">
        <h1
          className="text-2xl font-bold flex items-center mb-4
            gap-2"
        >
          <FcDataSheet /> <span>Student List</span>
        </h1>
        <table
          className="w-full border-collapse bg-white
            text-left text-sm text-gray-500"
        >
          <thead className="bg-gray-100">
            <th
              className="px-6 py-4 font-medium
                    text-gray-900"
            >
              Name
            </th>
            <th
              className="px-6 py-4 font-medium
                    text-gray-900"
            >
              Email
            </th>
            <th
              className="px-6 py-4 font-medium
                    text-gray-900"
            >
              Date of Birth
            </th>
            <th
              className="px-6 py-4 font-medium
                    text-gray-900"
            ></th>
          </thead>
          <tbody>
            {
            hasStudents ? (
              students.map((student) => (
              <tr key={student.student_id} className="hover:bg-gray-50">
                <td
                  className="px-6 py-4 font-light
                        text-gray-700"
                >
                  {student.first_name} {student.last_name}
                </td>
                <td
                  className="px-6 py-4 font-light
                        text-gray-700"
                >
                  {student.email}
                </td>
                <td
                  className="px-6 py-4 font-light
                        text-gray-700"
                >
                  {format(new Date(student.dob), "yyyy-MMM-dd")}
                </td>
                <td>
                  <div className="flex justify-center gap-4">
                    <button
                      className="flex items-center border px-4 py-2
                                 border-amber-300 gap-1.5
                                rounded hover:bg-amber-300 hover:shadow-sm 
                                "
                    >
                      <FaEdit
                        className="h-4 w-4
                                 text-black"
                      />
                      <span
                        className="text-black
                                 font-medium"
                      >
                        Edit
                      </span>
                    </button>

                    <button
                      onClick={() => handleDeleteStudent(student.student_id)}
                      className="flex items-center border px-4 py-2
                                 border-red-500 gap-1.5
                                rounded hover:bg-red-600 hover:shadow-sm 
                                "
                    >
                      <FaTrash
                        className="h-4 w-4
                                 text-black"
                      />
                      <span
                        className="text-black
                                 font-medium"
                      >
                        Delete
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
            ))
            ) : (
              <tr><td className="px-6 py-4 text-center
              font-bold">No students Data</td></tr>
            )
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};
