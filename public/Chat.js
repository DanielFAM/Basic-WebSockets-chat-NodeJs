const socket = io(); //codigo de front para enviar eventos desde webSocket

let message = document.getElementById('message');
let username = document.getElementById('username');
let send = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');
let stat = document.getElementById('status');

send.addEventListener('click', function(){
    stat.innerHTML = '';
    if(username.value == ''){
        stat.innerHTML = 'Insert your username';
    }else if(message.value == '') {
    }else{
        socket.emit('chat:message',{
            message: message.value,
            username : username.value
        });
    }

    message.value='';
});

message.addEventListener('keypress', function(){
    socket.emit('chat:typing', username.value);
});

socket.on('chat:message', function(data){
    actions.innerHTML = '';
    output.innerHTML += `<p>
        <strong>${data.username}</strong>: ${data.message}
    </p>`
});

socket.on('chat:typing', function(data) {
    actions.innerHTML = `<p><em>${data} is typing... </em></p>`
});