
import { useState } from "react";
import { FcReadingEbook } from "react-icons/fc";
import { studentAPI } from "../services/api";

export const StudentForm = ({onStudentAdded}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [email,setEmail] = useState('');
    const [dob,setDob] = useState('');

    const handleSaveStudent = async(e) => {
        e.preventDefault();
        try {
            const student = {
                first_name:firstName,
                last_name:lastName,
                email:email,
                dob:dob
            }
            studentAPI.createStudent(student);
            onStudentAdded(); 
            setFirstName('');
            setLastName('');
            setEmail('');
            setDob('');
        } catch (error) {
            console.error("Failed to save student",error);
        }
    }

  return (
    <form onSubmit={handleSaveStudent} className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h1 className="text-2xl flex items-center gap-2 font-bold 
      mb-4">
        <FcReadingEbook /> <span>Add New Student</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="First Name"
          className="p-2 border rounded"
          required
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
        />
        <input
          type="text"
          placeholder="Last Name"
          className="p-2 border rounded"
          required
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
        />
        <input
          type="email"
          placeholder="Email"
          className="p-2 border rounded"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="date"
          placeholder="Email"
          className="p-2 border rounded"
          required
          onChange={(e) => setDob(e.target.value)}
          value={dob}
        />
      </div>
      <button
        type="submit"
        className="bg-sky-500 px-4 py-2 rounded
      hover:bg-sky-600 text-white mt-4"
      >
        Add Student
      </button>
    </form>
  );
};
