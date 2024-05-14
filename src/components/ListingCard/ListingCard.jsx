import { useNavigate } from 'react-router-dom'

import styles from './ListingCard.module.css'

const ListingCard = ({ listing }) => {
  const navigate = useNavigate()
  
  return (
    <main className={styles.mainContainer}> 
      <div className={styles.listingContainer} key={listing._id}>
        <div className={styles.titleAndDateCreated}>
          <h2 className={styles.listingCategory}>{listing.category}</h2>
          <h2 className={styles.listingTitle}>{listing.title}</h2>
        </div>
        <img className={styles.listingImage} src={listing.photos[0]} alt="Listing Picture" />
        <h2 className={styles.listingCreatedAt}>{listing.createdAt}</h2>
        <div className={styles.description}>
          <h2 className={styles.descriptionTitle}>Description:</h2>
          <p className={styles.descriptionText}>{listing.description}</p>
        </div>
        <div className={styles.price}>
          <h2 className={styles.priceTitle}>Price:</h2>
          <p className={styles.priceText}>{listing.price}</p>
        </div>
        <p className={styles.viewListing} onClick={() => navigate(`/listings/${listing._id}`)}>View Listing</p>
      </div>
    </main>
  )
}

export default ListingCard