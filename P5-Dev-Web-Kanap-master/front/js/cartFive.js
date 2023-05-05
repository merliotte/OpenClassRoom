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
const addItemsElements = (cartData) => {
    const arrayId = [
        {htmlElementId: ".cart__item__content__description > h2 ",propsToLoadFromData:"name"}, 
        {htmlElementId: ".cart__item__content__description > p ",propsToLoadFromData:"colors"}, 
        {htmlElementId: ".itemQuantity",propsToLoadFromData:"quantity"}, 
        {htmlElementId: ".cart__item__img > img ", propsToLoadFromData:"imageUrl", useMethodByClass: true},
        {htmlElementId: ".cart__item__img > img", propsToLoadFromData:"altTxt"},
        {htmlElementId: ".cart__item__content__description > p:last-of-type ", propsToLoadFromData:"price"},
    ];
    arrayId.forEach(addkanap => {
        const img = document.querySelector(addkanap.htmlElementId);
       if(addkanap.useMethodByClass ) {
        img.setAttribute("src",cartData[addkanap.propsToLoadFromData]);
        return;  
    }      
       else if (addkanap.propsToLoadFromData === "altTxt") {
        img.setAttribute("alt",cartData[addkanap.propsToLoadFromData] + " - description de l'image");
        return;       
    }
        else if (addkanap.propsToLoadFromData === "price") {
        document.querySelector(addkanap.htmlElementId).innerHTML = cartData[addkanap.propsToLoadFromData] + "€" ;
     }
        else {document.querySelector(addkanap.htmlElementId).innerHTML = cartData[addkanap.propsToLoadFromData] ;
        }
    });

}

const multiplyElement = (cartItemElements) => {
    const cartItemsContainer = document.querySelector("#cart__items");
        cartItemElements.forEach(itemElements => {
            const articleElement = document.createElement("article");
            articleElement.classList.add("cart__item");
            articleElement.setAttribute("data-id", kanap.id);
            articleElement.setAttribute("data-color", kanap.color);
            addItemsElements(kanap);
        
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
const createCartItems = (cartItemInfo) => {
    console.log(cartItemInfo);
    const cartItemsContainer = document.querySelector("#cart__items");
    
    cartItemInfo.forEach(kanap => {
        const articleElement = document.createElement("article");
            articleElement.classList.add("cart__item");
            articleElement.setAttribute("data-id", kanap.id);
            articleElement.setAttribute("data-color", kanap.color);
            addItemsElements(kanap);
        
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
        
        const quantityElement = document.createElement("input");
            quantityElement.setAttribute("type", "number");
            quantityElement.setAttribute("class", "itemQuantity");
            quantityElement.setAttribute("name", "itemQuantity");
            quantityElement.setAttribute("min", "1");
            quantityElement.setAttribute("max", "100");
            quantityElement.setAttribute("value", kanap.quantity);
            quantityElement.style.width = "35px";
            quantityElement.style.borderRadius = "15px";
            quantityElement.style.textAlign = "center";

        const deleteButtonElement = document.createElement("div");
            deleteButtonElement.classList.add("cart__item__content__settings__delete");
        const deleteItemElement = document.createElement("p");
            deleteItemElement.classList.add("deleteItem");
            deleteItemElement.textContent = "Supprimer";
            deleteItemElement.style.cursor = "pointer";
            deleteButtonElement.appendChild(deleteItemElement);
        const styleDeleteItem = document.createElement("style");
            styleDeleteItem.innerHTML = `
            .deleteItem:hover { 
                cursor: pointer;
                font-weight: 700;
            }`;
            document.head.appendChild(styleDeleteItem);
    
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
        
        const arrayElementsHtml = [imgElement, divElement,h2Element, pColorElement, quantityElement, pPriceElement, pTotalPriceElement,deleteButtonElement ]
        arrayElementsHtml.forEach(element => {cartItemContentElements.appendChild(element);
            articleElement.appendChild(cartItemContentElements)
            cartItemsContainer.appendChild(articleElement);
        
            });
            deleteElement (deleteButtonElement)
    }
)};



async function main () {
    try {
        const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        // Vérification de la préscence 
        if (!cartItems.length) return;
        const productIdArray = getIdFromLocalStorage(cartItems); 
        const arrayKanaps = await getProductFromApi(productIdArray, cartItems);
        const cartItemsContainer = await createCartItems(arrayKanaps);
       
    } catch (error) {
        console.log(error);
    }
}

main();
