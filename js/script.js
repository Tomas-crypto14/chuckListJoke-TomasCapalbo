//Función para pintar la cajita del chiste junto con el boton
//Función para pintar los gráficos
const button = document.getElementById("fetchJoke");
const borrar = document.getElementById("deleteJoke")
const lista = document.getElementById("jokeList");
let grafico = null; //Variable para almacenar la instancia, null hace que no se queje si eliminamos el chart.
function storage(){
    //Destruye la gráfica si existe, se recomienda el let de este valor desde fuera
    //de la función porque el let para llamar a la función del if con el mismo nombre
    if (grafico){
        grafico.destroy();
    }
}
function chiste(){
    fetch (`https://api.chucknorris.io/jokes/random`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
    //Los valores tienen que tener nombres descriptivos.
    const valorchiste = document.createElement("p");
    const creabuttonchiste = document.createElement("button");
    creabuttonchiste.setAttribute("id", data.id);
    valorchiste.setAttribute("id", "valor");
    valorchiste.innerHTML = data.value;
    creabuttonchiste.innerHTML = "Eliminar";
    creabuttonchiste.style.background = "Red";
    const container = document.getElementById("jokeList");
    container.appendChild(valorchiste);
    container.appendChild(creabuttonchiste);

    //Gráfica
        //Destruye la gráfica si existe, se recomienda el let de este valor desde fuera
        //de la función porque el let para llamar a la función del if con el mismo nombre
    storage();

    //Local Storage
    //Se tiene que crear una variable de array para poder meter los datos.
    //Si hay un error de "Unexpected Token", eso quiere decir que ha habido un valor
    //fuera de JSON, hay que ir a Application y eliminarlo.
    almacenamientochistes(data);
    let array = JSON.parse(localStorage.getItem("Chiste")) || [];
    //array.push({joke: data.value, id: data.id});
    //localStorage.setItem("Chiste", JSON.stringify(array));
    //Esos dos valores, labels y lengths junto con array.map sirven para recorrer el array y meter las gráficas con los
    //chistes actuales que hay en el LocalStorage.
    almacenamientografica(data);
    //labels = array.map(chiste => chiste.id);
    //lengths = array.map(chiste => chiste.joke.length);
    console.log(array);
        //Evento para eliminar el valor array del chiste.
    
    creabuttonchiste.addEventListener("click", (event) => {
        //Se tiene que recargar el array cuando se elimina un chiste.
        let array = JSON.parse(localStorage.getItem("Chiste")) || [];
        const idABorrar = event.target.id;
        valorchiste.remove();
        creabuttonchiste.remove();
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

function almacenamientochistes(chiste){
    let array = JSON.parse(localStorage.getItem("Chiste")) || [];
    array.push({joke: chiste.value, id: chiste.id});
    localStorage.setItem("Chiste", JSON.stringify(array));
    //almacenamientografica();
}


function almacenamientografica(){
    //storage();
    let array = JSON.parse(localStorage.getItem("Chiste")) || [];
    labels = array.map(chiste => chiste.id);
    lengths = array.map(chiste => chiste.joke.length);
    const canva = document.getElementById("GraficoChiste").getContext('2d');

    const datos = {
        labels: labels,
        datasets: [{
            label: 'Longitud de los chistes',
            data: lengths,
            backgroundColor: [Math.floor(Math.random() * 16)],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    }

    grafico = new Chart(canva, {
        type: 'bar',
        data: datos,
        options: {
            scales: {
                x: {
                    beginAtZero: true,
                },
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

//document.addEventListener("DOMContentLoaded", chiste);

//creabutton.addEventListener("click", () => eliminar);

/*function cargarChistes(chiste){
    let array = JSON.parse(localStorage.getItem("Chiste")) || [];
    array.push(chiste);
    localStorage.setItem("Chiste", JSON.stringify(array));

}*/
//La función borrartodo tiene que tener un while porque tiene que recorrer un bucle
//para borrar todos los chistes, el firstChild en el jokeList son los elementos hijo del const padre
//que es jokeList, con el while, recorrerá un bucle para borrar todos los chistes, incluidos
//los gráficos.
function borrartodo(){
    localStorage.clear();
    const jokeList = document.getElementById("jokeList");
    while (jokeList.firstChild) {
        jokeList.removeChild(jokeList.firstChild);
    }
    storage();
}
borrar.addEventListener("click", () => borrartodo());
