/**
 * Gallery rendering module
 * Handles the creation of gallery items and their HTML structure
 */

/**
 * Creates HTML markup for a single gallery item
 * @param {Object} image - The image data object
 * @returns {string} HTML markup for the gallery item
 */
const createGalleryItem = ({
  comments,
  downloads,
  likes,
  largeImageURL,
  previewURL,
  views,
}) => `
  <li class="gallery-item">
    <a class="gallery-link" href="${largeImageURL}">
      <img
        class="gallery-image"
        src="${previewURL}"
        alt="Gallery image"
        loading="lazy"
      />
    </a>
    <div class="image-descriptions-container">
      <div class="small-descriptions-container">
        <p>Likes</p>
        <p>${likes}</p>
      </div>
      <div class="small-descriptions-container">
        <p>Views</p>
        <p>${views}</p>
      </div>
      <div class="small-descriptions-container">
        <p>Comments</p>
        <p>${comments}</p>
      </div>
      <div class="small-descriptions-container">
        <p>Downloads</p>
        <p>${downloads}</p>
      </div>
    </div>
  </li>
`;

/**
 * Renders the gallery with the provided posts
 * @param {Array} posts - Array of image data objects
 * @returns {string} Complete HTML markup for the gallery
 */
export function renderFunction(posts) {
  if (!Array.isArray(posts) || posts.length === 0) {
    return '';
  }

  const markup = posts.map(createGalleryItem).join('');

  // Use setTimeout to ensure the DOM is updated before adding animation classes
  setTimeout(() => {
    const items = document.querySelectorAll('.gallery-item');
    items.forEach(item => {
      item.classList.add('animate');
    });
  }, 0);

  return markup;
}

/**
 * Smoothly scrolls the page after loading new images
 * @param {number} cardHeight - Height of a single gallery card
 */
export function smoothScroll(cardHeight) {
  const scrollDistance = cardHeight * 2;
  window.scrollBy({
    top: scrollDistance,
    behavior: 'smooth',
  });
}