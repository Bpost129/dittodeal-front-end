import { useState, useEffect } from "react"
import { useParams, NavLink, useNavigate } from "react-router-dom"

import * as listingService from '../../services/listingService'

import styles from './ListingDetails.module.css'

const ListingDetails = (props) => {
  const { listingId } = useParams()
  const [listing, setListing] = useState(null)
  const navigate = useNavigate()

  const handleShowProfile = () => {
    navigate(`/profiles/${listing.author._id}`)
  }

  useEffect(() => {
    const fetchListing = async () => {
      const listingData = await listingService.show(listingId)
      setListing(listingData)
    }

    fetchListing()
  }, [listingId])

  if (!listing) {
    return (
      <h1>Loading...</h1>
    )
  }

  return (
    <main className={styles.mainContainer}>
      <div className={styles.listingContainer} key={listing._id}>
        <div className={styles.sellerContainer}>
          <div className={styles.sellerName}>
            <h2>Seller: </h2>
            <p onClick={handleShowProfile} className={styles.name}>{listing.author.name}</p>
          </div>
          <div className={styles.sellerButtons}>
            {listing.author._id === props.user.profile &&
            <div className={styles.editButtons}>
              <NavLink to={`/listings/${listingId}/edit`} state={listing} className={styles.edit}>
                EDIT
              </NavLink>
              <button onClick={() => props.handleDeleteListing(listingId)} className={styles.delete}>DELETE</button>
            </div>
            }
          </div>
        </div>

        <div className={styles.headingContainer}>

          <div className={styles.images}>
            <div className={styles.listingImage}><div className={styles.listingImageBg}><img src={listing.photos[0]} alt="listing photo" style={{width: '250px', height: '300px', backgroundColor: 'white'}} /></div></div>
          </div>

          <div className={styles.titleAndInfo}>
            <div className={styles.title}>
              <h2 className={styles.listingTitle}><span>{listing.title}</span></h2>
            </div>
              
            <h3 className={styles.listingCategory}>{listing.category}</h3>

            <div className={styles.info}>
              <div className={styles.priceContainer}>
                <h2 className={styles.priceTitle}>Price:</h2>
                <h2 className={styles.priceText}>{`$${listing.price}`}</h2>
              </div>
              <div className={styles.createdContainer}>
                <h2 className={styles.createdTitle}>Created:</h2>
                <h3 className={styles.listingCreatedAt}>{`${(new Date(listing.createdAt).toLocaleDateString())}`}</h3>
              </div>
            </div>
          </div>

        </div>

        <p className={styles.descriptionText}>{listing.description}</p>
      
      </div>
      
      <h2>Seller Reviews:</h2>
      <div className={styles.allReviews}>
        {listing.author.reviews.map(review =>
          <div key={review._id} className={styles.reviewCard}>
            <p className={styles.reviewCreatedAt}>{`${(new Date(review.createdAt).toDateString())}`}</p>    
            <p className={styles.reviewText}>{review.text}</p>
          </div>
        )}
      </div>

    </main>
  )
}

export default ListingDetails