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
        <button type='submit' className={styles.reviewButton}>POST</button>
      </form>
  )
}

export default NewReview