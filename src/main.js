/**
 * Main application file for the image search gallery
 * Handles form submission, image loading, pagination, and gallery initialization
 */

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { pixabayApi } from './js/pixabay-api.js';
import { renderFunction, smoothScroll } from './js/render-functions.js';

// DOM Elements
const DOM = {
  form: document.querySelector('form'),
  gallery: document.querySelector('.gallery'),
  input: document.querySelector('input[type="text"]'),
  loader: document.querySelector('.loader'),
  loadMoreBtn: document.querySelector('.load-more-btn'),
  loadMoreContainer: document.querySelector('.load-more-container'),
};

// Lightbox configuration
const LIGHTBOX_CONFIG = {
  captions: true,
  captionsData: 'alt',
  captionSelector: 'img',
  captionPosition: 'outside',
  captionDelay: 250,
  overlayOpacity: 0.8,
  styles: '../css/styles.css',
};

// Toast configuration
const TOAST_CONFIG = {
  closeOnClick: true,
  position: 'topRight',
  displayMode: 0,
  progressBar: false,
  backgroundColor: '#EF4040',
  messageColor: 'white',
  iconColor: 'white',
  maxWidth: '432px',
};

// Application state
const state = {
  currentPage: 1,
  currentQuery: '',
  totalHits: 0,
  lightbox: null,
};

/**
 * Shows or hides the loader
 * @param {boolean} show - Whether to show the loader
 */
function toggleLoader(show) {
  if (show) {
    DOM.loader.classList.add('visible');
  } else {
    DOM.loader.classList.remove('visible');
  }
}

/**
 * Shows or hides the load more button
 * @param {boolean} show - Whether to show the button
 */
function toggleLoadMoreButton(show) {
  DOM.loadMoreBtn.style.display = show ? 'block' : 'none';
}

/**
 * Shows end of collection message
 */
function showEndMessage() {
  iziToast.info({
    ...TOAST_CONFIG,
    backgroundColor: '#4CAF50',
    message: "We're sorry, but you've reached the end of search results.",
  });
}

/**
 * Handles the load more button click
 */
const handleLoadMore = async () => {
  if (!state.currentQuery) return;

  state.currentPage += 1;
  toggleLoadMoreButton(false);
  toggleLoader(true);

  try {
    const response = await pixabayApi(state.currentQuery, state.currentPage);

    if (response.hits.length === 0) {
      showEndMessage();
      return;
    }

    // Add new images to gallery
    const newMarkup = renderFunction(response.hits);
    DOM.gallery.insertAdjacentHTML('beforeend', newMarkup);

    // Refresh lightbox
    if (state.lightbox) {
      state.lightbox.refresh();
    }

    // Smooth scroll
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length > 0) {
      const cardHeight = galleryItems[0].getBoundingClientRect().height;
      smoothScroll(cardHeight);
    }

    // Check if we've reached the end
    const totalLoaded = state.currentPage * 15; // 15 items per page
    if (totalLoaded >= response.totalHits) {
      toggleLoadMoreButton(false);
      showEndMessage();
    } else {
      toggleLoadMoreButton(true);
    }
  } catch (error) {
    iziToast.error({
      ...TOAST_CONFIG,
      message: error.message || 'Failed to load more images',
    });
    toggleLoadMoreButton(true);
  } finally {
    toggleLoader(false);
  }
};

/**
 * Handles the form submission and initial image search
 * @param {Event} e - The submit event
 */
const handleSubmit = async e => {
  e.preventDefault();

  const query = DOM.input.value.trim();
  if (!query) {
    iziToast.error({
      ...TOAST_CONFIG,
      message: 'Please enter a search query',
    });
    return;
  }

  // Reset state for new search
  state.currentPage = 1;
  state.currentQuery = query;

  // Clear previous results
  DOM.gallery.innerHTML = '';
  toggleLoadMoreButton(false);
  toggleLoader(true);

  // Refresh lightbox if it exists
  if (state.lightbox) {
    state.lightbox.destroy();
    state.lightbox = null;
  }

  try {
    const response = await pixabayApi(query, state.currentPage);

    if (response.hits.length === 0) {
      throw new Error(
        'Sorry, there are no images matching your search query. Please try again!'
      );
    }

    // Render gallery
    DOM.gallery.innerHTML = renderFunction(response.hits);

    // Initialize lightbox
    state.lightbox = new SimpleLightbox('.gallery a', LIGHTBOX_CONFIG);

    // Show load more button if there are more images
    if (response.hits.length < response.totalHits) {
      toggleLoadMoreButton(true);
    }

    state.totalHits = response.totalHits;
  } catch (error) {
    iziToast.error({
      ...TOAST_CONFIG,
      message: error.message || 'Failed to fetch images',
    });
  } finally {
    toggleLoader(false);
  }
};

// Event Listeners
DOM.form.addEventListener('submit', handleSubmit);
DOM.loadMoreBtn.addEventListener('click', handleLoadMore);