// Récupération des données depuis le localStorage
const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
// Récupération des éléments HTML
const cartItemsContainer = document.querySelector("#cart__items");

// async function fetchCartItem(data) {
//     try {
//     const kanap = await fetch(`http://localhost:3000/api/products/${data.id}`)
//     const promessdata = kanap.json()
//     return promessdata;
// }
// catch (error) {
//     console.error(error.message);
// } 
// }

// Fonction qui crée un élément HTML pour chaque produit
function createCartItemElement(data) {
    // Retourne une promesse
     fetch(`http://localhost:3000/api/products/${data.id}`)
    .then(response => response.json())
    .then(product => {
    // Remplacement des articles 
    if (cartItemsContainer){
        const valueImg = document.querySelector(".cart__item");
        valueImg.style.display = "none"; 
    }
    // Création de l'élément article
    const articleElement = document.createElement("article");
        articleElement.classList.add("cart__item");
        articleElement.setAttribute("data-id", product._id);
        articleElement.setAttribute("data-color", data.color);
        
    // Création de l'élément img
    const imgElement = document.createElement("img");
        imgElement.setAttribute("src", product.imageUrl);
        imgElement.setAttribute("alt", "Photographie d'un canapé");
    
    // Création de l'élément h2
    const h2Element = document.createElement("h2");
        h2Element.textContent = product.name;

    // Création de l'élément p pour la couleur
    const colorElement = document.createElement("p");
        colorElement.textContent = data.color;
    
    // Création de l'élément p pour le prix
    const priceElement = document.createElement("p");
        priceElement.textContent = `${product.price} €`;
    
    // Création de l'élément input pour la quantité
    const quantityElement = document.createElement("input");
        quantityElement.setAttribute("type", "number");
        quantityElement.setAttribute("class", "itemQuantity");
        quantityElement.setAttribute("name", "itemQuantity");
        quantityElement.setAttribute("min", "1");
        quantityElement.setAttribute("max", "100");
        quantityElement.setAttribute("value", data.quantity);
        quantityElement.style.width = "35px";
        quantityElement.style.borderRadius = "15px";
        quantityElement.style.textAlign = "center";
      
    //   Création de l'élément p pour le bouton de suppression
    const deleteButtonElement = document.createElement("div");
        deleteButtonElement.classList.add("cart__item__content__settings__delete");
    const deleteItemElement = document.createElement("p");
        deleteItemElement.classList.add("deleteItem");
        deleteItemElement.textContent = "Supprimer";
        deleteItemElement.style.cursor = "pointer";
        deleteButtonElement.appendChild(deleteItemElement);
    const styleDeleteItem = document.createElement("style");
        styleDeleteItem.innerHTML = `
        .deleteItem:hover { 
            cursor: pointer;
            font-weight: 700;
        }`;
        document.head.appendChild(styleDeleteItem);
    
    // Total des prix des composents
    const totalQuantityElement = document.querySelector("#totalPrice");
    let totalPricesArray = [];
    let totalPrice = parseInt(product.price); ;
    totalPricesArray.push({totalPrice});
    const totalPriceQuantity = totalPricesArray.reduce((acc,price) => acc + price, 0)
    totalQuantityElement.textContent = totalPrice;

  
    console.log(totalPriceQuantity);

    // Ajout des éléments dans l'élément article
    const cartItemContentElement = document.createElement("div");
        cartItemContentElement.classList.add("cart__item__content");
      
    const arrayElementsHtml = [imgElement, h2Element, colorElement, priceElement, quantityElement, deleteButtonElement, deleteItemElement];
      
    arrayElementsHtml.forEach(element => {
    cartItemContentElement.appendChild(element);
    });
    
    articleElement.appendChild(cartItemContentElement);
    
    //AJout de la fonction supprimer
    deleteElement(deleteItemElement, cartItemsContainer);

    // Ajout de l'élément article au conteneur
    cartItemsContainer.appendChild(articleElement);
    }
    );
}
// Parcours des produits du panier et appel de la fonction createCartItemElement pour chacun d'eux
if (cartItems) {
    cartItems.forEach(item => createCartItemElement(item));
} 
// Ajout d'un événement de clic au bouton de suppression
 function deleteElement (deleteButtonElement) {
     deleteButtonElement.addEventListener("click", () => {
           // Supprimer l'élément article parent 
        const articleElement = deleteButtonElement.closest(".cart__item");
        articleElement.parentNode.removeChild(articleElement);

        articleElement.innerHTML =
            `
            <div class="cart__item__img">
            <img src="../images/product01.jpg" alt="Photographie d'un canapé">
    </div>
    <div class="cart__item__content">
    <div class="cart__item__content__description">
    <h2>Nom du produit</h2>
    <p>Couleur du Produit</p>
    <p>0,00 €</p>
    </div>
    <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
    <p>Qté : </p>
    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="0">
    </div>
    <div class="cart__item__content__settings__delete">
    <p class="deleteItem">Supprimer</p>
    </div>
        `
          // Ajoutez les autres propriétés de l'article ici
        });
      };
    function totalQuantity() {
        const totalQuantityElement = document.querySelector("#totalQuantity");
        const cartItems = JSON.parse(localStorage.getItem("cartItems"));
        let totalQuantity = 0;
        if (cartItems) {
        cartItems.forEach(item => {
            totalQuantity += parseInt (item.quantity);
            });
        }
        totalQuantityElement.textContent = totalQuantity;
    }
    // function totalPrice(data) {
    //     fetch(`http://localhost:3000/api/products/${data.id}`)
    //     .then(response => response.json())
    //     .then(product => {
    //     const totalQuantityElement = document.querySelector("#totalPrice");
    //     let totaltPrice = 0;
    //         totaltPrice = parseInt(product.price);
    //     totalQuantityElement.textContent = totaltPrice;
    //     console.log(totaltPrice);
    //         } 
    //     )}; 

    function arraytotalPrice () {
    const elementLocal = cartItems.map(item => item.quantity)
        console.log(elementLocal); 
    }

totalQuantity();
arraytotalPrice();

// async function main () {
//     try {
//         const fectchInfo = fetchCartItem();
//         createCartItemElement(fectchInfo);
//     }
//     catch(error) {
//     console.error(error.message);
// }
// }
// main ();