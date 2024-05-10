// npm modules
import { NavLink, useNavigate } from 'react-router-dom'

import styles from './NavBar.module.css'

const NavBar = ({ user, handleLogout }) => {

  const navigate = useNavigate()
  const handleLogIn = () => {
    navigate('/auth/login')
  }
  const handleSignUp =() => {
    navigate('auth/signup')
  }

  return (
    <div className={styles.navContainer}>
      <div className={styles.logoAndAppNameContainer}>
        <img className={styles.logo} src='src/assets/images/dittodeal.png' alt="DittoDeal Logo" width='85'/>
        <p className={styles.appNameDitto}>Ditto</p>
        <p className={styles.appNameDeal}>Deal</p>
      </div>
      <div className={styles.avatarAndUserNameContainer}>
        {!user ?
        <>
          <p className={styles.logIn} onClick={handleLogIn}>Log In</p>
          <p className={styles.signUp} onClick={handleSignUp}>Sign Up</p>
        </>
        :
        <>
          <p className={styles.userName}>{user.name}</p>
          <i onClick={handleLogout} id={styles.logout} className="fa-solid fa-door-open"></i>
          {/* Maybe add inside of the users profile show page if we have one? Or just don't use. <NavLink to="/auth/change-password">Change Password</NavLink> */}
        </>
        }
      </div>
    </div>
  )
}

export default NavBar
