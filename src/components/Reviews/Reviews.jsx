import ReviewCard from "../ReviewCard/ReviewCard"

import styles from './Reviews.module.css'

const Reviews = (props) => {
  if (!props.profile.reviews.length) return <h4>No Reviews</h4>

  return (
    <div className={styles.reviews}>
      {props.profile.reviews.map((review) =>
        <ReviewCard key={review._id} review={review} user={props.user} id={props.id} handleDeleteReview={props.handleDeleteReview} />
      )}
    </div>
  )
}

export default Reviews