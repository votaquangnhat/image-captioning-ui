import axios from 'axios';

// const API_BASE_URL = 'http://localhost:23768'; // Update with your backend URL
const API_BASE_URL = 'https://vtqn-image-captioning-be.fayedark.com'

export const getCaption = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  const response = await axios.post(`${API_BASE_URL}/caption`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};