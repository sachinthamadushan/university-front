import { FcWorkflow } from "react-icons/fc";
import { CourseForm } from "../components/CourseForm";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useCallback, useEffect, useState } from "react";

export const CoursePage = () => {

    const [courses,setCourses] = useState([]);

    useCallback( async() => {
        try {
            
        } catch (error) {
            console.error('Faild to fetch courses', error);
        }
    },[]);

    useEffect(
        () => {

        }
    );

    return(
        <div className="">
            <CourseForm/>

            <div className="bg-white rounded-lg shadow-md p-6">
                <h1 className="flex items-center text-2xl font-bold mb-4 gap-2">
                    <FcWorkflow className="w-10 h-10"/>
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
                    <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-gray-900
                        font-light whitespace-pre-line"
                        >SE-201</td>
                        <td className="px-6 py-4 text-gray-900
                        font-light whitespace-pre-line"
                        >Software Engineering</td>
                        <td className="px-6 py-4 text-gray-900
                        font-light whitespace-pre-line"
                        >Software Engineering</td>
                        <td className="px-6 py-4 text-gray-900
                        font-light whitespace-pre-line"
                        >Rs 2.5M</td>
                        <td className="px-6 py-4">
                            <div className="flex justify-end gap-2">
                                <button className="px-2 py-2 border border-amber-400
                                rounded hover:bg-amber-500 hover:text-white
                                hover:shadow-md text-amber-500">
                                    <FaEdit className="w-4 h-4"/>
                                </button>
                                <button className="px-2 py-2 border border-red-400
                                rounded hover:bg-red-500 hover:text-white
                                hover:shadow-md text-red-500">
                                    <FaTrash className="w-4 h-4"/>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>    
            </div>
        </div>
    ); 
}