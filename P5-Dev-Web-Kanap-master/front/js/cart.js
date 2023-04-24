
let stockageKanap = window.localStorage.getItem('stockageKanap');

// Récupération de la page source
const urlParams = new URL(document.location).searchParams; 
// Ajout de l'ID 
const urlId = urlParams.get("id"); 
// Connection avec l'API 
const url = `http://localhost:3000/api/products/${urlId}`; 

// Récupération des ressources avec fetch 

console.log(stockageKanap);


