const API_BASE_URL = "https://frontend-take-home-service.fetch.com"

export const searchDogs = async (params) => {
    const queryParams = new URLSearchParams();
    if (params.breeds) queryParams.append('breeds', params.breeds);
    if (params.sort) queryParams.append('sort', params.sort);
    if (params.size) queryParams.append('size', params.size);
    if (params.from) queryParams.append('from', params.from);
    
  
    const response = await fetch(`${API_BASE_URL}/dogs/search?${queryParams}`, {
      credentials: 'include',
    });
  
    if (!response.ok) throw new Error('Failed to search dogs');
    return response.json();
  };
  
  export const getBreeds = async () => {
    const response = await fetch(`${API_BASE_URL}/dogs/breeds`, {
      credentials: 'include',
    });
  
    if (!response.ok) throw new Error('Failed to fetch breeds');
    return response.json();
  };
  
  export const getDogs = async (dogIds) => {
    const response = await fetch(`${API_BASE_URL}/dogs`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dogIds),
    });
  
    if (!response.ok) throw new Error('Failed to fetch dogs');
    return response.json();
  };
  
  export const matchDog = async (dogIds) => {
    const response = await fetch(`${API_BASE_URL}/dogs/match`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dogIds),
    });
  
    if (!response.ok) throw new Error('Failed to get match');
    return response.json();
  };