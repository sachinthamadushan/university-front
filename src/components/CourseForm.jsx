import { useState } from "react";
import { FcGraduationCap } from "react-icons/fc";
import { courseAPI } from "../services/api";
import toast from "react-hot-toast";

export const CourseForm = ({ onCourseAdded }) => {
  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseFee, setCourseFee] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSaveCourse = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const course = {
      course_name: courseName,
      course_code: courseCode,
      description: courseDescription,
      course_fee: courseFee,
    };
    const savePromise = courseAPI.createCourse(course);
    toast
      .promise(savePromise, {
        loading: "Course is saving...",
        success: <b>Course saved successfully !</b>,
        error: <b>Course not saved</b>,
      })
      .then(() => {
        if (onCourseAdded) {
          onCourseAdded();
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsSubmitting(false);
        setCourseCode("");
        setCourseDescription("");
        setCourseName("");
        setCourseFee(0);
      });
  };

  return (
    <div>
      <form
        onSubmit={handleSaveCourse}
        className="p-6 shadow-lg rounded-lg bg-white mb-6"
      >
        <h1 className="text-2xl font-bold flex items-center gap-2 mb-4">
          <FcGraduationCap className="w-10 h-10" />
          <span>Add New Course</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Course Code"
            className="p-2 border rounded"
            required
            onChange={(e) => setCourseCode(e.target.value)}
            value={courseCode}
          />
          <input
            type="text"
            placeholder="Course Name"
            className="p-2 border rounded"
            required
            onChange={(e) => setCourseName(e.target.value)}
            value={courseName}
          />
          <input
            type="number"
            placeholder="Course Fee"
            className="p-2 border rounded"
            required
            onChange={(e) => setCourseFee(e.target.value)}
            value={courseFee}
          />
          <textarea
            className="p-2 rounded border"
            placeholder="Description"
            onChange={(e) => setCourseDescription(e.target.value)}
            value={courseDescription}
          ></textarea>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-sky-500
                 hover:bg-sky-600 text-white rounded"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving course" : "Add Course"}
        </button>
      </form>
    </div>
  );
};
