const url = "http://localhost:3000/api/products "; 
const items = document.getElementById("items");

const affichageItems = () => {
fetch(url)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
    
        for(let i = 0;  in data) {
            items.innerHTML+= `
            <a href="./product.html?id=${product._id}">
            <article>
              <img src=".../images/" alt="Lorem ipsum dolor sit amet, Kanap name1">
              <h3 class="productName">Kanap name1</h3>
              <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
            </article>
          </a>
            `
        }
    })  
    
}

affichageItems()