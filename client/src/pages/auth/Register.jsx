import { db, auth } from '../../firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleConfirmPassword = () => {
    if (formData.password !== confirmPassword) {
      toast.error('Passwords do not match', {
        position: 'top-center',
      });
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!handleConfirmPassword()) return;

    try {
      await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password,
      );
      await setDoc(doc(db, 'users', auth.currentUser.uid), {
        username: formData.username,
        email: formData.email,
      });
      toast.success('Register successful', {
        position: 'top-center',
      });
      navigate('/login');
    } catch (error) {
      console.error(error);
      toast.error('Register failed', {
        position: 'top-center',
      });
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md md:w-1/3">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            className="p-2 border rounded"
            type="text"
            name="username"
            onChange={handleChange}
            placeholder="Username"
            required
          />
          <input
            className="p-2 border rounded"
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            className="p-2 border rounded"
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <input
            className="p-2 border rounded"
            type="password"
            name="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
          />
          <button
            className="bg-red-500 text-white p-2 rounded hover:cursor-pointer hover:bg-red-400 transition-all ease-in-out cursor-pointer"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
