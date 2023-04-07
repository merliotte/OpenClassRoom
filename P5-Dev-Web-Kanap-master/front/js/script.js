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
            window.location.href = `<a href="./product.html?id=${data[product]._id}">
            <article>
              <img src="${data[product].imageUrl}" alt="${data[product].altTxt}">
              <h3 class="productName">${data[product].name}</h3>
              <p class="productDescription">${data[product].description}</p>
            </article>`
        }
        
    
})
.catch((error) => {
          console.log(error);
          window.alert("Désolé nous ne trouvons pas votre canapé.")
        });

// const products = document.querySelectorAll('.product');

// // Parcourir tous les éléments "product" et ajouter un événement "click" à chacun
// products.forEach(product => {
//   product.addEventListener('click', () => {
//     // Récupérer l'identifiant de l'article sélectionné à partir de l'URL
//     const productId = product.querySelector('a').href.split('?id=')[1];

//     // Rediriger l'utilisateur vers la page de l'article en question
//     window.location.href = `./product.html?id=${productId}`;
//   });
// });
