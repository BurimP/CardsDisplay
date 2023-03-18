const cardContainer = document.getElementById("card-container");
const loadMoreBtn = document.getElementById("load-more-btn");

// Load the first four cards when the page is opened
let start = 0;
let end = 4;
loadCards(start, end);

async function loadCards(start, end) {
  // Load the card data from the JSON file
  const response = await fetch("../data.json");
  const data = await response.json();

  // Load four more cards when the Load More button is clicked
  loadMoreBtn.addEventListener("click", async () => {
    start += 4;
    end += 4;
    await loadCards(start, end);
    themes();
  });

  // Loop through the card data and create HTML for each card
  for (let i = start; i < end && i < data.length; i++) {
    const card = data[i];

    let iconPath = card.source_type;

    let icon =
      iconPath == "facebook"
        ? "../icons/facebook.svg"
        : "../icons/instagram-logo.svg";

    const cardHtml = `
      <div class="card">
        <div class="upper-section">
          <div class="pic-name">
            <img
              class="image"
              src=${card.profile_image}
            />
            <div class="name-date">
              <p class="name">${card.name}</p>
              <p class="date">${card.date.slice(0, 10)}</p>
            </div>
          </div>
          <div class="icon-img">
            <img src=${icon} alt="" />
          </div>
        </div>

        <div class="middle-section">
          <img
            class="main-img"
            src=${card.image}
            alt=""
          />
          <p class="description">
            ${card.caption}
          </p>
        </div>

        <div class="lower-section">
          <img src="../icons/heart.svg" alt="" class="heart"/>
          <p class="likes">${parseInt(card.likes)}</p>
        </div>
      </div>
    `;
    cardContainer.innerHTML += cardHtml;
  }

  // Hide the Load More button if all cards have been loaded
  if (end >= data.length) {
    loadMoreBtn.style.display = "none";
  }

  const likesElements = document.querySelectorAll(".likes");
  console.log(likesElements);

  const heartIcons = document.querySelectorAll(".heart");
  console.log(heartIcons);

  if (likesElements.length !== heartIcons.length) {
    console.error(
      "Number of likes elements does not match number of heart icons"
    );
  }

  for (let i = 0; i < heartIcons.length; i++) {
    let like = parseInt(likesElements[i].textContent);
    heartIcons[i].addEventListener("click", function () {
      heartIcons[i].classList.toggle("red-heart");
      heartIcons[i].src = heartIcons[i].classList.contains("red-heart")
        ? "../icons/red-heart.svg"
        : "../icons/heart.svg";
      if (heartIcons[i].classList.contains("red-heart")) {
        like += 1;
      } else {
        like -= 1;
      }
      likesElements[i].textContent = like.toString();
    });
  }
  const themes = () => {
    const darkTheme = document.getElementById("darkTheme");
    const lightTheme = document.getElementById("lightTheme");
    const cardSelectors = document.querySelectorAll(".card");

    const applyTheme = (theme) => {
      for (let i = 0; i < cardSelectors.length; i++) {
        cardSelectors[i].classList.toggle("dark", theme === "dark");
      }
    };

    darkTheme.addEventListener("click", () => {
      applyTheme("dark");
    });

    lightTheme.addEventListener("click", () => {
      applyTheme("light");
    });

    // Check if dark theme is already enabled and apply it to new cards
    if (darkTheme.checked) {
      applyTheme("dark");
    }
  };
  const color = () => {
    const cardBackgroundColorInput = document.getElementById(
      "cardBackgroundColor"
    );
    const cardSelectors = document.querySelectorAll(".card");

    cardBackgroundColorInput.addEventListener("input", (event) => {
      const newColor = event.target.value;
      for (let i = 0; i < cardSelectors.length; i++) {
        cardSelectors[i].style.backgroundColor = newColor;
      }
    });
  };

  const spaceBetween = () => {
    const cardSpaceBetweenInput = document.getElementById("cardSpaceBetween");
    const cardSelectors = document.querySelectorAll(".cards");

    cardSpaceBetweenInput.addEventListener("input", (event) => {
      const newSpace = event.target.value;
      for (let i = 0; i < cardSelectors.length; i++) {
        cardSelectors[i].style.gap = newSpace;
      }
    });
  };
  color();
  themes();
  spaceBetween();
}
