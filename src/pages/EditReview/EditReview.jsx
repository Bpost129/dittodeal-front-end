import { useState } from "react"
import { useLocation,useParams,useNavigate } from "react-router-dom"

import styles from './EditReview.module.css'

import * as profileService from '../../services/profileService'

const EditReview = () => {

  const navigate = useNavigate()
  const { state } = useLocation()
  const { id } = useParams()

  const [formData, setFormData] = useState(state)

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    profileService.updateReview(id, formData)
    navigate(`/profiles/${id}`)
  }

  return (
      <div className={styles.mainContainer}>
        <div className={styles.editReviewContainer}>
          <h1 className={styles.editReview}>Edit Review</h1>
          <form onSubmit={handleSubmit} className={styles.reviewForm} >
            <textarea 
              className={styles.reviewText}
              required
              name="text"
              value={formData.text}
              placeholder="Add a review"
              onChange={handleChange}
            />
            <button type='submit' className={styles.reviewButton}>EDIT</button>
          </form>
        </div>
      </div>
  )
}

export default EditReview