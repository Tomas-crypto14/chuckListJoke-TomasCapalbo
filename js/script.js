const button = document.getElementById("fetchJoke");
const borrar = document.getElementById("deleteJoke")
const lista = document.getElementById("jokeList");
function chiste(){
    fetch (`https://api.chucknorris.io/jokes/random`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
    const valor = document.createElement("p");
    const creabutton = document.createElement("button");
    creabutton.setAttribute("id", data.id);
    valor.setAttribute("id", "valor");
    valor.innerHTML = data.value;
    creabutton.innerHTML = "Eliminar";
    creabutton.style.background = "Red";
    const container = document.getElementById("jokeList");
    container.appendChild(valor);
    container.appendChild(creabutton);
    
    //Local Storage
    //Se tiene que crear una variable de array para poder meter los datos.
    //Si hay un error de "Unexpected Token", eso quiere decir que ha habido un valor
    //fuera de JSON, hay que ir a Application y eliminarlo.
    let array = JSON.parse(localStorage.getItem("Chiste")) || [];
    array.push({joke: data.value, id: data.id});
    localStorage.setItem("Chiste", JSON.stringify(array));
    console.log(array);
        //Evento para eliminar el valor array del chiste.
    creabutton.addEventListener("click", (event) => {
        const idABorrar = event.target.id;
        valor.remove();
        creabutton.remove();
        //Ese for es para eliminar objetos en un array
        const newArray = [];
        for (let i = 0; i < array.length; i++) {
            if(array[i].id !== idABorrar){
                //console.log(array[i].id);
                newArray.push(array[i]);
            }
        }
        console.log(newArray);
        localStorage.setItem("Chiste", JSON.stringify(newArray));
        //array = newArray;
     });
    })
    
}
button.addEventListener("click", chiste);
//document.addEventListener("DOMContentLoaded", chiste);

//creabutton.addEventListener("click", () => eliminar);

function borrartodo(){
    localStorage.clear();
}
borrar.addEventListener("click", () => borrartodo());
