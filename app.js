// function closeModal(e) {
//   const trigers = [
//     "Escape",
//     "ArrowRight",
//     "ArrowLeft",
//     "Lightbox__vutton",
//     "lightbox__overlay",
//   ];
//   if (!trigers.includes(e.key || e.target.className)) return;
//   if (e.key === "ArrowRight" || e.key === "ArrowLeft") return leafOver(e.key);
//   requestAnimationFrame.Lightbox.classList.remove("is-open");

//   refs.btnClose.removeEventListner("click", closeModal);
//   refs.lightboxOverlay.removeEventListner("click", closeModal);
//   uploadPictures("", "");
// }

const galleryItems = [
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg",
    description: "Hokkaido Flower",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
    description: "Container Haulage Freight",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
    description: "Aerial Beach View",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
    description: "Flower Blooms",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
    description: "Alpine Mountains",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
    description: "Mountain Lake Sailing",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
    description: "Alpine Spring Meadows",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
    description: "Nature Landscape",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
    description: "Lighthouse Coast Sea",
  },
];
const refs = {
  listImages: document.querySelector(".js-gallery"),
  openModal: document.querySelector(".js-lightbox"),
  backdropClose: document.querySelector(".lightbox__overlay"),
  imageRef: document.querySelector(".lightbox__image"),
  closeBth: document.querySelector('button[data-action="close-lightbox"]'),
};

const galleryContent = createGalleryItemsMarkup(galleryItems);
refs.listImages.innerHTML = galleryContent;

refs.listImages.addEventListener("click", openModalWithTargetImage);

// Основні функції

function createGalleryItemsMarkup(array) {
  return array
    .map(({ preview, original, description }) => {
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
            alt="${description}"
          />
        </a>
      </li>
    `;
    })
    .join("");
}
// Відкривання модалки
function openModalWithTargetImage(event) {
  event.preventDefault();
  if (event.currentTarget === event.target) {
    return;
  }
  refs.openModal.classList.add("is-open");
  refs.imageRef.src = event.target.dataset.source;
  refs.imageRef.alt = event.target.alt;

  refs.closeBth.addEventListener("click", closeModal);
  refs.backdropClose.addEventListener("click", closeModalByOverlay);
  window.addEventListener("keydown", closeModalByEsc);
  window.addEventListener("keydown", changeImageByArrows);
}
// закривання модалки
function closeModal() {
  refs.openModal.classList.remove("is-open");
  refs.imageRef.src = "";

  refs.closeBth.removeEventListener("click", closeModal);
  refs.backdropClose.removeEventListener("click", closeModalByOverlay);
  window.removeEventListener("keydown", closeModalByEsc);
  window.removeEventListener("keydown", changeImageByArrows);
}

function closeModalByOverlay(event) {
  if (event.target === event.currentTarget) {
    closeModal();
  }
}

function closeModalByEsc(event) {
  if (event.code === "Escape") {
    closeModal();
  }
}

// наступне та попереднє зображення

function changeImageByArrows(event) {
  const largeImagesArray = galleryItems.map((elem) => elem.original);

  const currentImageIndex = largeImagesArray.indexOf(refs.imageRef.src);
  if (event.code === "ArrowLeft") {
    let nextImageIndex = currentImageIndex - 1;
    if (nextImageIndex === -1) {
      nextImageIndex = largeImagesArray.length - 1;
    }
    refs.imageRef.src = largeImagesArray[nextImageIndex];
  } else if (event.code === "ArrowRight") {
    let nextImageIndex = currentImageIndex + 1;
    if (nextImageIndex === largeImagesArray.length) {
      nextImageIndex = 0;
    }
    refs.imageRef.src = largeImagesArray[nextImageIndex];
  }
}

// const imagesMarkup = createImagesList(galleryItems);
// imageEl.insertAdjacentHTML("beforeend", imagesMarkup);

// const createItemLi = (obj) => {
//   return `<li class="gallery__item"><a class="gallery__link"><img src = '${obj.preview}' alt='${obj.description}' calss="gallery__image"></img></a></li>`;
//   // return `<a href='${obj.original}'><li><img src = '${obj.preview}'></img></li></a>`;
// };
// const allListEl = galleryItems.map(createItemLi).join("");
// listImages.insertAdjacentHTML("afterbegin", allListEl);

// // console.log(allListEl);

// listImages.addEventListener("click", onImageClick);
// // closeBth.addEventListener("click", onCloseBtn);
// // backdropClose.addEventListener("click", onBackdropClick);

// function onImageClick(evt) {
//   if (!evt.target.classList.contains("js-gallery")) {
//     return;
//   }
//   console.log(evt.target);
// }
