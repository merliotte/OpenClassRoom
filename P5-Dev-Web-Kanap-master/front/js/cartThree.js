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

      // Création de l'élément p pour le bouton de suppression
      const deleteButtonElement = document.createElement("p");
      deleteButtonElement.classList.add("deleteItem");
      deleteButtonElement.textContent = "Supprimer";

      // Ajout des éléments dans l'élément article
      const cartItemContentElement = document.createElement("div");
      cartItemContentElement.classList.add("cart__item__content");
      cartItemContentElement.appendChild(imgElement);
      cartItemContentElement.appendChild(h2Element);
      cartItemContentElement.appendChild(colorElement);
      cartItemContentElement.appendChild(priceElement);
      cartItemContentElement.appendChild(quantityElement);
      cartItemContentElement.appendChild(deleteButtonElement);
      articleElement.appendChild(cartItemContentElement);

      // Ajout de l'élément article au conteneur
      cartItemsContainer.appendChild(articleElement);
    });
}

// Parcours des produits du panier et appel de la fonction createCartItemElement pour chacun d'eux
if (cartItems) {
  cartItems.forEach(item => createCartItemElement(item));
}
