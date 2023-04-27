// Récupération des données depuis le localStorage
const cartItems = JSON.parse(localStorage.getItem("cartItems"));
// Récupération des éléments HTML
const cartItemsContainer = document.querySelector("#cart__items");

// Fonction qui crée un élément HTML pour chaque produit
function createCartItemElement(data) {
  // Retourne une promesse
  return fetch(`http://localhost:3000/api/products/${data.id}`)
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

      // Création de l'élément p pour le bouton de suppression
      const deleteButtonElement = document.createElement("div");
      deleteButtonElement.classList.add("cart__item__content__settings__delete");
      const deleteItemElement = document.createElement("p");
      deleteItemElement.classList.add("deleteItem");
      deleteItemElement.textContent = "Supprimer";
      deleteItemElement.style.cursor = "pointer"
      deleteButtonElement.appendChild(deleteItemElement);

      // Ajout des éléments dans l'élément article
      const cartItemContentElement = document.createElement("div");
      cartItemContentElement.classList.add("cart__item__content");
      cartItemContentElement.appendChild(imgElement);
      cartItemContentElement.appendChild(h2Element);
      cartItemContentElement.appendChild(colorElement);
      cartItemContentElement.appendChild(priceElement);
      cartItemContentElement.appendChild(quantityElement);
      cartItemContentElement.appendChild(deleteButtonElement);
      cartItemContentElement.appendChild(deleteItemElement);
      articleElement.appendChild(cartItemContentElement);

      // Ajout de l'élément article au conteneur
      cartItemsContainer.appendChild(articleElement);
    
});
}

// Parcours des produits du panier et appel de la fonction createCartItemElement pour chacun d'eux
if (cartItems) {
  cartItems.forEach(item => createCartItemElement(item));
}

 // Suppression des articles du Panier

// Ajout d'un événement de clic au bouton de suppression
function deleteElement (deleteButtonElement) {
    deleteItem.addEventListener("click", () => {
    // Supprimer l'élément article parent du bouton de suppression
    const articleElement = deleteButtonElement.closest(".cart__item");
    articleElement.parentNode.removeChild(articleElement);
    // Vérifier si le conteneur est vide et afficher un message si c'est le cas
    if (cartItemsContainer.children.length === 0) {
      const emptyCartElement = document.createElement("p");
      emptyCartElement.classList.add("empty-cart-message");
      emptyCartElement.textContent = "Votre panier est vide";
      cartItemsContainer.appendChild(emptyCartElement);
    }
  });
}; 

deleteElement(deleteButtonElement);