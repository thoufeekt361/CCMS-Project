
import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";

function ManageStudents() {
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/students")
      .then((res) => {
        setStudents(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const filteredStudents = students.filter(
    (student) =>
      student.name?.toLowerCase().includes(search.toLowerCase()) ||
      student.registerNo?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="table-container">
        <AdminNavbar />
      <h1 className="mycom">Manage Students</h1>

      <input
        type="text"
        placeholder="Search student..."
        className="search-box"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="table-box">
        <table>
          <thead>
            <tr>
              <th>Register No</th>
              <th>Name</th>
              <th>Branch</th>
              <th>Semester</th>
              <th>Email</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student._id}>
                <td>{student.registerNo}</td>
                <td>{student.name}</td>
                <td>{student.branch}</td>
                <td>{student.semester}</td>
                <td>{student.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageStudents;