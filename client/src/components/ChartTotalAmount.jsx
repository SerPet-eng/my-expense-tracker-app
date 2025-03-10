export default function ChartTotalAmount({ filteredExpenses }) {
  const monthNow = new Date().getMonth();
  const yearNow = new Date().getFullYear();

  // ✅ Sum of all expenses for the current month
  const currentMonthExpense = filteredExpenses.reduce((acc, expense) => {
    const itemDate = expense?.createdAt?.toDate();

    if (
      itemDate &&
      itemDate.getMonth() === monthNow &&
      itemDate.getFullYear() === yearNow
    ) {
      acc += expense.price; // ✅ Add expense price, NOT the day number
    }

    return acc;
  }, 0);

  // ✅ Total expenses (all-time)
  const totalExpense = filteredExpenses.reduce((acc, expense) => acc + expense.price, 0);

  return (
    <div className="flex flex-col m-4">
      <p className="text-xl font-bold">This Month&apos;s Expenses: $<span className="font-mono">{currentMonthExpense}</span></p>
      <p className="text-lg">Total Expenses &#40;All Time&#41;: $<span className="font-mono">{totalExpense}</span></p>
    </div>
  );
}
