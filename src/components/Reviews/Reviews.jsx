import ReviewCard from "../ReviewCard/ReviewCard"

import styles from './Reviews.module.css'

const Reviews = (props) => {
  return (
    <div className={styles.reviews}>
      {props.profile.reviews.map((review) =>
        <ReviewCard key={review._id} review={review} user={props.user} id={props.id} handleDeleteReview={props.handleDeleteReview} />
      )}
    </div>
  )
}

export default Reviews