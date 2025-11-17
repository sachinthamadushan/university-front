import { useState } from "react";
import { FcReadingEbook } from "react-icons/fc";
import { studentAPI } from "../services/api";
import toast from "react-hot-toast";

export const StudentForm = ({ onStudentAdded }) => {
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [email, setEmail] = useState("");
  // const [dob, setDob] = useState("");

  const [studentFormData,setStudentFormData] = useState({
    first_name:'',
    last_name:'',
    email:'',
    dob:''
  });

  const applyFormChanges = (e) => {
      const {name, value} = e.target
      setStudentFormData(prev => ({...prev, [name]:value}));
  }

  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSaveStudent = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const savePromise = studentAPI.createStudent(studentFormData);
      toast
        .promise(savePromise, {
          loading: "Student is saving...",
          success: <b>Student saved successfully !</b>,
          error: <b>Studnet not saved</b>,
        })
        .then(() => {
          if (onStudentAdded) {
            onStudentAdded();
          }
        })
        .finally(() => {
          setIsSubmitting(false);
          
        });
    } catch (error) {
      console.error("Failed to save student", error);
    }
  };

  return (
    <form
      onSubmit={handleSaveStudent}
      className="bg-white rounded-lg shadow-md p-6 mb-6"
    >
      <h1
        className="text-2xl flex items-center gap-2 font-bold 
      mb-4"
      >
        <FcReadingEbook /> <span>Add New Student</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="First Name"
          className="p-2 border rounded"
          required
          onChange={applyFormChanges}
          name="first_name"
          value={studentFormData.first_name}
        />
        <input
          type="text"
          placeholder="Last Name"
          className="p-2 border rounded"
          required
          onChange={applyFormChanges}
          name="last_name"
          value={studentFormData.last_name}
        />
        <input
          type="email"
          placeholder="Email"
          className="p-2 border rounded"
          required
          onChange={applyFormChanges}
          name="email"
          value={studentFormData.email}
        />
        <input
          type="date"
          placeholder="Email"
          className="p-2 border rounded"
          required
          onChange={applyFormChanges}
          name="dob"
          value={studentFormData.dob}
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-sky-500 px-4 py-2 rounded
      hover:bg-sky-600 text-white mt-4"
      >
        {isSubmitting ? 'Saving...' : 'Save Student' }
      </button>
    </form>
  );
};
