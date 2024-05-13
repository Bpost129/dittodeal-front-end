import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

import * as profileService from '../../services/profileService'

import styles from './ProfilePage.module.css'

const ProfilePage = ({ user }) => {
  const { id } = useParams()
  const [profile, setProfile] = useState({})

  useEffect(() => {
    const fetchProfile = async () => {
      const profileData = await profileService.show(id)
      setProfile(profileData)
    }

    fetchProfile()
  }, [id])

  return (
    <div className={styles.profilePage}>
      <h1 className={styles.profileName}>{profile.name}</h1>
      <img className={styles.avatar} src={profile.photo} alt="users avatar" />
      <h3>{user.email}</h3>
      <div>{profile.favorites}</div>
    </div>
  )
}

export default ProfilePage