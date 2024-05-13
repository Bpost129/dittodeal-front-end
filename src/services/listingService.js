// services 
import * as tokenService from './tokenService'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api`

async function create(listingFormData) {
  try {
    const res = await fetch(`${BASE_URL}/listings`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(listingFormData)
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

async function getListings() {
  try {
    const res = await fetch(`${BASE_URL}/listings`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export {
  create,
  getListings,
}