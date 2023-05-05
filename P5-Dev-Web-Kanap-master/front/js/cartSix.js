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
        article.setAttributes('data-id', canap.id);
        article.setAttributes('data-color', canap.color);
  
      article.innerHTML = `
      <div class="cart__item__img">
        <img src="${canap.imgUrl}" alt="${canap.altTxt}">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${canap.name}</h2>
          <p>${canap.color}</p>
          <p>${canap.price} €</p>
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

function deleteElement (deleteButtonElement) {
    const deleteButtons = document.querySelectorAll(".deleteItem");
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    const articleElement = deleteButtonElement.closest(".cart__item");
    deleteButtons.forEach(button => {
        
        deleteButtonElement.addEventListener("click", () => {
            // Cible le contenu supprimez 
            articleElement.parentNode.removeChild(articleElement);
            // Supprime les éléments dans le localStorage
            const index = cartItems.findIndex(item => item.id);
            if (index !== -1) {
                cartItems.splice(index, 1);
            }
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
       });
     });
};



async function main () {
    try {
        const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        // Vérification de la préscence 
        if (!cartItems.length) return;
        const productIdArray = getIdFromLocalStorage(cartItems); 
        const arrayKanaps = await getProductFromApi(productIdArray, cartItems);
        renderKanapDataIntoHtml(arrayKanaps);
    } catch (error) {
        console.log(error);
    }
}

main();
