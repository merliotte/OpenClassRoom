const url = "http://localhost:3000/api/products"; 

 fetch(url)
.then( (response) => response.json())
.then ((data) => {

    // for(let product in data) {
        // document.getElementById("items").innerHTML+= `
    
        // // <a href="./product.html?id=${data[product]._id}">
        // //     <article>
        // //       <img src="${data[product].imageUrl}" alt="${data[product].altTxt}">
        // //       <h3 class="productName">${data[product].name}</h3>
        // //       <p class="productDescription">${data[product].description}</p>
        // //     </article>
        // //     `
        //     window.location.href = `<a href="./product.html?id=${data[product]._id}">
        //     <article>
        //       <img src="${data[product].imageUrl}" alt="${data[product].altTxt}">
        //       <h3 class="productName">${data[product].name}</h3>
        //       <p class="productDescription">${data[product].description}</p>
        //     </article>`
        

// .catch((error) => {
//           console.log(error);
//           window.alert("Désolé nous ne trouvons pas votre canapé.")
//         });

 // Méthode For Each
data.forEach(kanap => { 
  document.getElementById("items").innerHTML+= `
    
        <a href="./product.html?id=${kanap._id}">
            <article>
              <img src="${kanap.imageUrl}" alt="${kanap.altTxt}">
              <h3 class="productName">${kanap.name}</h3>
              <p class="productDescription">${kanap.description}</p>
            </article>
            `
  });
}); 


