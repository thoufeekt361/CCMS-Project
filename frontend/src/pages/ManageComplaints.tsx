import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";

function ManageComplaints() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [complaints, setComplaints] = useState<any[]>([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/complaints"
      );
      setComplaints(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await axios.put(
        `http://localhost:5000/api/complaints/${id}`,
        { status }
      );

      alert("Status Updated Successfully");
      fetchComplaints();
    } catch (err) {
      console.log(err);
      alert("Failed to update status");
    }
  };

  const deleteComplaint = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this complaint?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/complaints/${id}`
      );

      alert("Complaint Deleted Successfully");
      fetchComplaints();
    } catch (err) {
      console.log(err);
      alert("Failed to delete complaint");
    }
  };

  const filteredComplaints = complaints.filter((item) => {
    const matchesSearch =
      item.title?.toLowerCase().includes(search.toLowerCase()) ||
      item.category?.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || item.status === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="table-container">
      <AdminNavbar />

      <h1 className="mycom">Manage Complaints</h1>

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
              <th>Complaint</th>
              <th>Category</th>
              <th>Student</th>
              <th>Status</th>
              <th>Update Status</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {filteredComplaints.map((item) => (
              <tr key={item._id}>
                <td>{item._id.slice(-6)}</td>

                <td>{item.title}</td>

                <td>{item.category}</td>

                <td>
                  {item.student?.name || "Unknown"}
                </td>

                <td>{item.status}</td>

                <td>
                  <select
                    value={item.status}
                    onChange={(e) =>
                      updateStatus(item._id, e.target.value)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">
                      In Progress
                    </option>
                    <option value="Resolved">
                      Resolved
                    </option>
                  </select>
                </td>

                <td>
                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteComplaint(item._id)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageComplaints;