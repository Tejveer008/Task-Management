import React, { useState, useEffect } from 'react';
import AdminProjectCard from '../components/AdminProjectCard';

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [assignedUser, setAssignedUser] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [progress, setProgress] = useState(0);
  const [priority, setPriority] = useState('');
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, usersRes] = await Promise.all([
          fetch('http://localhost:8080/api/projects'),
          fetch('http://localhost:8080/api/users')
        ]);

        const projectsData = await projectsRes.json();
        const usersData = await usersRes.json();

        setProjects(projectsData.projects);
        setUsers(usersData.users);
      } catch (err) {
        setError('Error fetching data');
      }
    };

    fetchData();
  }, []);

  const handleCreateOrUpdateTask = async () => {
    if (!newTask || !assignedUser || !dueDate || !priority) {
      setError('All fields are required');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('task', newTask);
      formData.append('userName', assignedUser);
      formData.append('dueDate', dueDate);
      formData.append('progress', progress);
      formData.append('priority', priority);
      if (file) formData.append('file', file);
      if (image) formData.append('image', image);

      const url = editingId
        ? `http://localhost:8080/api/projects/${editingId}`
        : 'http://localhost:8080/api/projects';

      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (!response.ok) throw new Error('Task operation failed');

      const result = await response.json();

      // If POST, add the new project to the list; if PUT, update existing
      if (editingId) {
        setProjects((prev) =>
          prev.map((p) => (p._id === editingId ? result.project : p))
        );
      } else {
        setProjects((prev) => [...prev, result.project]);
      }

      resetForm();
    } catch (err) {
      setError('Error saving task');
    }
  };

  const resetForm = () => {
    setNewTask('');
    setAssignedUser('');
    setDueDate('');
    setProgress(0);
    setPriority('');
    setFile(null);
    setImage(null);
    setImagePreview('');
    setEditingId(null);
  };

  const handleEdit = (project) => {
    setNewTask(project.task);
    setAssignedUser(project.userName);
    setDueDate(project.dueDate);
    setProgress(project.progress);
    setPriority(project.priority);
    setEditingId(project._id || project.id);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this task?');
    if (!confirm) return;

    try {
      const response = await fetch(`http://localhost:8080/api/projects/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Delete failed');

      const result = await response.json();
      setProjects(result.projects);
    } catch (err) {
      setError('Error deleting task');
    }
  };

  return (
    <div className="flex">
      <div className="flex-1 bg-blue-100 p-6">
        <div className="bg-white p-6 shadow-lg rounded-lg mb-8">
          <h2 className="font-bold text-xl mb-4">
            {editingId ? 'Edit Task' : 'Create and Assign a Task'}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Task Name" className="border p-2 rounded-lg" />
            <select value={assignedUser} onChange={(e) => setAssignedUser(e.target.value)} className="border p-2 rounded-lg">
              <option value="">Assign User</option>
              {users.map((user) => (
                <option key={user._id || user.id} value={user.username}>{user.username}</option>
              ))}
            </select>
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="border p-2 rounded-lg" />
            <input type="number" value={progress} min="0" max="100" onChange={(e) => setProgress(e.target.value)} className="border p-2 rounded-lg" placeholder="Progress (%)" />
            <select value={priority} onChange={(e) => setPriority(e.target.value)} className="border p-2 rounded-lg">
              <option value="">Priority</option>
              <option value="High">🔥 High</option>
              <option value="Medium">⚠️ Medium</option>
              <option value="Low">🧊 Low</option>
            </select>

            <input type="file" onChange={(e) => setFile(e.target.files[0])} className="border p-2 rounded-lg" />
            <input type="file" accept="image/*" onChange={(e) => {
              const file = e.target.files[0];
              setImage(file);
              setImagePreview(URL.createObjectURL(file));
            }} className="border p-2 rounded-lg" />
          </div>

          {imagePreview && (
            <div className="mt-4">
              <p className="text-sm font-medium mb-1">Image Preview:</p>
              <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover border rounded" />
            </div>
          )}

          <button onClick={handleCreateOrUpdateTask} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            {editingId ? 'Update Task' : 'Assign Task'}
          </button>
        </div>

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <h2 className="font-bold text-2xl mb-6">Assigned Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <AdminProjectCard
              key={project._id || project.id}
              userName={project.userName}
              task={project.task}
              userProgress={project.progress}
              taskDueDate={project.dueDate}
              status={project.status}
              priority={project.priority}
              attachmentUrl={project.attachmentUrl}
              onEdit={() => handleEdit(project)}
              onDelete={() => handleDelete(project._id || project.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
