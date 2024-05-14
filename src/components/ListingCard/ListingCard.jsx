import { useNavigate } from 'react-router-dom'

import styles from './ListingCard.module.css'

const ListingCard = ({ listing }) => {
  const navigate = useNavigate()
  
  return (
    <main className={styles.mainContainer}> 
      <div className={styles.listingContainer} key={listing._id}>
        <div className={styles.titleAndCategory}>
          <h2 className={styles.listingCategory}>{listing.category}</h2>
          <h2 className={styles.listingTitle}>{listing.title}</h2>
        </div>
        <div className={styles.listingImage} style={{backgroundImage: `url(${listing.photos[0]})`}} alt="Listing Picture" ></div>
        <h2 className={styles.listingCreatedAt}>{`Created On: ${(new Date(listing.createdAt).toDateString())}`}</h2>
        <div className={styles.bottomContainer}>
          <div className={styles.description}>
            <h2 className={styles.descriptionTitle}>Description:</h2>
            <p className={styles.descriptionText}>{listing.description}</p>
          </div>
          <div className={styles.priceAndViewListingContainer}>
            <div className={styles.priceContainer}>
              <h2 className={styles.priceTitle}>Price:</h2>
              <p className={styles.priceText}>{`$${listing.price}`}</p>
            </div>
            <div className={styles.viewListingContainer}>
              <p className={styles.viewListing} onClick={() => navigate(`/listings/${listing._id}`)}>View Listing</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ListingCard