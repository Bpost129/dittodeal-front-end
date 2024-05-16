import { useState } from "react"

import styles from './NewReview.module.css'

const NewReview = (props) => {
  const [formData, setFormData] = useState({
    text: '',
  })

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.handleAddReview(formData)
    setFormData({ text: '' })
  }

  return (
      <form onSubmit={handleSubmit} className={styles.reviewForm} >
        <textarea 
          className={styles.reviewText}
          required
          name="text"
          value={formData.text}
          placeholder="Add a review"
          onChange={handleChange}
        />
        <div className={styles.ratingContainer}>
        <input 
          className={styles.ratingNumber}
          required
          type="number"
          min="1"
          max="5"
          name="rating"
          value={formData.rating}
          placeholder="1-5"
          onChange={handleChange}
        />
        <h1>⭐</h1>
        </div>
        <button type='submit' className={styles.reviewButton}>POST</button>
      </form>
  )
}

export default NewReview