

let nombre = document.getElementById('nombre');
let sala = document.getElementById('sala');
let checkNombre = document.getElementById('checkNombre');
let checkSala = document.getElementById('checkSala');


function checkInput() {
    console.log("nombre " + nombre)

    if ((nombre.value || sala.value) == '') {
        checkNombre.innerHTML = `<div class="alert alert-danger" role="alert">
    Please enter a Username
  </div>`

        checkSala.innerHTML = `<div class="alert alert-danger" role="alert">
  Please enter a Chat Room
</div>`

    } else if ((!nombre.value) == '') {
        checkNombre.innerHTML = '';

    } else if ((!sala.value) == '') {

        checkSala.innerHTML = '';
    } else if ((nombre.value) == '') {
        console.log('vacio')
        checkNombre.innerHTML = `<div class="alert alert-danger" role="alert">
    Please enter a Username
  </div>`
    } else if ((sala.value) == '') {
        checkSala.innerHTML = `<div class="alert alert-danger" role="alert">
  Please enter a Chat Room
</div>`
    }

}

