import { Link, Outlet } from 'react-router-dom';
import { useExpense } from '../../context/ExpenseProvider';
import { auth } from '../../firebase/firebase';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";

export default function Navbar() {
  const { state, dispatch } = useExpense();
  const navigate = useNavigate()
  const [windowSize, setWindowSize] = useState(window.innerWidth)
  const [isClicked, setIsClicked] = useState(false)
  const mobileSize = 760;

  const currentWindow = windowSize < mobileSize

  useEffect(() => {
    const currentWidth = () => {
      setWindowSize(window.innerWidth)
    }

    window.addEventListener('resize', currentWidth)

    return () => window.removeEventListener('resize', currentWidth)

  }, [windowSize])

  const handleSideMenu = () => {
    setIsClicked(!isClicked)
  }

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch({ type: 'LOGOUT' });
      toast.success('Logout successful', {
        position: 'top-center',
      });
      navigate('/')
    } catch (error) {
      console.error(error);
      toast.error('Logout failed', {
        position: 'top-center',
      });
    }
  };

  const toggleSideBar = () => {
    dispatch({ type: "TOGGLE_SIDEBAR" })
  }

  return (
    <>
      <nav className="fixed w-screen p-4 flex items-center justify-between bg-red-500 rounded-b-2xl z-10">
        <h2 className="text-3xl font-bold text-white">Expense Track App 📈</h2>

        <div className={`${currentWindow ? 'block z-99' : 'hidden'}`} onClick={toggleSideBar}>
          {state.isClicked ? <IoMdClose size={30} /> : <RxHamburgerMenu size={30} />}
        </div>
        <div className={`transition-all duration-300 ease-in-out ${currentWindow ? state.isClicked ? 'absolute flex flex-col gap-4 underline justify-center top-0 right-0 bg-red-400 h-screen w-4/6 p-4' : 'absolute flex flex-col gap-4 underline justify-center h-screen w-4/6 p-4 top-0 right-[-100%]' : 'flex gap-4 items-center'}`}>
          <Link
            onClick={toggleSideBar}
            className="font-bold text-2xl text-white relative transition-all duration-300 hover:scale-110 before:absolute before:bottom-0 before:w-0 before:h-1 before:bg-white before:transition-all before:duration-300 hover:before:w-full active:text-red-300"
            to="/"
          >
            Home
          </Link>
          <Link
            onClick={toggleSideBar}
            className="font-bold text-2xl text-white relative transition-all duration-300 hover:scale-110 before:absolute before:bottom-0 before:w-0 before:h-1 before:bg-white before:transition-all before:duration-300 hover:before:w-full active:text-red-300"
            to="/chart"
          >
            Chart
          </Link>

          {state.isAuthenticated ? (
            <>
              <Link
                onClick={toggleSideBar}
                className="font-bold text-2xl text-white relative transition-all duration-300 hover:scale-110 before:absolute before:bottom-0 before:w-0 before:h-1 before:bg-white before:transition-all before:duration-300 hover:before:w-full active:text-red-300"
                to={'/chart/form'}>
                Dashboard
              </Link>
              <Link
                className="pt-2 pb-2 px-4 bg-red-800 font-bold text-white rounded transition-all duration-300 ease-in-out hover:scale-110"
                onClick={handleSignOut}
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link
                className="pt-2 pb-2 px-4 bg-green-400 font-bold text-white rounded transition-all duration-300 ease-in-out hover:scale-110"
                to="/login"
              >
                Login
              </Link>
              <Link
                className="pt-2 pb-2 px-4 bg-red-400 max-sm:bg-red-800 font-bold text-white rounded transition-all duration-300 ease-in-out hover:scale-110"
                to="/register"
              >
                Register
              </Link>
            </>
          )}
        </div>



      </nav>
      <Outlet />
    </>
  );
}
