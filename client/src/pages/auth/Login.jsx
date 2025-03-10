import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      toast.success("Login successful", {
        position: "top-center",
      });
      navigate("/chart");
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Login failed", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md md:w-1/3">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-400"
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-400"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <button
            className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-200"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
