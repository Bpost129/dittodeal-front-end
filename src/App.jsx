// npm modules
import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// pages
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import AllListings from './pages/AllListings/AllListings'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import NewListing from './pages/NewListing/NewListing'
import ListingDetails from './pages/ListingDetails/ListingDetails'
import EditListing from './pages/EditListing/EditListing'

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
    navigate('/listings')
  }

  const handleUpdateListing = async (listingFormData) => {
    const updatedListing = await listingService.update(listingFormData)
    setListings((li) => updatedListing._id === li._id ? updatedListing : li)
    navigate('/listings')
  }
  
  const handleDeleteListing = async (listingId) => {
    const deletedListing = await listingService.delete(listingId)
    setListings(listings.filter(li => li._id !== deletedListing._id))
    navigate('/listings')
  }

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path='/' element={<Landing />} />
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
          path='/profiles/:id' element={
            <ProtectedRoute user={user}>
              <ProfilePage user={user} />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/listings" 
          element={<AllListings user={user} />} 
        />
        <Route 
          path='/listings/new' element={
            <ProtectedRoute user={user}>
              <NewListing handleAddListing={handleAddListing} />
            </ProtectedRoute>
          }
        />
        <Route 
          path='listings/:listingId'
          element={<ListingDetails user={user} handleDeleteListing={handleDeleteListing} />}
        />
        <Route 
          path="/listings/:listingId/edit" element={
            <ProtectedRoute user={user}>
              <EditListing handleUpdateListing={handleUpdateListing} />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </>
  )
}

export default App
