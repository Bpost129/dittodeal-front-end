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
          <h1><i className="fa-solid fa-star" style={{color: "#fcd259"}}></i></h1>
          <input 
            className={styles.ratingNumber}
            required
            type="number"
            min="0"
            max="5"
            name="rating"
            value={formData.rating}
            placeholder="0-5"
            onChange={handleChange}
          />
          <div>
            <button type='submit' className={styles.reviewButton}>POST</button>
          </div>
        </div>
      </form>
  )
}

export default NewReview