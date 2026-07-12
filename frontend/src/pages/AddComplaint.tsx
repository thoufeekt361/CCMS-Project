import { useState } from "react";
import axios from "axios";
import StudentNavbar from "../components/StudentNavbar";

function AddComplaint() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const student = localStorage.getItem("id");

  const handleSubmit = async () => {
    try {
      if (!title || !category || !description || !location) {
        alert("Please fill all fields");
        return;
      }

      const formData = new FormData();

      formData.append("title", title);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("location", location);

      // VERY IMPORTANT
      formData.append("student", student || "");

      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      const res = await axios.post(
        "http://localhost:5000/api/complaints/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(res.data.message);

      setTitle("");
      setCategory("");
      setDescription("");
      setLocation("");
      setSelectedFile(null);
    } catch (err) {
      console.log(err);
      alert("Failed to submit complaint");
    }
  };

  return (
    <div className="login-page">
      <StudentNavbar />

      <div className="form-box">
        <h2>Add Complaint</h2>

        <p className="complaint-message">
          Fill in the details to submit a new complaint.
        </p>

        <label>Title</label>
        <input
          type="text"
          placeholder="Enter complaint title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Classroom">Classroom</option>
          <option value="Laboratory">Laboratory</option>
          <option value="Hostel">Hostel</option>
          <option value="Library">Library</option>
          <option value="Internet/Wi-Fi">Internet/Wi-Fi</option>
          <option value="Electrical">Electrical</option>
          <option value="Water Supply">Water Supply</option>
          <option value="Cleanliness">Cleanliness</option>
          <option value="Other">Other</option>
        </select>

        <label>Description</label>
        <textarea
          rows={4}
          placeholder="Enter complaint description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Location</label>
        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <label htmlFor="image">Upload Image</label>

        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={(e) =>
            setSelectedFile(
              e.target.files ? e.target.files[0] : null
            )
          }
        />

        <button onClick={handleSubmit}>
          Submit Complaint
        </button>
      </div>
    </div>
  );
}

export default AddComplaint;