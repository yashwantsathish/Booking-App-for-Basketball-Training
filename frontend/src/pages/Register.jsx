import { useState } from 'react';
import { register } from '../services/auth';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await register(formData);
    localStorage.setItem('token', res.data.token);
    navigate('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Register</h1>
      <input name="name" placeholder="Name" className="border p-2 w-full" onChange={handleChange} required />
      <input name="email" placeholder="Email" type="email" className="border p-2 w-full" onChange={handleChange} required />
      <input name="password" placeholder="Password" type="password" className="border p-2 w-full" onChange={handleChange} required />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Sign Up</button>
    </form>
  );
}

export default Register;
