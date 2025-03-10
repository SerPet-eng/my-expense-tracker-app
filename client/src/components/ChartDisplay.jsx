import { useExpense } from "../context/ExpenseProvider"
import { db, auth } from '../firebase/firebase'
import { deleteDoc, doc } from "firebase/firestore"
import { toast } from "react-toastify"
import ChartEdit from './ChartEdit'
import { useState } from "react"

export default function ChartDisplay() {
  const { state, dispatch } = useExpense()
  const [editingExpense, setEditingExpense] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  const filteredExpenses = state.expenses.filter((expense) => {
    const matchesSearch = searchQuery
      ? expense.item.toLowerCase().includes(searchQuery.toLowerCase()) : true
    const matchesCategory = selectedCategory ? expense.category === selectedCategory : true

    return matchesSearch && matchesCategory
  })

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this expense?')) return
    try {
      await deleteDoc(doc(db, 'expenses', id))
      dispatch({ type: 'DELETE_EXPENSE', payload: id })
      toast.success('Expense deleted successfully', { position: 'top-center' })
    } catch (error) {
      console.error('Error deleting expense:', error)
      toast.error('Something went wrong', { position: 'top-center' })
    }
  }

  return (
    <div >
      <div
        className={`${editingExpense
          ? 'block w-screen h-screen absolute top-0 left-0 bg-black opacity-50'
          : 'hidden'
          }`}
      ></div>
      <div className="border border-gray-300 p-4 rounded-lg shadow-md bg-white">
        <form className="mt-4 flex flex-col md:flex-row gap-4">
          <input className="p-2 border rounded w-full md:w-auto ml-auto" type="text" placeholder="Search by item" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <select
            name="category"
            className="p-2 border rounded mr-auto"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Food">Food</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Utilities">Utilities</option>
            <option value="Transportation">Transportation</option>
            <option value="Health">Health</option>
            <option value="Clothing">Clothing</option>
            <option value="Education">Education</option>
            <option value="Other">Other</option>
          </select>
        </form>


        {filteredExpenses.length === 0 ? (
          <p className="text-center text-gray-500">No expenses found.</p> // ✅ Moved outside <table>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <caption className="text-lg font-semibold my-2">Expenses</caption>
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border">Item</th>
                <th className="p-3 border">Category</th>
                <th className="p-3 border">Price</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((expense) => (
                <tr key={expense.id}>
                  <td className="p-3 border">{expense.item}</td>
                  <td className="p-3 border">{expense.category}</td>
                  <td className="p-3 border">${expense.price}</td>
                  <td className="p-3 border flex justify-center space-x-2">
                    <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600" onClick={() => setEditingExpense(expense)}>
                      Edit
                    </button>
                    <button className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600" onClick={() => handleDelete(expense.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {editingExpense && <ChartEdit id={editingExpense} setEditingExpenseId={setEditingExpense} />}
    </div>
  )
}

