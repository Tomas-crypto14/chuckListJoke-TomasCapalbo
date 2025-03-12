const button = document.getElementById("fetchJoke");
const lista = document.getElementById("jokelist");
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
    creabutton.addEventListener("click", () => {
        valor.remove();
        creabutton.remove();
        localStorage.removeItem("Chiste");
     });
    //Local Storage
    let array = JSON.parse(localStorage.getItem("Chiste")) || [];
    array.push(data.value);
    localStorage.setItem("Chiste", JSON.stringify(array));
    })
    
}
button.addEventListener("click", chiste);

/*function storage(){
    fetch (`https://api.chucknorris.io/jokes/random`)
    .then((response) => response.json())
    .then((data) => {
        localStorage.setItem("Chiste", data.value);
    })
}*/

//creabutton.addEventListener("click", () => eliminar);