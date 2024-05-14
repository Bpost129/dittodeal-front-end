import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import NewReview from "../../components/NewReview/NewReview"
// import ReviewCard from "../../components/ReviewCard/ReviewCard"
import Reviews from "../../components/Reviews/Reviews"

import * as profileService from '../../services/profileService'

import styles from './ProfilePage.module.css'

const ProfilePage = ({ user }) => {
  const { id } = useParams()
  const [profile, setProfile] = useState(null)

  const handleAddReview = async (reviewFormData) => {
    const newReview = await profileService.createReview(id, reviewFormData)
    setProfile({...profile, reviews: [...profile.reviews, newReview]}) 
  }

  const handleDeleteReview = async (profileId, reviewId) => {
    console.log(id)
    await profileService.deleteReview(profileId, reviewId)
    setProfile({...profile, reviews: profile.reviews.filter(rev => rev._id !== reviewId)})
  }

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
      <NewReview handleAddReview={handleAddReview} />
      <div className={styles.reviews}>
        <Reviews profile={profile} user={user} id={id} handleDeleteReview={handleDeleteReview} />
      </div>
    </div>
  )
}

export default ProfilePage