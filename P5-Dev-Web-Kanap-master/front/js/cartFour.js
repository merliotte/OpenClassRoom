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
    const articleElement = document.createElement("article");
    articleElement.classList.add("cart__item");
    articleElement.setAttribute("data-id", cartItemInfo.id);
    articleElement.setAttribute("data-color", cartItemInfo.color);

    const imgElement = document.createElement("img");
    imgElement.setAttribute("src", cartItemInfo.imageUrl);
    imgElement.setAttribute("alt", cartItemInfo.altTxt);
    articleElement.appendChild(imgElement);

    const divElement = document.createElement("div");
    divElement.classList.add("cart__item__details");
    articleElement.appendChild(divElement);

    const h2Element = document.createElement("h2");
    h2Element.classList.add("cart__item__content__description");
    h2Element.textContent = cartItemInfo.name;
    divElement.appendChild(h2Element);

    const pColorElement = document.createElement("p");
    pColorElement.classList.add("cart__item__color");
    pColorElement.textContent = `Couleurs : ${cartItemInfo.color}`;
    divElement.appendChild(pColorElement);

    const pQuantityElement = document.createElement("p");
    pQuantityElement.classList.add("cart__item__quantity");
    pQuantityElement.textContent = `Quantité : ${cartItemInfo.quantity}`;
    divElement.appendChild(pQuantityElement);

    const pPriceElement = document.createElement("p");
    pPriceElement.classList.add("cart__item__price");
    pPriceElement.textContent = `Prix unitaire : ${(cartItemInfo.price)}€`;
    divElement.appendChild(pPriceElement);

    const pTotalPriceElement = document.createElement("p");
    pTotalPriceElement.classList.add("cart__item__total-price");
    pTotalPriceElement.textContent = `Prix total : ${(cartItemInfo.price * cartItemInfo.quantity)}€`;
    divElement.appendChild(pTotalPriceElement);

    const buttonElement = document.createElement("button");
    buttonElement.classList.add("cart__item__delete-button");
    buttonElement.textContent = "Supprimer";
    divElement.appendChild(buttonElement);

    const cartItemsElement = document.querySelector("#cart__items");
    cartItemsElement.appendChild(articleElement);
};


async function main () {
    try {
        const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        // Vérification de la préscence 
        if (!cartItems.length) return;
        const productIdArray = getIdFromLocalStorage(cartItems); 
        const arrayKanaps = await getProductFromApi(productIdArray, cartItems);
        arrayKanaps.forEach((kanap) => {
            addCartItems({
                id: kanap.id,
                name : kanap.name,
                color: kanap.color,
                quantity: kanap.quantity,
                price : kanap.price,
                image : kanap.imageUrl
            });
        });

    } catch (error) {
        console.log(error);
    }
}

main();
