import { useNavigate } from 'react-router-dom'

import styles from './ListingCard.module.css'

import vehicles from '../../assets/images/vehicles.png'
import apparel from '../../assets/images/apparel.png'
import electronics from '../../assets/images/electronics.png'
import entertainment from '../../assets/images/entertainment.png'
import garden_and_outdoor from '../../assets/images/garden_and_outdoor.png'
import home_goods from '../../assets/images/home_goods.png'
import home_improvement from '../../assets/images/home_improvement.png'
import music from '../../assets/images/music.png'
import office_supplies from '../../assets/images/office_supplies.png'
import pet_supplies from '../../assets/images/pet_supplies.png'
import sporting_goods from '../../assets/images/sporting_goods.png'
import toys_and_games from '../../assets/images/toys_and_games.png'

const ListingCard = ({ listing }) => {
  const navigate = useNavigate()
  
  return (
    <main className={styles.mainContainer}> 
      <div 
        className={styles.listingContainer} 
        key={listing._id} 
        style={listing.category === "Vehicles" ? {backgroundImage: `url(${vehicles})`} 
        : listing.category === "Apparel" ? {backgroundImage: `url(${apparel})`} 
        : listing.category === "Electronics" ? {backgroundImage: `url(${electronics})`} 
        : listing.category === "Entertainment" ? {backgroundImage: `url(${entertainment})`} 
        : listing.category === "Garden & Outdoor" ? {backgroundImage: `url(${garden_and_outdoor})`} 
        : listing.category === "Home Goods" ? {backgroundImage: `url(${home_goods})`} 
        : listing.category === "Home Improvement" ? {backgroundImage: `url(${home_improvement})`} 
        : listing.category === "Music" ? {backgroundImage: `url(${music})`} 
        : listing.category === "Office Supplies" ? {backgroundImage: `url(${office_supplies})`} 
        : listing.category === "Pet Supplies" ? {backgroundImage: `url(${pet_supplies})`} 
        : listing.category === "Sporting Goods" ? {backgroundImage: `url(${sporting_goods})`} 
        : {backgroundImage: `url(${toys_and_games})`} 
      }>
        <div className={styles.titleAndCategory}>
          <h2 className={styles.listingCategory}>{listing.category}</h2>
          <h2 className={styles.listingTitle}><span>{listing.title}</span></h2>
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