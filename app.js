const endPoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
const cityArray = (item) => {
  const cityInfo = document.createElement("div");
  cityInfo.classList.add("city-info");
  const cityName = document.createElement("p");
  cityName.classList.add("city-name");
  cityName.textContent = `${item.city}, ${item.state}`;
  const cityPopulation = document.createElement("p");
  cityPopulation.classList.add("city-population");
  cityPopulation.textContent = `${item.population}`;
  cityInfo.appendChild(cityName);
  cityInfo.appendChild(cityPopulation);
  return cityInfo;
};

fetch(endPoint)
  .then((blob) => blob.json())
  .then((data) => {
    const search = document.getElementById("search");
    const citiesInfo = document.querySelector(".cities-info");
    search.addEventListener("keydown", (event) => {
      if (event.keyCode === 13) {
        let searchedArray = [];
        if (search.value !== "") {
          searchedArray = data.filter((item) => {
            return (
              item.city.toLowerCase().includes(search.value.toLowerCase()) ||
              item.state.toLowerCase().includes(search.value.toLowerCase())
            );
          });
        }

        citiesInfo.innerHTML = "";
        if (citiesInfo.children.length === 0) {
          for (const item of searchedArray) {
            const newCity = cityArray(item);
            citiesInfo.appendChild(newCity);
          }
        }
      }
    });
  });
