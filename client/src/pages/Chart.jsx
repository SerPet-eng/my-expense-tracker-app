import { Link } from "react-router-dom";
import { useExpense } from "../context/ExpenseProvider";
import { useState } from "react";
import ChartGraph from "../components/ChartGraph";
import ChartTotaltAmount from "../components/ChartTotalAmount";

export default function Chart() {
  const { state } = useExpense();
  const [selectedDate, setSelectedDate] = useState(""); // 🔹 Store selected date filter
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // 🔹 Get the date range based on the selection
  const getDateRange = () => {
    const today = new Date();
    let pastDate;

    if (selectedDate === "last_week") {
      pastDate = new Date();
      pastDate.setDate(today.getDate() - 7);
    } else if (selectedDate === "last_month") {
      pastDate = new Date();
      pastDate.setMonth(today.getMonth() - 1);
    } else if (selectedDate === "last_year") {
      pastDate = new Date();
      pastDate.setFullYear(today.getFullYear() - 1);
    }

    return pastDate ? pastDate.getTime() : null;
  };

  // 🔹 Filter expenses based on search, category, and date
  const filteredExpenses = state.expenses.filter((expense) => {
    const matchesSearch = searchQuery
      ? expense.item.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesCategory = selectedCategory
      ? expense.category === selectedCategory
      : true;

    const matchesDate =
      selectedDate && getDateRange()
        ? expense.createdAt.toDate().getTime() >= getDateRange()
        : true;

    return matchesSearch && matchesCategory && matchesDate;
  });

  return (
    <div className="pt-20 flex flex-col items-center max-sm:pt-40 max-sm:pr-4 max-sm:pl-4">
      {!state.isAuthenticated ? (
        <p className="flex items-center justify-center h-screen font-bold text-2xl">You must logged in first</p>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">Chart</h2>

          {/* 🔹 Search and Filters */}
          <form className="mt-4 flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search items..."
              className="p-2 border rounded w-full md:w-auto"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <select
              name="category"
              className="p-2 border rounded"
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

            <select
              name="date"
              className="p-2 border rounded"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            >
              <option value="">All Time</option>
              <option value="last_week">Last Week</option>
              <option value="last_month">Last Month</option>
              <option value="last_year">Last Year</option>
            </select>
          </form>

          {/* 🔹 Scrollable Expenses Table */}
          <div className="mt-6 w-full max-w-4xl overflow-hidden border-2 border-black rounded-lg">
            <div className="overflow-y-auto max-h-[400px]">
              <table className="w-full border-collapse">
                <thead className="sticky top-0 bg-red-500 text-white border">
                  <tr>
                    <th className="p-3 border border-black">Item</th>
                    <th className="p-3 border border-black">Category</th>
                    <th className="p-3 border border-black">Price</th>
                    <th className="p-3 border border-black">Date</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {filteredExpenses.length > 0 ? (
                    filteredExpenses.map((expense) => (
                      <>
                        <tr key={expense.id} className="border hover:bg-gray-50">
                          <td className="p-3 border">{expense.item}</td>
                          <td className="p-3 border">{expense.category}</td>
                          <td className="p-3 border font-mono">$ {expense.price}</td>
                          <td className="p-3 border">
                            {expense?.createdAt?.toDate().toLocaleDateString()}
                          </td>
                        </tr>
                      </>

                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="p-4 text-gray-500">
                        No expenses found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <ChartTotaltAmount filteredExpenses={filteredExpenses} />
          <ChartGraph filteredExpenses={filteredExpenses} />
        </>
      )
      }


    </div >
  );
}
