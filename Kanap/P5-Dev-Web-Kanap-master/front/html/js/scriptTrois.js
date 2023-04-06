const url = "http://localhost:3000/api/products "; 
const items = document.getElementById("items");

const affichageItems = () => {
fetch(url)
    .then((response) => response.json())
    .then((data) => {
    
        for(let product in data) {
            items.innerHTML+= `
            <a href="./product.html?id=${data[product]._id}">
            <article>
              <img src="${data[product].imageUrl}" alt="${data[product].altTxt}">
              <h3 class="productName"${data[product].name}>Kanap name1</h3>
              <p class="productDescription">${data[product].description}</p>
            </article>
          </a>
            `
        }
    });  
    
}

affichageItems();