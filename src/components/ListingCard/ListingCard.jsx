import { useNavigate } from 'react-router-dom'

import styles from './ListingCard.module.css'

const ListingCard = ({ listing }) => {
  const navigate = useNavigate()
  
  return (
    <main className={styles.mainContainer}> 
      <div 
        className={styles.listingContainer} 
        key={listing._id} 
        style={listing.category === "Vehicles" ? {backgroundImage: "url(" + "src/assets/images/vehicles.png" + ")"} 
        : listing.category === "Apparel" ? {backgroundImage: "url(" + "src/assets/images/apparel.png" + ")"}
        : listing.category === "Electronics" ? {backgroundImage: "url(" + "src/assets/images/electronics.png" + ")"}
        : listing.category === "Entertainment" ? {backgroundImage: "url(" + "src/assets/images/entertainment.png" + ")"}
        : listing.category === "Garden & Outdoor" ? {backgroundImage: "url(" + "src/assets/images/garden_and_outdoor.png" + ")"}
        : listing.category === "Home Goods" ? {backgroundImage: "url(" + "src/assets/images/home_goods.png" + ")"}
        : listing.category === "Home Improvement" ? {backgroundImage: "url(" + "src/assets/images/home_improvement.png" + ")"}
        : listing.category === "Music" ? {backgroundImage: "url(" + "src/assets/images/music.png" + ")"}
        : listing.category === "Office Supplies" ? {backgroundImage: "url(" + "src/assets/images/office_supplies.png" + ")"}
        : listing.category === "Pet Supplies" ? {backgroundImage: "url(" + "src/assets/images/pet_supplies.png" + ")"}
        : listing.category === "Sporting Goods" ? {backgroundImage: "url(" + "src/assets/images/sporting_goods.png" + ")"}
        : {backgroundImage: "url(" + "src/assets/images/toys_and_games.png" + ")"}
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