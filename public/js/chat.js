var params = new URLSearchParams(window.location.search);

var nombre = params.get('nombre');
var sala = params.get('sala');


// referencias de jQuery
var divUsuarios = document.getElementById('divUsuarios');
var formEnviar = document.getElementById('formEnviar');
var txtMensaje = document.getElementById('txtMensaje');
var divChatbox = document.getElementById('divChatbox');

document.addEventListener("touchstart", function () { }, true)

function dateToday() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;

    return today;
}

// Funciones para renderizar usuarios
function renderizarUsuarios(personas) { // [{},{},{}]

    console.log(personas);

    var html = '';

    html += '<h3><li class="text-center">';
    html += '    <a href="javascript:void(0)" class="active"> CHAT <span> ' + '<br>' + params.get('sala') + '</span></a>';
    html += '</li></h3>';

    for (var i = 0; i < personas.length; i++) {


        html += `          
        
        </br>
        <div class="flex-grow chat_list active_chat">
          <div class="chat_people">
            <div class="chat_img"> <img class="roudned" src="../assets/user.png" alt="sunil"> </div>
            <div class="chat_ib">
              <li class="">
              <a data-id="${personas[i].id}" href="javascript:void(0)">
              ${personas[i].nombre}
              <small class="text-success">online</small></span>
              <p class="textR">${dateToday()}</p>
              </li>
            </div>
          </div>
          </div>
        
        
        </div>`


    }

    document.getElementById("divUsuarios").innerHTML = html


}


function renderizarMensajes(mensaje, yo) {

    var html = '';
    var fecha = new Date(mensaje.fecha);
    var hora = fecha.getHours() + ':' + (fecha.getMinutes() < 10 ? '0' : '') + fecha.getMinutes();

    var adminClass = 'info';
    if (mensaje.nombre === 'Admin') {
        adminClass = 'danger';
    }


    if (yo) {

        html += '<li class="message chat_list incoming_chat">';
        html += '    <div class="chat-content">';
        html += '    <div id="photo" style="text-align: left">';
        html += '    <img style="vertical-align:middle" class="img-circle" src="../assets/user.png" alt="sunil">';
        html += '        <span style="vertical-align:middle"><b>' + mensaje.nombre + '</b></span>';
        html += '        </div>';
        html += '    <div id="photo" style="text-align: left">';
        html += '        <span style="vertical-align:middle">' + mensaje.mensaje + '</span>';
        html += '    <span class="chat-time fontHour" style="vertical-align:middle"> - ' + hora + '</span>';
        html += '        </div>';
        html += '        </div>';
        html += '</li>';

    } else {



        if (mensaje.nombre !== 'Admin') {
            html += '<li class="message chat_list outcoming_chat">';
            html += '    <div class="chat-content">';
            html += '    <div id="photo" style="text-align: right">';
            html += '    <img style="vertical-align:right" class="img-circle" src="../assets/user.png" alt="sunil">';
            html += '        <span style="vertical-align:right"><b>' + mensaje.nombre + '</b></span>';
            html += '        </div>';
            html += '    <div id="photo" style="text-align: right">';
            html += '        <span style="vertical-align:right">' + mensaje.mensaje + '</span>';
            html += '    <span class="chat-time fontHour" style="vertical-align:right"> - ' + hora + '</span>';
            html += '        </div>';
            html += '        </div>';
            html += '</li>';


        } else if (mensaje.nombre == 'Admin') {
            html += '<li class="message">';
            html += '    <div class="chat-content">';
            html += '    <div id="photo" style="text-align: center">';
            html += '    <img style="vertical-align:center" class="img-circle" src="../assets/info.jpg" alt="sunil">';
            html += '        <span style="vertical-align:center">' + mensaje.nombre + '</span>';
            html += '        </div>';
            html += '    <div id="photo" style="text-align: center">';
            html += '        <span style="vertical-align:center">' + mensaje.mensaje + '</span>';
            html += '    <span class="chat-time fontHour" style="vertical-align:center"> - ' + hora + '</span>';
            html += '        </div>';
            html += '        </div>';
            html += '</li>';


        }



    }


    divChatbox.insertAdjacentHTML("beforeend", html);

}


// Listeners
divUsuarios.addEventListener('click a', function () {

    var id = document.querySelector(this).data('id');

    if (id) {
        console.log(id);
    }

});

formEnviar.addEventListener('submit', function (e) {

    e.preventDefault();

    if (txtMensaje.value.trim().length === 0) {
        return;
    }

    socket.emit('crearMensaje', {
        nombre: nombre,
        mensaje: txtMensaje.value
    }, function (mensaje) {
        document.getElementById('txtMensaje').value
        renderizarMensajes(mensaje, true);

    });

    //Delete text
    txtMensaje.value = '';




    setTimeout(function(){
        setInterval(function () {
            var elem = document.getElementById('msg_history');
            elem.scrollTop = elem.scrollHeight;
        }, 0);
    }, 10000)


  

});


