const cardLoad = () =>
    fetch('https://openapi.programming-hero.com/api/plants')
        .then((res) => res.json())
        .then((json) => {
            displayCards(json.plants);
        });

const displayCards = (cards) => {
    const cardContainer = document.getElementById("Card-Container");
    cardContainer.innerHTML = '';

    for (const card of cards) {
        const cardDiv = document.createElement('div');

        cardDiv.innerHTML = `<div class = "Font-inter bg-white shadow-2xl max-w-[400px] rounded-3xl p-2 ">
                             <img src = "${card.image}" class = "w-[400px] h-[300px] rounded-3xl">
                             <h3 class = "text-2xl font-semibold ml-3 mt-5">${card.name}</h3>
                             <p class = "text-[#606b78] ml-3 mt-3">${card.description}</p>
                             <div class = "flex justify-between items-center p-3">
                             <button class = "bg-[#c3edd2] px-3 py-2 rounded-3xl text-green-700">${card.category}</button>
                             <span class = "text-[#089934] font-bold"><i class="fa-solid fa-bangladeshi-taka-sign text-[#606b78]"></i> ${card.price}</span>
                             </div>
                             <button class = "bg-[#8ffab5] px-3 py-2 rounded-3xl w-[350px] mx-auto block mt-3 mb-3">Add to Cart</button>
                             </div>
         `;


        cardContainer.appendChild(cardDiv);
    }

}
cardLoad();