const button = document.getElementById("fetchJoke");
const lista = document.getElementById("jokeList");
function chiste(){
    fetch (`https://api.chucknorris.io/jokes/random`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
    const valor = document.createElement("p");
    const creabutton = document.createElement("button");
    valor.innerHTML = data.value;
    creabutton.innerHTML = "Eliminar";
    creabutton.style.background = "Red";
    const container = document.getElementById("jokeList");
    container.appendChild(valor);
    container.appendChild(creabutton);
    //Funcion secundaria para borrar el chiste
    //Como no aqui pide fetch secundario para hacer funciones secundarias, para lo de
    //eliminar se hace de esa manera
    //Ese click de addEventListener llama al boton de creabutton
    
    //Local Storage
    //Se tiene que crear una variable de array para poder meter los datos.
    //Si hay un error de "Unexpected Token", eso quiere decir que ha habido un valor
    //fuera de JSON, hay que ir a Application y eliminarlo.
    let array = JSON.parse(localStorage.getItem("Chiste")) || [];
    array.push(data.value);
    localStorage.setItem("Chiste", JSON.stringify(array));
    console.log(array);

    creabutton.addEventListener("click", () => {
        valor.remove();
        creabutton.remove();
        //Ese for es para eliminar objetos en un array
        for (i = 0; i <= array.length; i++ ){
            localStorage.removeItem(array[i]);
            localStorage.setItem("Chiste", JSON.stringify(array));
        }
     });
    })
    
}
button.addEventListener("click", chiste);


//creabutton.addEventListener("click", () => eliminar);