import galleryItems from './gallery-items.js';

const refs = {
    gallery: document.querySelector('.js-gallery'),
    modalWindow: document.querySelector('.js-lightbox'),
    closeModalWindow: document.querySelector('.lightbox__button'),
    modalImage: document.querySelector('.lightbox__image'),
    modalOverlay: document.querySelector('.lightbox__overlay')
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

const onOpenModal = e => {
    e.preventDefault();

    const targetRef = e.target;
    if(!targetRef.classList.contains('gallery__image')) {
        return
    }

    refs.modalWindow.classList.add('is-open');
    refs.modalImage.src = targetRef.dataset.source;
    refs.modalImage.alt = targetRef.alt;

}
refs.gallery.addEventListener('click', onOpenModal);

// ДЕЛЕГИРОВАНИЕ



// ЗАКРЫТИЕ МОДАЛКИ

const onCloseModal = e => {
    refs.modalWindow.classList.remove('is-open');
    refs.modalImage.src = '';
    refs.modalImage.alt = '';
}

refs.closeModalWindow.addEventListener('click', onCloseModal);

