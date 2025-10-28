import { useEffect, useState } from "react";
import { studentService, StudentMark } from "@/services/studentService";

export function StudentMarks() {
  const [marks, setMarks] = useState<StudentMark[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch all marks on component mount
  useEffect(() => {
    setLoading(true);
    studentService
      .searchStudentMarks("") // fetch all marks
      .then((data) => setMarks(data))
      .finally(() => setLoading(false));
  }, []);

  // Handle search
  const handleSearch = async () => {
    setLoading(true);
    try {
      const data = await studentService.searchStudentMarks(searchQuery);
      setMarks(data);
    } catch (err) {
      console.error(err);
      alert("Failed to search marks");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Student Marks</h1>

      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search by student name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 flex-1 mr-2"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : marks.length === 0 ? (
        <p>No marks found.</p>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Student Name</th>
              <th className="border px-4 py-2">Course</th>
              <th className="border px-4 py-2">Marks</th>
              <th className="border px-4 py-2">Total Marks</th>
              <th className="border px-4 py-2">Percentage</th>
              <th className="border px-4 py-2">GPA</th>
            </tr>
          </thead>
          <tbody>
            {marks.map((m) => (
              <tr key={m.id}>
                <td className="border px-4 py-2">{m.studentName}</td>
                <td className="border px-4 py-2">{m.course}</td>
                <td className="border px-4 py-2">{m.marks}</td>
                <td className="border px-4 py-2">{m.totalMarks}</td>
                <td className="border px-4 py-2">{m.percentage.toFixed(2)}%</td>
                <td className="border px-4 py-2">{m.gpa}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
