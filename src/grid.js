import React, { useState, useRef } from 'react';
import './grid.css';
import initialStudents from './studentsData';

const Grid = () => {
  const [students, setStudents] = useState(initialStudents);
  const [newStudent, setNewStudent] = useState({
    name: '',
    clg: '',
    department: '',
    percentage: ''
  });
  const [editIndex, setEditIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const studentRefs = useRef([]);

  const handleChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAddOrUpdate = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedStudents = [...students];
      updatedStudents[editIndex] = newStudent;
      setStudents(updatedStudents);
      setEditIndex(null);
    } else {
      setStudents([...students, newStudent]);
    }
    setNewStudent({ name: '', clg: '', department: '', percentage: '' });
  };

  const handleDelete = (index) => {
    const updatedStudents = students.filter((_, i) => i !== index);
    setStudents(updatedStudents);
  };

  const handleEdit = (index) => {
    setNewStudent(students[index]);
    setEditIndex(index);
  };

  const handleCancelEdit = () => {
    setNewStudent({ name: '', clg: '', department: '', percentage: '' });
    setEditIndex(null);
  };

  const scrollToStudent = (index) => {
    studentRefs.current[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="grid-wrapper">
      <h1 className="main-heading">Student Details Grid</h1>
      <h2 className="student-count">Total Students: {students.length}</h2>

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* Add / Edit Form */}
      <form onSubmit={handleAddOrUpdate} className="add-form">
        <input
          type="text"
          name="name"
          value={newStudent.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="text"
          name="clg"
          value={newStudent.clg}
          onChange={handleChange}
          placeholder="College"
          required
        />
        <input
          type="text"
          name="department"
          value={newStudent.department}
          onChange={handleChange}
          placeholder="Department"
          required
        />
        <input
          type="number"
          name="percentage"
          value={newStudent.percentage}
          onChange={handleChange}
          placeholder="Percentage"
          required
        />
        <div className="form-buttons">
          <button type="submit">{editIndex !== null ? 'Update Student' : 'Add Student'}</button>
          {editIndex !== null && (
            <button type="button" onClick={handleCancelEdit} className="cancel-btn">
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Student Table */}
      <div className="grid-table">
        <div className="grid-header">
          <div>No.</div>
          <div>Name</div>
          <div>College</div>
          <div>Department</div>
          <div>Percentage</div>
          <div>Actions</div>
        </div>

        {filteredStudents.length > 0 ? (
          filteredStudents.map((student, index) => (
            <div
              className="grid-row"
              key={index}
              ref={(el) => (studentRefs.current[index] = el)}
            >
              <div>{index + 1}</div>
              <div>{student.name}</div>
              <div>{student.clg}</div>
              <div>{student.department}</div>
              <div>{student.percentage}%</div>
              <div>
                <button className="edit-btn" onClick={() => handleEdit(index)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => handleDelete(index)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-data">No students available</div>
        )}
      </div>
    </div>
  );
};

export default Grid; 