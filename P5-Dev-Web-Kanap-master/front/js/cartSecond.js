// Récupérer les informations depuis le localStorage
const cartItems = JSON.parse(localStorage.getItem('cartItems'));

// Récupérer les éléments HTML pour ajouter les informations des articles
const cartList = document.getElementById('cart__items');
const totalQuantity = document.querySelector('itemQuantity');
const totalPrice = document.getElementById('totalPrice');

// Fonction pour ajouter les informations de chaque article dans le panier
function renderCartItem(item) {
  // Récupérer les informations de l'article depuis l'API en utilisant l'ID
  fetch(`http://localhost:3000/api/products/${item.id}`)
    .then(response => response.json())
    .then(data => {
      // Créer un élément li pour afficher les informations de l'article
      const li = document.createElement('li');
      li.className = 'cart-item';

      // Ajouter l'image de l'article
      const img = document.querySelector('img');
      img.src = data.imageUrl;
      img.alt = data.name;
      li.appendChild(img);

      // Ajouter le nom de l'article
      const name = document.createElement('h2');
      name.textContent = data.name;
      li.appendChild(name);

      // Ajouter la couleur de l'article
      const color = document.createElement('p');
      color.textContent = `Couleur: ${item.color}`;
      li.appendChild(color);

      // Ajouter la quantité de l'article
      const quantity = document.createElement('input');
      quantity.textContent = `Quantité: ${item.quantity}`;
      li.appendChild(quantity);

      // Ajouter le prix de l'article
      const price = document.createElement('p');
      price.textContent = `Prix: ${data.price}€`;
      li.appendChild(price);

      // Ajouter l'article à la liste des articles dans le panier
      cartList.appendChild(li);

      // Mettre à jour la quantité totale d'articles
      totalQuantity.textContent = Number(totalQuantity.textContent) + Number(item.quantity);

      // Mettre à jour le prix total
      totalPrice.textContent = Number(totalPrice.textContent) + (Number(data.price) * Number(item.quantity));
    })
    .catch(error => {
      console.error(`Erreur lors de la récupération des informations de l'article: ${error}`);
    });
}

// Ajouter les informations de chaque article dans le panier
cartItems.forEach(renderCartItem);
