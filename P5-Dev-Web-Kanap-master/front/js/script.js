const url = " http://localhost:3000/api/products"; 

 fetch(url)
.then( async(response) => await response.json())
.then ((data) => {

    for(let product in data) {
        document.getElementById("items").innerHTML+= `
    
        <a href="./product.html?id=${data[product]._id}">
            <article>
              <img src="${data[product].imageUrl}" alt="${data[product].altTxt}">
              <h3 class="productName">${data[product].name}</h3>
              <p class="productDescription">${data[product].description}</p>
            </article>
            `

    }
});



        
    

