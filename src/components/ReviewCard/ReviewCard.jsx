// import { useState } from "react"
// import { useParams } from 'react-router-dom'

import styles from './ReviewCard.module.css'

import { NavLink } from 'react-router-dom'

const ReviewCard = ({ review, user, handleDeleteReview, id }) => {
  // const { id } = useParams()

  return (
    <div className={styles.reviewCard}>
      <div className={styles.authorDiv}>
        <img src={review.author?.photo} alt="users avatar" className={styles.avatar} />
        <div className={styles.infoAndButtonContainer}>
          <div className={styles.nameAndDate}>
            <h3 className={styles.authorName}>{review.author?.name}</h3>
            <p className={styles.reviewCreatedAt}>{`${(new Date(review.createdAt).toDateString())}`}</p>
          </div>
          {review.author?._id === user.profile && 
            <div className={styles.buttonContainer}>
              <NavLink className={styles.editButton} to={`/profiles/${id}/reviews/edit`} state={review}>Edit</NavLink>
              <button onClick={() => handleDeleteReview(id, review._id)} className={styles.deleteButton}>Delete</button>
            </div>
          }
        </div>
      </div>
      <p className={styles.reviewText}>{review.text}</p>
    </div>
  )
}

export default ReviewCard