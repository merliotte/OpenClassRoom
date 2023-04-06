addArticles();
//
async function addArticles() {
    await fetch('http://localhost:3000/api/products')
        .then((res) => res.json())
        .then((data) => {
            console.table(data);
            for (let cpt = 0; cpt < data.length; cpt++) {
                const element = data[cpt];
                document.querySelector('#items').innerHTML += `
                    <a href="./product.html?id=${element._id}">
                        <article>
                            <img src="${element.imageUrl}" alt="${element.altTxt}">
                            <h3 class="productName">${element.name}</h3>
                            <p class="productDescription">${element.description}</p>
                        </article>
                    </a>`;
            }
        })
        .catch((error) => {
            console.log('Erreur de connexion avec le serveur : ', error);
        });
}