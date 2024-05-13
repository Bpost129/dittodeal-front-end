// npm modules
import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// pages
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import NewListing from './pages/NewListing/NewListing'

// components
import NavBar from './components/NavBar/NavBar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

// services
import * as authService from './services/authService'
import * as listingService from './services/listingService'

// styles
import './App.css'

function App() {
  const [user, setUser] = useState(authService.getUser())
  const [listings, setListings] = useState([])
  const navigate = useNavigate()

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleAuthEvt = () => {
    setUser(authService.getUser())
  }

  const handleAddListing = async listingFormData => {
    const newListing = await listingService.create(listingFormData)
    setListings([newListing, ...listings])
    navigate('/')
  }

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing user={user} />} />
        <Route
          path="/auth/signup"
          element={<Signup handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/auth/login"
          element={<Login handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/auth/change-password"
          element={
            <ProtectedRoute user={user}>
              <ChangePassword handleAuthEvt={handleAuthEvt} />
            </ProtectedRoute>
          }
        />
        <Route 
          path='/listings/new' element={
            <ProtectedRoute user={user}>
              <NewListing handleAddListing={handleAddListing} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
