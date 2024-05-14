import { useState, useEffect } from "react"
import { useParams, NavLink, useNavigate } from "react-router-dom"

import * as listingService from '../../services/listingService'

import ListingCard from "../../components/ListingCard/ListingCard"

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
      <ListingCard key={listing._id} listing={listing} />
      <p onClick={handleShowProfile} className={styles.name}>{listing.author.name}</p>
      {listing.author._id === props.user.profile &&
        <div className={styles.editButtons}>
          <NavLink to={`/listings/${listingId}/edit`} state={listing} className={styles.edit}>
            EDIT
          </NavLink>
          <button onClick={() => props.handleDeleteListing(listingId)} className={styles.delete}>DELETE</button>
        </div>
      }
    </main>
  )
}

export default ListingDetails