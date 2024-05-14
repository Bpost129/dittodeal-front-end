// css
import { useState, useEffect } from 'react'

import ListingCard from '../../components/ListingCard/ListingCard'

import * as listingService from '../../services/listingService'

import styles from './AllListings.module.css'

const Index = ({ user }) => {
  const [listings, setListings] = useState([])

  useEffect(() => {
    const handleGetListings = async () => {
      const listingsData = await listingService.index()
      setListings(listingsData)
    }
    handleGetListings()
  }, [])

  return (
    <main className={styles.mainContainer}>
      {listings.map(listing => 
        <ListingCard key={listing._id} listing={listing} />
      )}
    </main>
  )
}

export default Index
