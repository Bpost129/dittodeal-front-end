// services 
import * as tokenService from './tokenService'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/listings`

async function create(listingFormData) {
  try {
    const res = await fetch(BASE_URL, {
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

async function index() {
  try {
    const res = await fetch(BASE_URL, {
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

async function show(listingId) {
  try {
    const res = await fetch(`${BASE_URL}/${listingId}`, {
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
      },
    })
    return res.json()
  } catch (err) {
    console.log(err)
  }
}

async function update(listingFormData) {
  try {
    const res = await fetch(`${BASE_URL}/${listingFormData._id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(listingFormData)
    })
    return res.json()
  } catch (err) {
    console.log(err)
  }
}

async function deleteListing(listingId) {
  try {
    const res = await fetch(`${BASE_URL}/${listingId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
      }
    })
    return res.json()
  } catch (err) {
    console.log(err)
  }
}

export {
  create,
  index,
  show,
  update,
  deleteListing as delete,
}