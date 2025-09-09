let cart = [];
let total = 0;


// Spinner Section
const manageSpinner = (status) => {
    if (status == true) {
        document.getElementById("Spinner").classList.remove("hidden");
        document.getElementById("Card-Container").classList.add("hidden");
    }
    else {
        document.getElementById("Card-Container").classList.remove("hidden");
        document.getElementById("Spinner").classList.add("hidden");
    }

};
//  All Card Load 
const cardLoad = () =>
    manageSpinner(true);
fetch(`https://openapi.programming-hero.com/api/plants`)
    .then((res) => res.json())
    .then((json) => {
        displayCards(json.plants);
        manageSpinner(false);
    });


const displayCards = (cards) => {
    const cardContainer = document.getElementById("Card-Container");
    cardContainer.innerHTML = '';


    for (const card of cards) {
        const cardDiv = document.createElement('div');

        cardDiv.innerHTML = `<div class = "Font-inter bg-white shadow-2xl max-w-[380px] lg:max-w-[400px] rounded-3xl p-2 mb-10">
                             <img src = "${card.image}" class = "w-[400px] h-[300px] rounded-3xl">
                             <h3 class = "tree-title text-2xl font-semibold ml-3 mt-5 hover:text-green-700">${card.name}</h3>
                             <p class = "text-[#606b78] ml-3 mt-3">${card.description}</p>
                             <div class = "flex justify-between items-center p-3">
                             <button class = "bg-[#c3edd2] px-3 py-2 rounded-3xl text-green-700">${card.category}</button>
                             <span class = "text-[#089934] font-bold"><i class="fa-solid fa-bangladeshi-taka-sign text-[#606b78]"></i> ${card.price}</span>
                             </div>
                             <button class = "add-t-cart bg-[#8ffab5] px-3 py-2 rounded-3xl w-[350px] mx-auto block mt-3 mb-3">Add to Cart</button>
                             </div>
         `;
        // Modal Handler
        cardDiv.querySelector('.tree-title').addEventListener('click', () => {
            showTreeDetails(card.id);
        });

        // Add to Cart Handler
        cardDiv.querySelector('.add-t-cart').addEventListener('click', () => {
            addToCart(card);
        });

        cardContainer.appendChild(cardDiv);
    }
};

// Add To cart Function
const addToCart = (tree) => {
    cart.push(tree);
    total += parseFloat(tree.price);
    cartHistory();

};

// Cart History 
const cartHistory = () => {
    const cartList = document.getElementById("cart-list");
    cartList.innerHTML = "";

    cart.forEach((tree, remove) => {
        const li = document.createElement("li");
        li.innerHTML = `
        <div class = "flex justify-between items-center bg-[#d0f8de] p-3 rounded-2xl mb-3">
        <div>
        <p>${tree.name}</p>
        <p><i class="fa-solid fa-bangladeshi-taka-sign text-[#606b78]"></i>${tree.price} <i class="fa-solid fa-xmark"></i> 1</p>
        </div>
        <button class = "remove-btn"><i class="fa-solid fa-xmark"></i></button>
        </div>
        `;

        li.querySelector(".remove-btn").addEventListener("click", () => {
            removeCartHistory(remove);

        });
        cartList.appendChild(li);
    });
    document.getElementById("total-price").innerText = total.toFixed(2);
}

// Cart History Remove 
const removeCartHistory = (remove) => {
    total -= parseFloat(cart[remove].price);
    cart.splice(remove, 1);
    cartHistory();
};


// CategoryList Load
const loadCategories = () => {
    manageSpinner(true);
    fetch(`https://openapi.programming-hero.com/api/categories`)
        .then(res => res.json())
        .then(json => {
            displayCategories(json.categories);
            manageSpinner(false);
        })
};


const displayCategories = (categories) => {
    const categoryList = document.getElementById("Category-list");
    categoryList.innerHTML = '';


    for (const category of categories) {
        const li = document.createElement('li');
        li.innerHTML = `<button id = "category-btn-${category.id}" onclick = "loadPlantsCategory(${category.id})" class="p-2 rounded-lg hover:bg-[#13d370] w-full text-center text-xl category-btn"> ${category.category_name} </button>
        `;
        categoryList.appendChild(li);
    };
};

const removeActive = () => {
    const categoryBtn = document.querySelectorAll('.category-btn');
    categoryBtn.forEach((btn) => btn.classList.remove('active'));


};


const loadPlantsCategory = (id) => {
    manageSpinner(true);
    fetch(`https://openapi.programming-hero.com/api/category/${id}`)
        .then(res => res.json())
        .then(json => {
            removeActive();
            const clickBtn = document.getElementById(`category-btn-${id}`);
            clickBtn.classList.add("active");
            displayCards(json.plants);
            manageSpinner(false);
        })
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
