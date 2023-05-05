//Récupération des pièces eventuellement stockées dans le localStorage
const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
console.log(cartItems);
// Transformation des pièces en JSON
const valeurPieces = JSON.stringify(cartItems);
// Récupération depus l'API image, Nom, Description
const urlId = cartItems.map(item=> item.id);
const url = `http://localhost:3000/api/products/${urlId}`; 
const arrayId = [
    {htmlElementId: ".cart__item__content__description > h2 ",propsToLoadFromData:"name"}, 
    {htmlElementId: ".cart__item__img > img ", propsToLoadFromData:"imageUrl", useMethodByClass: true},
    {htmlElementId: ".cart__item__img > img", propsToLoadFromData:"altTxt"},
    {htmlElementId: ".cart__item__content__description > p:last-of-type ", propsToLoadFromData:"price"},
];
function addElements() {
    fetch(url)
    .then((response) => response.json())
    .then((data) => {

        arrayId.forEach(addkanap => {
            const img = document.querySelector(addkanap.htmlElementId);
           if(addkanap.useMethodByClass ) {
            img.setAttribute("src",data[addkanap.propsToLoadFromData]);
            return;  
        }      
           else if (addkanap.propsToLoadFromData === "altTxt") {
            img.setAttribute("alt",data[addkanap.propsToLoadFromData] + " - description de l'image");
            return;       
        }
            else if (addkanap.propsToLoadFromData === "price") {
            document.querySelector(addkanap.htmlElementId).innerHTML = data[addkanap.propsToLoadFromData] + "€" ;
         }
            else {document.querySelector(addkanap.htmlElementId).innerHTML = data[addkanap.propsToLoadFromData] ;
            }
        });
        cartItems.forEach((item) => {
            const cartItem = document.querySelector('article');
                cartItem.setAttribute('data-id', item.id);
                cartItem.setAttribute('data-color', item.color);
        
            const quantityKanap = document.querySelector(".itemQuantity"); 
            quantityKanap.value = item.quantity; 
            // Inserction de la couleur 
            const cartItemColor = document.querySelector('p');
                cartItemColor.textContent = item.color;
            // Inserction de la quantité 
            const totalQuantity = document.getElementById("totalQuantity"); 
                totalQuantity.value = item.quantity;
                console.log(totalQuantity);
            // Calcul du total Prix 
            const totalPrice = document.getElementById("totalPrice");
            const price = data.price* item.quantity;
                totalPrice.innerHTML = price.toFixed(1);
                quantityKanap.addEventListener('input', (event) => {
                    const quantity = event.target.value;
                    const newTotal = data.price * quantity;
                    totalPrice.textContent = newTotal.toFixed(1);
                  });
        });
    });

};






 // Suppression des articles du Panier

// Sélectionner tous les boutons "Supprimer"
const deleteButtons = document.querySelectorAll(".deleteItem");

// Ajouter un gestionnaire d'événements "click" pour le bouton de reset
    
deleteButtons.forEach(button => {
    button.addEventListener('click', () => {
  // Récupérer tous les éléments de quantité d'article
    const quantityInputs = document.querySelectorAll('.itemQuantity');
  // Réinitialiser la quantité de chaque élément
    quantityInputs.forEach(input => {
    input.value = 1;
  });
  // Réinitialiser le panier dans le Local Storage
  localStorage.setItem('cart', JSON.stringify([]));
  // Supprimer tous les éléments de panier de la page
  const cartItems = document.querySelectorAll('.cart__item');
    cartItems.forEach(item => { 
        item.innerHTML = 
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

        });
    });
});


  addElements();
