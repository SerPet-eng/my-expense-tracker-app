import { toast } from "react-toastify";
import { useExpense } from "../context/ExpenseProvider";
import { db, auth } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import ChartDisplay from "./ChartDisplay";
import { IoMdAddCircle } from "react-icons/io";

export default function ChartForm() {
  const { dispatch } = useExpense();
  const [newExpense, setNewExpense] = useState({
    item: "",
    category: "",
    price: "",
  });

  const resetExpense = () => {
    setNewExpense({ item: "", category: "", price: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewExpense({
      ...newExpense,
      [name]: name === "price" ? Number(value) : value, // ✅ Convert price to number
    });
  };

  const handleAddExpenses = async (e) => {
    e.preventDefault();
    if (!newExpense.item || !newExpense.category || !newExpense.price) {
      return toast.error("All fields are required!", { position: "top-center" });
    }

    try {
      const docRef = await addDoc(collection(db, "expenses"), {
        userId: auth.currentUser.uid,
        item: newExpense.item,
        category: newExpense.category,
        price: newExpense.price,
        createdAt: new Date(),
      });

      dispatch({
        type: "ADD_EXPENSE",
        payload: {
          id: docRef.id,
          item: newExpense.item,
          category: newExpense.category,
          price: newExpense.price,
        },
      });

      resetExpense();
      toast.success("Expense added successfully", { position: "top-center" });
    } catch (error) {
      console.error("Error adding expense:", error);
      toast.error("Something went wrong", { position: "top-center" });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6 max-md:pt-96">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <div className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-lg shadow-md border border-gray-300 w-full max-w-7xl">

        {/* Left - Form */}
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-bold mb-4">Add Expense</h2>
          <form onSubmit={handleAddExpenses} className="flex flex-col gap-4">
            <input
              type="text"
              name="item"
              value={newExpense.item}
              onChange={handleChange}
              placeholder="Expense Name"
              className="p-2 border rounded"
              required
            />
            <select
              name="category"
              value={newExpense.category}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            >
              <option value="">Select Category</option>
              <option value="Food">Food</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Utilities">Utilities</option>
              <option value="Transportation">Transportation</option>
              <option value="Health">Health</option>
              <option value="Clothing">Clothing</option>
              <option value="Education">Education</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="number"
              name="price"
              value={newExpense.price}
              onChange={handleChange}
              placeholder="Price"
              className="p-2 border rounded"
              min="0"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <IoMdAddCircle size={20} />
              Add Expense
            </button>
          </form>
        </div>

        {/* Right - Scrollable ChartDisplay */}
        <div className="w-full md:w-1/2 overflow-hidden border border-gray-300 rounded-lg">
          <div className="overflow-y-auto max-h-[400px]">
            <ChartDisplay />
          </div>
        </div>
      </div>
    </div>
  );
}
