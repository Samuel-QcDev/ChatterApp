console.log('App is alive!')

//Store name of currently selected channel 
let selectedChannel = channel1;

function switchChannel(channel) {
    console.log("selected channel with name: " + channel.name);
    document.getElementById(selectedChannel.id).classList.remove("selected");
    document.getElementById(channel.id).classList.add("selected")
    selectedChannel = channel;
    showHeader();
}

function showHeader() {
    //display currently selected Channel in App Bar
    document.getElementById('channelName').innerHTML = selectedChannel.name;
    document.getElementById('favorite-button').innerHTML = (selectedChannel.favorite)? "favorite" : "favorite_border";
}

function sendMessage() {
    let messageText = document.getElementById('message-input').value;
    console.log("The following message was send: " + messageText);
    let messageString;
    messageString = '<div class="message outgoing-message"> <div class="message-wrapper"> <div class="message-content"> <p>' + messageText + '</p> </div> <i class="material-icons">account_circle</i> </div> <span class="timestamp">11:45</span> </div>';
    document.getElementById('chat-area').innerHTML = messageString;
    document.getElementById('message-input').value = '';
}