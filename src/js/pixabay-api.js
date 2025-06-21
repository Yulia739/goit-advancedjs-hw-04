/**
 * Pixabay API integration module
 * Handles image search requests and response processing
 */

import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// API Configuration
const API_CONFIG = {
  BASE_URL: 'https://pixabay.com/api/',
  API_KEY: '38590711-cd4e1138b2603dfebaf6d7de9',
  DEFAULT_PARAMS: {
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15, // Зменшуємо до 15 елементів за запит
  },
};

// Toast configuration for API errors
const TOAST_CONFIG = {
  closeOnClick: true,
  position: 'topRight',
  displayMode: 0,
  progressBar: false,
};

/**
 * Fetches images from Pixabay API based on search query and page number
 * @param {string} inputValue - The search query
 * @param {number} page - The page number for pagination (default: 1)
 * @returns {Promise<Object>} The API response data
 * @throws {Error} If the input is empty or API request fails
 */
export async function pixabayApi(inputValue, page = 1) {
  // Validate input
  if (!inputValue?.trim()) {
    throw new Error('Please enter a search query');
  }

  // Prepare search parameters
  const searchParams = {
    ...API_CONFIG.DEFAULT_PARAMS,
    q: inputValue.trim().toLowerCase(),
    page: page,
  };

  try {
    const response = await axios.get(API_CONFIG.BASE_URL, {
      params: {
        key: API_CONFIG.API_KEY,
        ...searchParams,
      },
    });

    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Failed to fetch images. Please try again.';
    iziToast.error({
      ...TOAST_CONFIG,
      message: errorMessage,
    });
    throw new Error(errorMessage);
  }
}