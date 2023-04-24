//Récupération des pièces eventuellement stockées dans le localStorage
const stockageItem = window.localStorage.getItem("stockageItem")
// Récupération des informations de la page source
const urlParams = new URL(document.location).searchParams;
// Ajout de l'ID 
const urlId = urlParams.get("id");
// Connexion avec l'API 
const url = `http://localhost:3000/api/products/${urlId}`;
const arrayId = [
    {htmlElementId: "title",propsToLoadFromData:"name"}, 
    {htmlElementId: "description", propsToLoadFromData:"description"},
    {htmlElementId: "price", propsToLoadFromData:"price"},
    {htmlElementId: ".item__img > img", propsToLoadFromData:"imageUrl", useMethodByClass: true},
    {htmlElementId: ".item__img > img", propsToLoadFromData:"altTxt"},
    {htmlElementId: "colors", propsToLoadFromData: "colors"}
];
//  Création de la function et Récupération des informations de l'API avec fetch
 function addElements() { 
     fetch(url)
    .then((response) => response.json())
    .then((data) => {
        // Lien avec le DOM et insertion de texte 
        const select = document.querySelector("select");
        select.innerHTML = `<option>Sélectionnez une couleur</option>`;
        
        // Réclamation des couleurs avec une boucle forEach
        data.colors.forEach(color => {
            select.innerHTML += `<option value="${color}">${color}</option>`;
            
        }); 
    // Stockage au click des informations dans le localStorage
    const informationKanap = document.getElementById("addToCart");
    const saveColor = document.getElementById("colors");
    const quantityKanap = document.getElementById("quantity");


        informationKanap.addEventListener("click", () => {
            const selectedColor = saveColor.value;
            const selectedQuantity = quantityKanap.value;
            
            
            if (selectedColor !== "Sélectionnez une couleur" && selectedQuantity > 0 ) {
                const cartItem = {
                    color : selectedColor,
                    quantity : selectedQuantity,
                };
                
            // Récupérer les éléments de panier existants à partir du stockage local et les convertir en tableau   
            let cartItems = JSON.parse(window.localStorage.getItem("cartItems") || "[]");
            // Vérifier si un article de la même couleur existe déjà dans le panier
            const existingItemIndex = cartItems.findIndex((item) => item.color === selectedColor );
            if (existingItemIndex !== -1) {
                // Mettre à jour la quantité de l'article existant
                existingItemIndex.quantity += Number(selectedQuantity);
              } else {
                // Ajouter un nouvel article au tableau des articles du panier
                cartItems.push(cartItem);
              }
            // Stocker les articles du panier mis à jour dans le stockage local
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
          }
        
    });
    // Réclamation des items avec une boucle forEach
         arrayId.forEach(addkanap => {
            if(addkanap.useMethodByClass) {
                document.querySelector(addkanap.htmlElementId).setAttribute("src",data[addkanap.propsToLoadFromData]) 
                return
            }
            document.getElementById(addkanap.htmlElementId).innerHTML = data[addkanap.propsToLoadFromData];
     });

      
    console.log(data);
});    
}
// Appel à la fonction 
addElements();

// Ajout des couleurs de l'API 


 






