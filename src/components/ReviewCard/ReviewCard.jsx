// import { useState } from "react"
import { useNavigate } from 'react-router-dom'

import styles from './ReviewCard.module.css'

import { NavLink } from 'react-router-dom'


const ReviewCard = ({ review, user, handleDeleteReview, id }) => {
  // const { id } = useParams()
  const navigate = useNavigate()

  return (
    <div className={styles.reviewCard}>
      <div className={styles.authorDiv}>
        <img src={review.author?.photo} alt="users avatar" className={styles.avatar} />
        <div className={styles.infoAndButtonContainer}>
          <div className={styles.nameAndDate}>
            <h3 className={styles.authorName} onClick={() => navigate(`/profiles/${review.author._id}`)}>{review.author?.name}</h3>
            <p className={styles.reviewCreatedAt}>{`${(new Date(review.createdAt).toDateString())}`}</p>
          </div>
          <div className={styles.ratingContainer}>
            <h1>{review.rating} <i className="fa-solid fa-star" style={{color: "#fcd259"}}></i></h1>
          {review.author?._id === user.profile && 
            <div className={styles.buttonContainer}>
              <NavLink className={styles.editButton} to={`/profiles/${id}/reviews/edit`} state={review}>Edit</NavLink>
              <button onClick={() => handleDeleteReview(id, review._id)} className={styles.deleteButton}>Delete</button>
            </div>
          }
          </div>
        </div>
      </div>
      <p className={styles.reviewText}>{review.text}</p>
    </div>
  )
}

export default ReviewCard