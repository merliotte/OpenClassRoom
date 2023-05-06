function getIdFromLocalStorage (arrayCartItems){
    return arrayCartItems.map(item => item.id);
     
}

async function fetchProduct(kanapId) {
    try {
        const kanap = await fetch(`http://localhost:3000/api/products/${kanapId}`)
        const promessdata = kanap.json()
    return promessdata;
}
    catch (error) {
        console.error(error.message);
    } 
}

async function getProductFromApi (arrayStringId, arrayCartItems) {
    return await Promise.all(
        await arrayStringId.map(async (id, index) => {
           const kanap =  await fetchProduct(id);
           return {
                ...kanap, 
                ...arrayCartItems[index]
           }
        })
    )
}

function renderKanapDataIntoHtml(kanapArray) {
    const articlesContainer = document.getElementById('cart__items');
    kanapArray.forEach((canap) => {
        const article = document.createElement('article');
        article.classList.add( 'cart__item');
        
      article.innerHTML += `
      <div class="cart__item__img">
        <img src="${canap.imageUrl}" alt="${canap.altTxt}">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${canap.name}</h2>
          <p>${canap.color}</p>
          <p> Prix: ${canap.price} €</p>
          <p>Prix Total: ${(canap.price)*(canap.quantity)} €</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté: ${canap.quantity}</p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${canap.quantity}">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
      `;
      articlesContainer.appendChild(article);
    }); 
  };

  const deleteElement =  (deleteButtons) => {
    const cartItemsStorage = JSON.parse(localStorage.getItem('cartItems'));
    deleteButtons.forEach((button) => {
        button.addEventListener("click", () => {
            // Cible le contenu supprimez 
            const articleElement = button.closest(".cart__item");
            articleElement.parentNode.removeChild(articleElement);
            // Supprime l'élément dans le localStorage
            const index = cartItemsStorage.findIndex(item => item.id);
            cartItemsStorage.splice(index, 1);
            localStorage.setItem('cartItems', JSON.stringify(cartItemsStorage));
       });
     });
};

const totalQuantity = (dataQuantity) => {
    const totalquantityItems = document.querySelector("#totalQuantity")
    let totalQuantity = 0;

        dataQuantity.forEach((kanap) => {
            totalQuantity += parseInt(kanap.quantity) ;

    console.log(totalquantityItems);
    });
    totalquantityItems.innerHTML = totalQuantity
}
const totalPrice = (dataPrice) => {
    const totalquantityItems = document.querySelector("#totalPrice")
    let totalQuantity = 0;

        dataPrice.forEach((kanap) => {
            totalQuantity += parseInt((kanap.price)*(kanap.quantity)) ;
    });
    totalquantityItems.innerHTML = totalQuantity.toFixed(2);
}

function controlQuantity(item, value) {
    inputValue = input.value;
    const quantity = document.querySelector('.itemQuantity').value;
    console.log(inputValue);
  
        if (inputValue < 0 ) document.querySelector('.itemQuantity').value = 0;
        if (inputValue > 100) document.querySelector('.itemQuantity').value = 100;
    
}

async function main () {
    try {
        const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        // Vérification de la préscence 
        if (!cartItems.length) return;
        const productIdArray = getIdFromLocalStorage(cartItems); 
        const arrayKanaps = await getProductFromApi(productIdArray, cartItems);
        const renderContainer  = renderKanapDataIntoHtml(arrayKanaps);
        const deleteButtons = document.querySelectorAll(".deleteItem");
        document.querySelector('[name="itemQuantity"]').addEventListener('keyup', controlQuantity);
        deleteElement(deleteButtons);
        totalQuantity(arrayKanaps);
        totalPrice(arrayKanaps);
    } catch (error) {
        console.log(error);
    }
}

main();
