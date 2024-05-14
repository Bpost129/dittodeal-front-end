import { useState, useEffect } from "react"
import { useParams, useNavigate, NavLink } from "react-router-dom"

import * as listingService from '../../services/listingService'

import ListingCard from "../../components/ListingCard/ListingCard"

import styles from './ListingDetails.module.css'

const ListingDetails = (props) => {
  const { listingId } = useParams()
  const [listing, setListing] = useState(null)
  const navigate = useNavigate()

  // const handleEdit = () => {
  //   navigate(`/listings/${listingId}/edit`)
  // }

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
      {listing.author._id === props.user.profile &&
        <>
          <NavLink to={`/listings/${listingId}/edit`} state={listing}>
            EDIT
          </NavLink>
          <button onClick={() => props.handleDeleteListing(listingId)}>DELETE</button>
        </>
      }
    </main>
  )
}

export default ListingDetails