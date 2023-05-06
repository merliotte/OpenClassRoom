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
        article.setAttribute ("data-id", canap.id)

            article.innerHTML += `
            <div class="cart__item__img">
              <img src="${canap.imageUrl}" alt="${canap.altTxt}">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>${canap.name}</h2>
                <p>${canap.color}</p>
                <p> Prix : ${canap.price} €</p>
                <p>Prix Total : ${(canap.price)*(canap.quantity)} €</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Quantité :</p>
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

// Calcul du Total quantité
const totalQuantity = (dataQuantity) => {
    const totalquantityItems = document.querySelector("#totalQuantity")
    let totalQuantity = 0;

        dataQuantity.forEach((kanap) => {
            totalQuantity += parseInt(kanap.quantity) ;
    });
    totalquantityItems.textContent = totalQuantity
}

// Calcul du Total du Prix 
const totalPrice = (dataPrice) => {
    const totalquantityItems = document.querySelector("#totalPrice")
    let totalQuantity = 0;

        dataPrice.forEach((kanap) => {
            totalQuantity += parseInt((kanap.price)*(kanap.quantity)) ;
    });
    totalquantityItems.textContent = totalQuantity.toFixed(2);
}
// Controle de la Quantité indiqué

// function controlQuantity() {
//     const quantity = document.querySelectorAll('.itemQuantity').value;
//     console.log(quantity);
//     if (quantityValue != null) {
//         if (quantityValue < 0 ) document.querySelector('.itemQuantity').value = 0;
//         if (quantityValue > 100) document.querySelector('.itemQuantity').value = 100;
//     }
    
// }
const changementQuantity = () => {
    const inputQuantity = document.querySelectorAll(".itemQuantity");
    const valueInput = inputQuantity.value; 
    console.log(valueInput);
}
const testFieldsIsEmpty = () => {
	const form = document.querySelector('.cart__order__form');
	const inputs = form.querySelectorAll('input');
	let pass = true;
	inputs.forEach((element) => {
		element.addEventListener('input', () => testInData(element));

		switch (element.id) {
			case 'firstName': {
				if (element.value == '') {
					element.setAttribute('style', 'border:1px solid #FF0000; padding-left: 15px;');
					document.querySelector('#firstNameErrorMsg').textContent = 'Veuillez entrer votre prénom';
					pass = false;
				}
			}
			case 'lastName': {
				if (element.value == '') {
					element.setAttribute('style', 'border:1px solid #FF0000; padding-left: 15px;');
					document.querySelector('#lastNameErrorMsg').textContent = 'Veuillez entrer votre nom';
					pass = false;
				}
			}
			case 'address': {
				if (element.value == '') {
					element.setAttribute('style', 'border:1px solid #FF0000; padding-left: 15px;');
					document.querySelector('#addressErrorMsg').textContent = 'Veuillez entrer votre adresse';
					pass = false;
				}
			}
			case 'city': {
				if (element.value == '') {
					element.setAttribute('style', 'border:1px solid #FF0000; padding-left: 15px;');
					document.querySelector('#cityErrorMsg').textContent = 'Veuillez entrer une ville';
					pass = false;
				}
			}
			case 'email': {
				if (element.value == '') {
					element.setAttribute('style', 'border:1px solid #FF0000; padding-left: 15px;');
					document.querySelector('#emailErrorMsg').textContent = 'Veuillez entrer une adresse email valide !';
					pass = false;
				}
			}
		}
	});
	return pass;
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

        deleteElement(deleteButtons);

        const totalItemsQuantity = await totalQuantity(arrayKanaps);

        totalPrice(arrayKanaps);
        // controlQuantity(arrayKanaps);

        testFieldsIsEmpty();

        changementQuantity(arrayKanaps);



    } catch (error) {
        console.log(error);
    }
}

main();
