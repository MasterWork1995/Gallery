import galleryItems from './gallery-items.js';

const refs = {
    gallery: document.querySelector('.js-gallery'),
    modalWindow: document.querySelector('.js-lightbox'),
    closeModalWindow: document.querySelector('.lightbox__button'),
    modalImageLightbox: document.querySelector('.lightbox__image'),
    modalOverlayLightbox: document.querySelector('.lightbox__overlay')
}

// РЕНДЕР РАЗМЕТКИ

const createGalleryItemsMarkup = array => {
    return array.map(({ preview, original, description }) => {
        return `
        <li class="gallery__item">
            <a 
            class="gallery__link" 
            href="${original}"
            >
            <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"/>
            </a>
        </li>`})
        .join('')
};
console.log(refs.gallery);
refs.gallery.innerHTML = createGalleryItemsMarkup(galleryItems);

// ОТКРЫТИЕ МОДАЛКИ


// ДЕЛЕГИРОВАНИЕ



// ЗАКРЫТИЕ МОДАЛКИ
