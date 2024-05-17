import { useState, useEffect } from "react"
import { useParams, NavLink, useNavigate } from "react-router-dom"

import Modal from '../../components/Modal/Modal'

import * as listingService from '../../services/listingService'

import styles from './ListingDetails.module.css'
import pokeball from '../../assets/images/pokeball.png'

const ListingDetails = (props) => {
  const { listingId } = useParams()
  const [listing, setListing] = useState(null)
  const navigate = useNavigate()

  const [showModal, setShowModal] = useState(false)

  const handleClose = () => {
    setShowModal(false)
  }

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
      {showModal && <Modal photo={listing.photos[0]} handleClose={handleClose} />}
      <div className={styles.listingContainer} key={listing._id}>
        <div className={styles.sellerContainer}>
          <div className={styles.sellerName}>
            <h1>Seller: </h1>
            <img src={pokeball} alt="pokeball" style={{width: '45px', height: '45px'}}/>
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
                onClick={() => setShowModal(true)}
                style={{backgroundImage: `url(${listing.photos[0]})`, cursor: 'pointer'}} alt="Listing Picture" 
              >
              

              </div>
            </div>
          </div>
          </div>
          <div className={styles.titleAndInfo}>
            <div className={styles.title}>
              <h2 className={styles.listingTitle}><span>{listing.title}</span></h2>
            </div>
              <h3 
                className={styles.listingCategory}
                style={listing.category === "Vehicles" ? {backgroundColor: "rgba(255, 148, 148, .8)"} 
                : listing.category === "Apparel" ? {backgroundColor: "rgba(255, 227, 127, .8)"}
                : listing.category === "Electronics" ? {backgroundColor: "rgba(127, 255, 195, .8)"}
                : listing.category === "Entertainment" ? {backgroundColor: "rgba(254, 146, 209, .8)"}
                : listing.category === "Garden & Outdoor" ? {backgroundColor: "rgba(115, 255, 148, .8)"}
                : listing.category === "Home Goods" ? {backgroundColor: "rgba(250, 255, 125, .8)"}
                : listing.category === "Home Improvement" ? {backgroundColor: "rgba(255, 184, 85, .8)"}
                : listing.category === "Music" ? {backgroundColor: "rgba(229, 127, 255, .8)"}
                : listing.category === "Office Supplies" ? {backgroundColor: "rgba(255, 127, 127, .8)"}
                : listing.category === "Pet Supplies" ? {backgroundColor: "rgba(127, 253, 255, .8)"}
                : listing.category === "Sporting Goods" ? {backgroundColor: "rgba(196, 254, 146, .8)"}
                : {backgroundColor: "rgba(146, 173, 254, .8)"}
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
            <div className={styles.nameAndCreateContainer}>
              <p className={styles.reviewCreatedAt}>{`${(new Date(review.createdAt).toLocaleDateString())}`}</p>    
              <h3>{review.rating} <i className="fa-solid fa-star" style={{color: "#fcd259"}}></i></h3>
            </div>
            <div className={styles.ratingContainer}>
              <p className={styles.reviewText}>{review.text}</p>
            </div>
          </div>
        )}
      </div>

    </main>
  )
}

export default ListingDetails