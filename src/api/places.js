// src/api/places.js

import axios from 'axios';

// Always hit the real endpoint directly:
const API_BASE = 'https://izzuanzawawi.com/pengembara';

/**
 * Fetch all places (when query is empty) or search by q.
 * Returns an array of { id, name, description, image, location, lat, lng }.
 */
export async function searchPlaces(query = '') {
  // Build the correct URL
  let url = `${API_BASE}/destinations.php`;
  if (query.trim()) {
    const q = encodeURIComponent(query.trim());
    url = `${API_BASE}/search.php?q=${q}`;
  }

  console.log('[places.js] fetching URL:', url);

  try {
    const response = await axios.get(url);
    console.log('[places.js] response.data (count):', response.data.length);
    return response.data;
  } catch (err) {
    console.error('[places.js] fetch error:', err);
    return [];
  }
}
