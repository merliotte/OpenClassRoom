// Récupération des pièces depuis l'API
    const dataApi =  fetch("http://localhost:3000/api/products");
    document.getElementById("items");
    // Transformation des pièces en JSON
    // Objet JSON
        dataApi.then(async(responseData) => {
            const response = await responseData.json();
            console.table(response);
        //dedede dede
        // .catch(err){
        // console.log(err);
    }
);
        
        
    

