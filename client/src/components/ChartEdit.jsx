import { useState, useEffect } from "react"
import { useExpense } from "../context/ExpenseProvider"
import { db } from "../firebase/firebase"
import { updateDoc, doc } from "firebase/firestore"
import { toast } from "react-toastify"
import { IoIosCloseCircle } from "react-icons/io"

export default function ChartEdit({ id, setEditingExpenseId }) {
  const { state, dispatch } = useExpense()
  const [newExpense, setNewExpense] = useState({
    item: "",
    category: "",
    price: "",
  })

  useEffect(() => {
    const expense = state.expenses.find((expense) => expense.id === id)
    setNewExpense(expense ? { item: expense.item, category: expense.category, price: expense.price } : {})
  }, [id, state.expenses])

  const handleUpdateExpense = async (e) => {
    e.preventDefault()

    if (!newExpense.item || !newExpense.category || !newExpense.price) {
      return toast.error("All fields are required!", { position: "top-center" })
    }

    try {
      await updateDoc(doc(db, "expenses", id), {
        item: newExpense.item,
        category: newExpense.category,
        price: newExpense.price,
      })

      dispatch({
        type: "UPDATE_EXPENSE",
        payload: {
          id,
          item: newExpense.item,
          category: newExpense.category,
          price: newExpense.price,
        },
      })

      setEditingExpenseId(null) // Exit edit mode
      toast.success("Expense updated successfully", { position: "top-center" })
    } catch (error) {
      console.error("Error updating expense:", error)
      toast.error("Failed to update the expense. Please try again.", {
        position: "top-center",
      })
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setNewExpense({
      ...newExpense,
      [name]: name === "price" ? Number(value) : value, // ✅ Convert price to number
    })
  }

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded border">
      <div className="absolute top-4 right-4 cursor-pointer"
        onClick={() => setEditingExpenseId(null)}>
        <IoIosCloseCircle size={30} />
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Edit Expense</h2>
        <form className="flex flex-col gap-4" onSubmit={handleUpdateExpense}>
          <input className="p-2 border rounded" type="text" name="item" value={newExpense.item} onChange={handleChange} placeholder="Item" />
          <select className="p-2 border rounded" name="category" value={newExpense.category} onChange={handleChange} placeholder="Category">
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
          <input type="text" className="p-2 border rounded" name="price" value={newExpense.price} onChange={handleChange} placeholder="Price" />
          <button className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer" type="submit">Update</button>
        </form>
      </div>
    </div>
  )
}
