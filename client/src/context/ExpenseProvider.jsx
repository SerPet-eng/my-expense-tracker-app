import { db, auth } from "../firebase/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { getDoc, doc, collection, getDocs, query, where } from "firebase/firestore"
import { createContext, useContext, useReducer, useEffect, use } from "react"
import { initialState, reducers } from "./ExpenseReducer"
import { toast } from "react-toastify"

const ExpenseContext = createContext()

export function useExpense() {
  return useContext(ExpenseContext)
}

export default function ExpenseProvider({ children }) {
  const [state, dispatch] = useReducer(reducers, initialState)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        fetchUserData(user.uid)
        fetchExpensesData()
      }
    })

    return () => unsubscribe() // Cleanup the listener
  }, [])

  const fetchUserData = async (uid) => {
    try {
      const userRef = doc(db, 'users', uid)
      const userSnap = await getDoc(userRef)

      if (userSnap.exists()) {
        dispatch({ type: 'LOGIN', payload: userSnap.data() })
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
      toast.error('Something went wrong', { position: 'top-center' })
    }
  }

  const fetchExpensesData = async () => {
    try {
      const q = query(collection(db, 'expenses'), where('userId', '==', auth.currentUser.uid))
      const querySnapshot = await getDocs(q)

      const expenses = querySnapshot.docs.map((doc) => ({
        id: doc.id, // Add the document ID
        ...doc.data(), // Include the document data
      }))

      dispatch({ type: 'FETCH_USER_EXPENSES', payload: expenses })
    } catch (error) {
      console.error('Error fetching user data:', error)
      toast.error('Something went wrong', { position: 'top-center' })
    }
  }


  return (
    <ExpenseContext.Provider value={{ state, dispatch }}>
      {children}
    </ExpenseContext.Provider>
  )
}
