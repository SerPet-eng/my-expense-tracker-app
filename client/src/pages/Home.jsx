import { useExpense } from "../context/ExpenseProvider"

export default function Home() {
  const { state } = useExpense()

  return (
    <div className="flex flex-col items-center justify-center h-screen max-sm:text-center max-sm:p-4 animate-fadeIn">
      <h1 className="text-4xl font-bold">
        {state.isAuthenticated ?
          (<>Welcome, {state.users.username}</>)
          :
          (<>Welcome, Stranger</>)} 👋</h1>

      <p>This is an expense tracker app, where
        you are able to track your expenses throughout
        week, month and year.</p>

      <p>Feel free to check it out and play around with it.</p>
    </div>
  )
}
