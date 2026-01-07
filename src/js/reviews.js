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
    avatarSrc: "../src/assets/icons/avatar.svg",
  },
  {
    text: "“Across the quiet hills it wandered. Often knew before the rest. Of imagined no one.”",
    name: "Chris Thomas",
    location: "CEO of Red Button",
    avatarSrc: "../src/assets/icons/avatar3.svg",
  },
  {
    text: "“Beneath soft skies she lingered. Surely felt as others did. Of hidden or wished none.”",
    name: "Sophia Lee",
    location: "New York, USA",
    avatarSrc: "../src/assets/icons/avatar2.svg",
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

function setReviewData(reviewElement, reviewData, animated = false) {
  if (animated) reviewElement.classList.add("personal-review--swiping");

  if (reviewElement && reviewData) {
    setTimeout(() => {
      reviewElement.querySelector(".personal-review__text").textContent =
        reviewData.text;
      reviewElement.querySelector(".personal-review__name").textContent =
        reviewData.name;
      reviewElement.querySelector(".personal-review__location").textContent =
        reviewData.location;
      reviewElement.style.setProperty(
        "--avatar",
        `url("${reviewData.avatarSrc}")`
      );

      reviewElement.classList.remove("personal-review--swiping");
    }, 300);
  }
}

function changeReview() {
  setReviewData(currentReviewElement, reviewsData[reviewIndex]);
  setReviewData(inactiveReviewElement, reviewsData[getPrevReviewIndex()], true);
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
      const isBorder = reviewIndex === 0;
      reviewIndex = isBorder ? reviewIndex : reviewIndex - 1;

      if (!isBorder) {
        switchControls();
        changeReview();
      }
    });

    arrowDown.addEventListener("click", () => {
      const isBorder = reviewIndex === MAX_INDEX;
      reviewIndex = isBorder ? reviewIndex : reviewIndex + 1;

      if (!isBorder) {
        switchControls();
        changeReview();
      }
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
      changeReview();
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
