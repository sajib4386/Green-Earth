//  All Card Load 
const cardLoad = () =>
    fetch(`https://openapi.programming-hero.com/api/plants`)
        .then((res) => res.json())
        .then((json) => {
            displayCards(json.plants);
        });


const displayCards = (cards) => {
    const cardContainer = document.getElementById("Card-Container");
    cardContainer.innerHTML = '';


    for (const card of cards) {
        const cardDiv = document.createElement('div');

        cardDiv.innerHTML = `<div class = "Font-inter bg-white shadow-2xl max-w-[400px] rounded-3xl p-2 mb-10">
                             <img src = "${card.image}" class = "w-[400px] h-[300px] rounded-3xl">
                             <h3 class = "tree-title text-2xl font-semibold ml-3 mt-5 hover:text-green-700">${card.name}</h3>
                             <p class = "text-[#606b78] ml-3 mt-3">${card.description}</p>
                             <div class = "flex justify-between items-center p-3">
                             <button class = "bg-[#c3edd2] px-3 py-2 rounded-3xl text-green-700">${card.category}</button>
                             <span class = "text-[#089934] font-bold"><i class="fa-solid fa-bangladeshi-taka-sign text-[#606b78]"></i> ${card.price}</span>
                             </div>
                             <button class = "bg-[#8ffab5] px-3 py-2 rounded-3xl w-[350px] mx-auto block mt-3 mb-3">Add to Cart</button>
                             </div>
         `;

        cardDiv.querySelector('.tree-title').addEventListener('click', () => {
            showTreeDetails(card.id);
        });

        cardContainer.appendChild(cardDiv);
    }
};

// CategoryList Load
const loadCategories = () => {
    fetch(`https://openapi.programming-hero.com/api/categories`)
        .then(res => res.json())
        .then(json => displayCategories(json.categories))
};


const displayCategories = (categories) => {
    const categoryList = document.getElementById("Category-list");
    categoryList.innerHTML = '';


    for (const category of categories) {
        const li = document.createElement('li');
        li.innerHTML = ` <button onclick = "loadPlantsCategory(${category.id})"
        class="p-2 rounded-lg hover:bg-[#13d370] w-full text-center text-xl">
                ${category.category_name}
            </button>
        `;

        categoryList.appendChild(li);

    };
};


const loadPlantsCategory = (id) => {
    fetch(`https://openapi.programming-hero.com/api/category/${id}`)
        .then(res => res.json())
        .then(json => displayCards(json.plants));
};


// Show Modal
const showTreeDetails = (id) => {
    fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
        .then(res => res.json())
        .then(json => {
            const tree = json.plants;
            document.getElementById("modal-title").innerText = tree.name;
            document.getElementById("modal-image").src = tree.image;
            document.getElementById("modal-description").innerText = tree.description;
            document.getElementById("modal-category").innerText = tree.category;
            document.getElementById("modal-price").innerHTML = `<i class="fa-solid fa-bangladeshi-taka-sign text-[#606b78]"></i> ${tree.price}`;
            document.getElementById("tree-modal").classList.remove("hidden");
        });
};


const closeModal = () => {
    document.getElementById("tree-modal").classList.add("hidden");
};


cardLoad();
loadCategories();
