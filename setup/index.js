const cardContainer = document.getElementById("card-container");
const loadMoreBtn = document.getElementById("load-more-btn");

// Load the first four cards when the page is opened
let start = 0;
let end = 4;
loadCards(start, end);

// Load four more cards when the Load More button is clicked
loadMoreBtn.addEventListener("click", () => {
  start += 4;
  end += 4;
  loadCards(start, end);
});

function loadCards(start, end) {
  // Load the card data from the JSON file
  fetch("../data.json")
    .then((response) => response.json())
    .then((data) => {
      // Loop through the card data and create HTML for each card
      for (let i = start; i < end && i < data.length; i++) {
        const card = data[i];

        // console.log(JSON.stringify(card.source_type));

        let iconPath = card.source_type;

        let icon =
          iconPath == "facebook"
            ? "../icons/facebook.svg"
            : "../icons/instagram-logo.svg";
        // console.log(icon);
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
              <p class="date">${card.date}</p>
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
    });
}
