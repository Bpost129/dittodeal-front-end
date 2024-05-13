import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

import * as profileService from '../../services/profileService'

import styles from './ProfilePage.module.css'

const ProfilePage = ({ user }) => {
  const { id } = useParams()
  const [profile, setProfile] = useState(null)
  console.log(profile)

  useEffect(() => {
    const fetchProfile = async () => {
      const profileData = await profileService.getProfile(id)
      setProfile(profileData)
    }

    fetchProfile()
  }, [id])

  if (!profile) {
    return (
      <h1>Loading...</h1>
    )
  }

  return (
    <div className={styles.profilePage}>
      <h1 className={styles.profileName}>{profile.name}</h1>
      <img className={styles.avatar} src={profile.photo} alt="users avatar" />
      <h3>{user.email}</h3>
      <ul>
        {profile.reviews.map((fav) =>
          <li key={fav._id}>{fav.text}</li>
        )}
      </ul>

      <ul>
        {profile.favorites.map((fav) => 
          <li key={fav._id}>{fav.name}</li>
        )}
      </ul>
    </div>
  )
}

export default ProfilePage