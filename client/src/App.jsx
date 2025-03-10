import { Routes, Route } from "react-router-dom"
import Navbar from "./components/navigation/Navbar.jsx"

import Home from "./pages/Home.jsx"
import { lazy, Suspense } from "react"

const Chart = lazy(() => import("./pages/Chart.jsx"))
const ChartForm = lazy(() => import("./components/ChartForm.jsx"))
const Login = lazy(() => import("./pages/auth/Login.jsx"))
const Register = lazy(() => import("./pages/auth/Register.jsx"))

import Loading from "./components/handler/Loading.jsx"
import NotFound from './components/handler/NotFound.jsx'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function App() {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chart" element={<Chart />} />
          <Route path="/chart/form" element={<ChartForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
      </Suspense>
    </div>
  )
}
