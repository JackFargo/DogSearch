const API_BASE_URL = 'https://frontend-take-home-service.fetch.com';

const fetchWithAuth = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  return response;
};

export const getBreeds = async () => {
  const response = await fetchWithAuth('/dogs/breeds');
  return response.json();
};

export const searchDogs = async (params = {}) => {
  const queryParams = new URLSearchParams();
  
  if (params.breeds) {
    params.breeds.forEach(breed => queryParams.append('breeds', breed));
  }
  if (params.zipCodes) {
    params.zipCodes.forEach(zip => queryParams.append('zipCodes', zip));
  }
  if (params.ageMin) queryParams.append('ageMin', params.ageMin);
  if (params.ageMax) queryParams.append('ageMax', params.ageMax);
  if (params.size) queryParams.append('size', params.size);
  if (params.from) queryParams.append('from', params.from);
  if (params.sort) queryParams.append('sort', params.sort);

  const response = await fetchWithAuth(`/dogs/search?${queryParams.toString()}`);
  return response.json();
};

export const getDogsByIds = async (ids) => {
  const response = await fetchWithAuth('/dogs', {
    method: 'POST',
    body: JSON.stringify(ids),
  });
  return response.json();
};

export const getMatch = async (dogIds) => {
  const response = await fetchWithAuth('/dogs/match', {
    method: 'POST',
    body: JSON.stringify(dogIds),
  });
  return response.json();
};

export const getLocations = async (zipCodes) => {
  const response = await fetchWithAuth('/locations', {
    method: 'POST',
    body: JSON.stringify(zipCodes),
  });
  return response.json();
};

export const searchLocations = async (params = {}) => {
  const response = await fetchWithAuth('/locations/search', {
    method: 'POST',
    body: JSON.stringify(params),
  });
  return response.json();
}; 