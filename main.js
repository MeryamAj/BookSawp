// async function chargerDemandes() {
//   const reponse = await fetch('http://127.0.0.1:8000/api/v1/exchange-requests?status=open');
//   if (!reponse.ok) throw new Error(`Erreur HTTP ${reponse.status}`);
//   const resultat = await reponse.json();

function chargerDemandes()
{
    fetch('http://127.0.0.1:8000/api/v1/exchange-requests?status=open').then((respons) =>
    {
        if(!respons.ok){
            throw new Error(`Erreur HTTP ${respons.status}`);
            
        }
        return respons.json();
    }).then((resultat) =>{

        console.log(resultat.data);
        // const arryofdata = resultat.data;
        afficher(resultat.data);
       recherche(resultat.data);
        temporair(resultat.data);
        permanent(resultat.data);
        tout(resultat.data);


}).catch(error =>{
        console.log(error);
    });
    
//   console.log(resultat.data);
}

function recherche(array)
{
    let recherchee = document.getElementById("serch");

    recherchee.addEventListener("input", (event) =>{
        event.preventDefault();
        let inpuut = recherchee.value;

        let result = array.filter((ele) => ele.book.title.toLowerCase().includes(inpuut.toLowerCase()) || ele.book.author.toLowerCase().includes(inpuut.toLowerCase()))
         const container = document.querySelector("#container");
         container.innerHTML = "";
         afficher(result);
   

    }) 
}
function afficher(array)
{
    const container = document.querySelector("#container");
          array.forEach(element => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML+= `<p><b>${element.owner.name}</b> <span class="tag">${element.exchange_type}</span></p>
        <div class="books">
          <div class="book-box">
            <div class="cover green">
             
             </div>
            <h4>${element.book.title}</h4>
            <small>${element.book.author}</small>
          </div>
          <div class="book-box">
            <div class="cover red" >
            
            </div>
            <h4>${element.offers[0].offered_book.title}</h4>
            <small>${element.offers[0].offered_book.author}</small>
          </div>
        </div>
        <p>Durée : ${element.end_date}</p>
        <a class="link" href="#">Voir la demande →</a>`

        container.appendChild(card);



    
});
}
function temporair(array)
{
     const btemporair = document.getElementById("temporair");
     btemporair.addEventListener("click",(event) =>{

        event.preventDefault();
        let result = array.filter((element) => element.exchange_type === "temporary");
        const container = document.querySelector("#container");
         container.innerHTML = "";
         afficher(result);
        

     })

}
function permanent(array)
{
    const btpermanent = document.getElementById("definitif");
    btpermanent.addEventListener("click", (event) =>{
        event.preventDefault();
        let result = array.filter((element) => element.exchange_type === "permanent");
         const container = document.querySelector("#container");
         container.innerHTML = "";
         afficher(result);
    })

}
function tout(array)
{
    const btntout = document.getElementById("tout");
    btntout.addEventListener("click",(event) =>{
        event.preventDefault();
        afficher(array)

    })

}






chargerDemandes();


