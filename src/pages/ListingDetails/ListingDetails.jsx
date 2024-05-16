import { useState, useEffect } from "react"
import { useParams, NavLink, useNavigate } from "react-router-dom"

import * as listingService from '../../services/listingService'

import styles from './ListingDetails.module.css'
// import pokeball from '../../assets/images/pokeball.png'

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
            <h1>Seller: </h1>
            <h1 onClick={handleShowProfile} className={styles.name}>{listing.author.name}</h1>
          </div>
          <div className={styles.sellerButtons}>
            {(listing.author._id === props.user.profile || props.user.accountLevel === 2) &&
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

          <div className={styles.listingImageBigBg}>
            <div className={styles.listingImageBg}>
              <div 
                className={styles.listingImage} 
                style={{backgroundImage: `url(${listing.photos[0]})`}} alt="Listing Picture" 
              >
              </div>
            </div>
          </div>


            {/* <div className={styles.listingImage}><div className={styles.listingImageBg}><img src={listing.photos[0]} alt="listing photo" style={{width: '250px', height: '300px', backgroundColor: 'white'}} /></div></div> */}
          
          </div>

          <div className={styles.titleAndInfo}>
            <div className={styles.title}>
              <h2 className={styles.listingTitle}><span>{listing.title}</span></h2>
            </div>
              <h3 
                className={styles.listingCategory}
                style={listing.category === "Vehicles" ? {backgroundColor: "rgba(255, 148, 148, .6)"} 
                : listing.category === "Apparel" ? {backgroundColor: "rgba(255, 227, 127, .6)"}
                : listing.category === "Electronics" ? {backgroundColor: "rgba(127, 255, 195, .6)"}
                : listing.category === "Entertainment" ? {backgroundColor: "rgba(254, 146, 209, .6)"}
                : listing.category === "Garden & Outdoor" ? {backgroundColor: "rgba(115, 255, 148, .6)"}
                : listing.category === "Home Goods" ? {backgroundColor: "rgba(250, 255, 125, .6)"}
                : listing.category === "Home Improvement" ? {backgroundColor: "rgba(255, 184, 85, .6)"}
                : listing.category === "Music" ? {backgroundColor: "rgba(229, 127, 255, .6)"}
                : listing.category === "Office Supplies" ? {backgroundColor: "rgba(255, 127, 127, .6)"}
                : listing.category === "Pet Supplies" ? {backgroundColor: "rgba(127, 253, 255, .6)"}
                : listing.category === "Sporting Goods" ? {backgroundColor: "rgba(196, 254, 146, .6)"}
                : {backgroundColor: "rgba(146, 173, 254, .6)"}
              }>
                {listing.category}
              </h3>

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

        <div className={styles.description}>
          <p className={styles.descriptionText}>{listing.description}</p>
        </div>
      
      </div>
      
      <h2>Seller Reviews:</h2>
      <div className={styles.allReviews}>
        {listing.author.reviews.map(review =>
          <div key={review._id} className={styles.reviewCard}>
            <p className={styles.reviewCreatedAt}>{`${(new Date(review.createdAt).toLocaleDateString())}`}</p>    
            <p className={styles.reviewText}>{review.text}</p>
          </div>
        )}
      </div>

    </main>
  )
}

export default ListingDetails