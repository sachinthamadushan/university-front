import { FcElectricalSensor } from "react-icons/fc";
import { EntrollForm } from "../components/EnrollForm";
import { FaEdit, FaTrash } from "react-icons/fa";

export const EntrollmentPage = () => {
  return (
    <div className="">
      <EntrollForm />

      <div className="p-6 shadow-lg bg-white rounded-lg">
        <h1 className="text-2xl font-bold flex items-center gap-2 mb-6">
          <FcElectricalSensor className="w-10 h-10" />
          <span>Entrollments Details</span>
        </h1>
        <div className="overflow-x-auto">
          <table
            className="w-full bg-gray-100 text-gray-700
                    text-left"
          >
            <thead>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Student</th>
              <th className="px-6 py-3">Course</th>
              <th className="px-6 py-3">Fee</th>
              <th className="px-6 py-3"></th>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4">2025-7-10</td>
                <td className="px-6 py-4">Root Edawad</td>
                <td className="px-6 py-4">English</td>
                <td className="px-6 py-4">Rs.40000</td>
                <td>
                  <div className="flex justify-center gap-2">
                    <button
                      className="px-2 py-2 border border-amber-400
                                                                   rounded hover:bg-amber-500 hover:text-white
                                                                   hover:shadow-md text-amber-500"
                    >
                      <FaEdit className="w-4 h-4" />
                    </button>
                    <button
                      className="px-2 py-2 border border-red-400
                                                                   rounded hover:bg-red-500 hover:text-white
                                                                   hover:shadow-md text-red-500"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>{" "}
                  <div className="flex"></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
