
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
    
];

//  Création de la function et Récupération des informations de l'API avec fetch
function addElements() { 
     fetch(url)
    .then((response) => response.json())
    .then((data) => {
        arrayId.forEach(addkanap => {
            if(addkanap.useMethodByClass) {
                document.querySelector(addkanap.htmlElementId).setAttribute("src",data[addkanap.propsToLoadFromData]) 
                return
            }
            document.getElementById(addkanap.htmlElementId).innerHTML = data[addkanap.propsToLoadFromData]

        })







// Association des composants de la page HTML avec l'API
console.log(data);

//  document.getElementById("title").innerHTML= data.name;
//  document.getElementById("description").innerHTML = data.description;
//  document.getElementById("price").innerHTML= data.price; 
//  document.getElementsByClassName(".item__img").innerHTML = data.imageUrl;
 });
 }
// Appel à la fonction 
addElements();








