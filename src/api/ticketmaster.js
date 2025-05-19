// src/api/ticketmaster.js
const BASE = '/tm'

// Helper for fetch and error handling
async function fetchJSON(url) {
  const res = await fetch(url)
  if (res.status === 429) throw new Error('Too Many Requests')
  if (!res.ok) throw new Error(`Ticketmaster error: ${res.status}`)
  return res.json()
}

// Search events
export async function searchEvents(params = {}) {
  const q = new URLSearchParams({ apikey: import.meta.env.VITE_TM_API_KEY, ...params })
  const url = `${BASE}/events.json?${q}`
  const data = await fetchJSON(url)
  return data._embedded?.events || []
}

// Fetch single event by ID
export async function fetchEventById(id) {
  const url = `${BASE}/events/${id}.json?apikey=${import.meta.env.VITE_TM_API_KEY}`
  return fetchJSON(url)
}

// Search attractions (artists) by classification or keyword
export async function searchAttractions(params = {}) {
  const q = new URLSearchParams({ apikey: import.meta.env.VITE_TM_API_KEY, ...params })
  const url = `${BASE}/attractions.json?${q}`
  const data = await fetchJSON(url)
  return data._embedded?.attractions || []
}

// Search venues (locations)
export async function searchVenues(params = {}) {
  const q = new URLSearchParams({ apikey: import.meta.env.VITE_TM_API_KEY, ...params })
  const url = `${BASE}/venues.json?${q}`
  const data = await fetchJSON(url)
  return data._embedded?.venues || []
}
