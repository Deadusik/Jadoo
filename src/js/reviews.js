export function initReviews() {
  switchCardByArrows();
  switchCardByDots();
}

let reviewIndex = 0;
const MAX_INDEX = 2;

// reviews data
const reviewsData = [
  {
    text: "“On the Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no.”",
    name: "Mike taylor",
    location: "Lahore, Pakistan",
    avatarSrc: "./assets/icons/avatar.svg",
  },
  {
    text: "“On the Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no.”",
    name: "Chris Thomas",
    location: "CEO of Red Button",
    avatarSrc: "./assets/icons/avatar.svg",
  },
  {
    text: "“On the Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no.”",
    name: "Sophia Lee",
    location: "New York, USA",
    avatarSrc: "./assets/icons/avatar.svg",
  },
];

// review cards
const currentReviewElement = document.querySelector(
  ".reviews__personal-review"
);

const inactiveReviewElement = document.querySelector(
  ".personal-review--inactive"
);

// arrows controls
const arrowUp = document.getElementById("review-arrow-up");
const arrowDown = document.getElementById("review-arrow-down");

// arrows img srs
const activeArrowSrc = "../src/assets/icons/active_arrow.svg";
const inactiveArrowSrc = "../src/assets/icons/inactive_arrow.svg";

// dots controls
const dotElements = document.getElementsByClassName(
  "reviews-dots-indicator__dot"
);

function setReviewData(reviewElement, reviewData) {
  if (reviewElement && reviewData) {
    reviewElement.querySelector(".personal-review__text").textContent =
      reviewData.text;
    reviewElement.querySelector(".personal-review__name").textContent =
      reviewData.name;
    reviewElement.querySelector(".personal-review__location").textContent =
      reviewData.location;
  }
}

function changeReview() {
  setReviewData(currentReviewElement, reviewsData[reviewIndex]);
  setReviewData(inactiveReviewElement, reviewsData[getPrevReviewIndex()]);
}

function getPrevReviewIndex() {
  switch (reviewIndex) {
    case 0: {
      return 1;
    }
    case MAX_INDEX: {
      return 0;
    }
  }

  return MAX_INDEX;
}

// arrows control
function switchCardByArrows() {
  const arrowUp = document.getElementById("review-arrow-up");
  const arrowDown = document.getElementById("review-arrow-down");

  if (arrowUp && arrowDown) {
    arrowUp.addEventListener("click", () => {
      reviewIndex = reviewIndex === 0 ? reviewIndex : reviewIndex - 1;

      switchControls();
      changeReview();
    });

    arrowDown.addEventListener("click", () => {
      reviewIndex = reviewIndex === MAX_INDEX ? reviewIndex : reviewIndex + 1;

      switchControls();
      changeReview();
    });
  }
}

function switchControls() {
  switchDots();
  switchArrows();
}

function switchArrows() {
  switch (reviewIndex) {
    case 0: {
      arrowUp.src = inactiveArrowSrc;
      arrowDown.src = activeArrowSrc;
      break;
    }
    case MAX_INDEX: {
      arrowUp.src = activeArrowSrc;
      arrowDown.src = inactiveArrowSrc;
      break;
    }
    default: {
      arrowUp.src = activeArrowSrc;
      arrowDown.src = activeArrowSrc;
    }
  }
}

// dots control
function switchCardByDots() {
  Array.from(dotElements).forEach((dot, index) => {
    dot.addEventListener("click", () => {
      reviewIndex = index;

      switchControls();

      setReviewData(currentReviewElement, reviewsData[reviewIndex]);
      setReviewData(inactiveReviewElement, reviewsData[getPrevReviewIndex()]);
    });
  });
}

function switchDots() {
  Array.from(dotElements).forEach((dot, index) => {
    if (reviewIndex != index)
      dot.classList.add("reviews-dots-indicator__dot--inactive");
    else dot.classList.remove("reviews-dots-indicator__dot--inactive");
  });
}
