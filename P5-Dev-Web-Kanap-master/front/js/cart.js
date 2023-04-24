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
    {htmlElementId: ".cart__item__img > img ", propsToLoadFromData:"imageUrl", useMethodByClass: true },
    {htmlElementId: ".cart__item__img > img", propsToLoadFromData:"altTxt", useMethodByClass: true},
];

function addElements() {
    fetch(url)
    .then((response) => response.json())
    .then((data) => {

        arrayId.forEach(addkanap => {
            if(addkanap.useMethodByClass) {
                document.querySelector(addkanap.htmlElementId).setAttribute("src",data[addkanap.propsToLoadFromData]) 
                return
            }
            document.querySelector(addkanap.htmlElementId).innerHTML = data[addkanap.propsToLoadFromData];

        console.log(data);
        });
});
// Ajout des informations stockés
cartItems.forEach((item) => {
    const cartItem = document.querySelector('article');
    cartItem.setAttribute('data-id', item.id);
    cartItem.setAttribute('data-color', item.color);

    const cartItemColor = document.querySelector('p');
    cartItemColor.textContent = item.color;
  
  });
};
  addElements();
console.log(url);
