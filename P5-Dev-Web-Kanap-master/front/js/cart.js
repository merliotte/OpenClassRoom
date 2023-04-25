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
    {htmlElementId: "totalPrice", propsToLoadFromData:"price"},

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
});
// Ajout des informations stockés
cartItems.forEach((item) => {
    const cartItem = document.querySelector('article');
        cartItem.setAttribute('data-id', item.id);
        cartItem.setAttribute('data-color', item.color);

    const quantityKanap = document.querySelector(".itemQuantity"); 
    quantityKanap.value = item.quantity; 
        
    const cartItemColor = document.querySelector('p');
        cartItemColor.textContent = item.color;

    const totalQuantity = document.getElementById("totalQuantity"); 
        totalQuantity.textContent = item.quantity;

    const totalPrice = document.getElementById("totalPrice"); 
    totalPrice.textContent = item
});
};
 // Suppression des articles du Panier

// Sélectionner tous les boutons "Supprimer"
const deleteButtons = document.querySelectorAll('.deleteItem');

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
    item.remove();
        });
    });
});


  addElements();
