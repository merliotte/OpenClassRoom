
// Récupération des informations de la page source
const urlParams = new URL(document.location).searchParams;
// Ajout de l'ID 
const urlId = urlParams.get("id");
// Connexion avec l'API 
const url = `http://localhost:3000/api/products/${urlId}`;

//  Création de la function et Récupération des informations de l'API avec fetch
 async function addElements() { 
    await fetch(url)
    .then((response) => response.json())
    .then((data) => {
// Association des composants de la page HTML avec l'API
console.log(data);
const productName = document.getElementById("title").innerHTML= data.name;
const productDescription = document.getElementById("description").innerHTML = data.name;
const productPrice = document.getElementById("price").innerHTML=data.price; 
 });
}
// Appel à la fonction 
addElements();



