import galleryItems from './gallery-items.js';

const refs = {
    gallery: document.querySelector('.js-gallery'),
    modalWindow: document.querySelector('.js-lightbox'),
    closeModalWindow: document.querySelector('.lightbox__button'),
    modalImageRef: document.querySelector('.lightbox__image'),
    modalOverlayRef: document.querySelector('.lightbox__overlay')
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

// ОТКРЫТИЕ МОДАЛКИ

const onOpenModalWindow = e => {
    e.preventDefault();

    const targetRef = e.target;
    if(!targetRef.classList.contains('gallery__image')) {
        return
    }

    refs.modalWindow.classList.add('is-open');
    refs.modalImageRef.src = targetRef.dataset.source;
    refs.modalImageRef.alt = targetRef.alt;
    window.addEventListener('keydown', onArrowPress);
    window.addEventListener('keydown', onEscapePress);
}

// ЛИСТАЕМ

const onArrowPress = e => {
    if(e.code !== 'ArrowRight' && e.code !== 'ArrowLeft') {
        return
    }
    
    const imagesRef = [];
    galleryItems.forEach( el => imagesRef.push(el.original))

    const currentIndex = imagesRef.indexOf(refs.modalImageRef.src);
    let index;
    if(e.code === 'ArrowRight') {
        index = currentIndex + 1;
        if(index > galleryItems.length - 1) {
            index = 0
        }
    } else if (e.code === 'ArrowLeft') {
        index = currentIndex - 1;
        if(index < 0) {
            index = galleryItems.length - 1
        }
    }

    // const currentImageRef = galleryItems.find(image => 
    //     image.original === refs.modalImageRef.src);

    // let index; 
    // if(e.code === 'ArrowRight') {
    //     index = (galleryItems.indexOf(currentImageRef) + 1);
    // } else if(e.code === 'ArrowLeft') {
    //     index = (galleryItems.indexOf(currentImageRef) - 1);
    // }
    // if (index < 0) {
    //     index = galleryItems.length - 1
    // };
    // if (index > galleryItems.length - 1) {
    //     index = 0
    // };

    refs.modalImageRef.src = galleryItems[index].original;
    refs.modalImageRef.alt = galleryItems[index].description;
}

// ЗАКРЫТИЕ МОДАЛКИ

const onCloseModalWindow = e => {
    refs.modalWindow.classList.remove('is-open');
    refs.modalImageRef.src = '';
    refs.modalImageRef.alt = '';
    window.removeEventListener('keydown', onArrowPress);
    window.removeEventListener('keydown', onEscapePress);
}

const onOverlayClick = e => {
    if(e.target === refs.modalOverlayRef) {
        onCloseModalWindow();
    }
}

const onEscapePress = e => {
    if(e.code === 'Escape') {
        onCloseModalWindow();
    }
}

refs.gallery.insertAdjacentHTML('afterbegin', createGalleryItemsMarkup(galleryItems));
refs.gallery.addEventListener('click', onOpenModalWindow);
refs.closeModalWindow.addEventListener('click', onCloseModalWindow);
refs.modalOverlayRef.addEventListener('click', onOverlayClick);

