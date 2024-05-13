// npm modules
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import styles from './NavBar.module.css'

import * as profileService from '../../services/profileService'

const NavBar = ({ user, handleLogout }) => {
  const [profile, setProfile] = useState({})
  const navigate = useNavigate()
  const handleLogIn = () => {
    navigate('/auth/login')
  }
  const handleSignUp = () => {
    navigate('auth/signup')
  }
  const handleBackToAllListings = () => {
    navigate('/')
  }
  const handleCreateListing = () => {
    navigate('/listings/new')
  }
  const handleUserProfile = () => {
    navigate(`/profiles/${user.profile}`)
  }
  useEffect(() => {
    const handleGetProfile = async () => {
      const profileData = await profileService.getProfile(user.profile)
      setProfile(profileData)
    }
    handleGetProfile()
  }, [user])

  return (
    <div className={styles.navContainer}>
      <div onClick={handleBackToAllListings} className={styles.logoAndAppNameContainer}>
        <img className={styles.logo} src='src/assets/images/dittodeal.png' alt="DittoDeal Logo" width='85'/>
        <p className={styles.appNameDitto}>Ditto</p>
        <p className={styles.appNameDeal}>Deal</p>
      </div>
      <div className={styles.otherLinksContainer}>
        {user ?
          <p className={styles.createListing} onClick={handleCreateListing}>Create Listing</p>
          :
          ''
        }
      </div>
      <div className={styles.avatarAndUserNameContainer}>
        {!user ?
        <>
          <p className={styles.logIn} onClick={handleLogIn}>Log In</p>
          <p className={styles.signUp} onClick={handleSignUp}>Sign Up</p>
        </>
        :
        <>
          <p className={styles.userName}  onClick={handleUserProfile}>{user.name}</p>
          <img className={styles.avatar} src={profile.photo} alt="Users Profile Picture" />
          <i onClick={handleLogout} id={styles.logout} className="fa-solid fa-door-open"></i>
        </>
        }
      </div>
    </div>
  )
}

export default NavBar
