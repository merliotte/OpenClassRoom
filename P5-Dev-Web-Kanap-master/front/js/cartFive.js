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

const addCartItems = (cartItemInfo) => {
    console.log(cartItemInfo);
    cartItemInfo.forEach(kanap => {
    const cartItemsContainer = document.querySelector("#cart__items");
    const articleElement = document.createElement("article");
        articleElement.classList.add("cart__item");
        articleElement.setAttribute("data-id", kanap.id);
        articleElement.setAttribute("data-color", kanap.color);
    
    const imgElement = document.createElement("img");
        imgElement.setAttribute("src", kanap.imageUrl);
        imgElement.setAttribute("alt", kanap.altTxt);
    
    const divElement = document.createElement("div");
        divElement.classList.add("cart__item__details");
    
    const h2Element = document.createElement("h2");
        h2Element.classList.add("cart__item__content__description");
        h2Element.textContent = kanap.name;
    
    const pColorElement = document.createElement("p");
        pColorElement.classList.add("cart__item__color");
        pColorElement.textContent = `Couleurs : ${kanap.color}`;
    
    const pQuantityElement = document.createElement("p");
        pQuantityElement.classList.add("cart__item__quantity");
        pQuantityElement.textContent = `Quantité : ${kanap.quantity}`;

    const pPriceElement = document.createElement("p");
        pPriceElement.classList.add("cart__item__price");
        pPriceElement.textContent = `Prix unitaire : ${(kanap.price)}€`;
    
    const pTotalPriceElement = document.createElement("p");
        pTotalPriceElement.classList.add("cart__item__total-price");
        pTotalPriceElement.textContent = `Prix total : ${(kanap.price * kanap.quantity)}€`;

    const buttonElement = document.createElement("button");
        buttonElement.classList.add("cart__item__delete-button");
        buttonElement.textContent = "Supprimer";
    
    const cartItemContentElements = document.createElement("div");
        cartItemContentElements.classList.add("cart__item__content");
    
    const arrayElementsHtml = [imgElement,divElement,h2Element, pColorElement, pQuantityElement, pTotalPriceElement ]
    arrayElementsHtml.forEach(element => {cartItemContentElements.appendChild(element);
        articleElement.appendChild(cartItemContentElements)
        cartItemsContainer.appendChild(articleElement);
        
    })
}) 

};



async function main () {
    try {
        const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        // Vérification de la préscence 
        if (!cartItems.length) return;
        const productIdArray = getIdFromLocalStorage(cartItems); 
        const arrayKanaps = await getProductFromApi(productIdArray, cartItems);
        const addCartItem = await addCartItems(arrayKanaps);
       
    } catch (error) {
        console.log(error);
    }
}

main();
