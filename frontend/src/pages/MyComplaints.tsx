import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StudentNavbar from "../components/StudentNavbar";

function MyComplaints() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [complaints, setComplaints] = useState<any[]>([]);

  useEffect(() => {
    const studentId = localStorage.getItem("id");

    if (!studentId) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    axios
      .get(`http://localhost:5000/api/complaints?student=${studentId}`)
      .then((res) => {
        setComplaints(res.data);
      })
      .catch((err) => console.log(err));
  }, [navigate]);

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      complaint.title.toLowerCase().includes(search.toLowerCase()) ||
      complaint._id.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || complaint.status === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="mycontent">
      <StudentNavbar />

      <div className="table-container">
        <h1 className="mycom">My Complaints</h1>

        <div className="complaint-actions">
          <input
            type="text"
            placeholder="Search complaints..."
            className="search-box"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="filter-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        <div className="table-box">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {filteredComplaints.length > 0 ? (
                filteredComplaints.map((complaint) => (
                  <tr key={complaint._id}>
                    <td>{complaint._id.slice(-6)}</td>
                    <td>{complaint.title}</td>
                    <td>{complaint.category}</td>
                    <td>
                      <span
                        className={
                          complaint.status === "Pending"
                            ? "pending"
                            : complaint.status === "In Progress"
                            ? "progress"
                            : "resolved"
                        }
                      >
                        {complaint.status}
                      </span>
                    </td>
                    <td>
                      {new Date(
                        complaint.createdAt
                      ).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center" }}>
                    No complaints found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MyComplaints;