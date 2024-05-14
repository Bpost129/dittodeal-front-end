import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import ReviewCard from "../../components/ReviewCard/ReviewCard"

import * as profileService from '../../services/profileService'

import styles from './ProfilePage.module.css'

const ProfilePage = ({ user }) => {
  const { id } = useParams()
  const [profile, setProfile] = useState(null)
  const [formData, setFormData] = useState({
    text: '',
  })
  // console.log(id)

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }
  
  const handleAddReview = async (reviewFormData) => {
    const newReview = await profileService.createReview(id, reviewFormData)
    setProfile({...profile, reviews: [...profile.reviews, newReview]}) 
  }

  const handleDeleteReview = async (profileId, reviewId) => {
    console.log(id)
    await profileService.deleteReview(profileId, reviewId)
    setProfile({...profile, reviews: profile.reviews.filter(rev => rev._id !== reviewId)})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleAddReview(formData)
    setFormData({ text: '' })
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
      <h3>{user.email}</h3>
      <form onSubmit={handleSubmit} className={styles.reviewForm} >
        <textarea 
          className={styles.reviewText}
          required
          name="text"
          value={formData.text}
          placeholder="Add a review"
          onChange={handleChange}
        />
        <button type='submit' className={styles.reviewButton}>POST</button>
      </form>
      <div className={styles.userInfo}>
        <ul>
          {profile.reviews.map((review) =>
            <ReviewCard key={review._id} review={review} handleDeleteReview={handleDeleteReview} user={user} />
          )}
        </ul>
        {/* <ul>
          {profile.favorites.map((fav) => 
            <li key={fav._id}>{fav.name}</li>
          )}
        </ul> */}
      </div>
    </div>
  )
}

export default ProfilePage