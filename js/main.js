console.log('App is alive!')

//Store name of currently selected channel
channels = [];
messages = [];
let selectedChannel;

// get browser language for formatting of time stamp
const browserLanguage = navigator.language || navigator.userLanguage; 

function init() {
    console.log("App is initialized");
    getChannels();
    getMessages();
    loadMessagesIntoChannel();
    displayChannels(); 
    loadEmojis();
    document.getElementById("send-button").addEventListener("click", sendMessage);
    /*document.getElementById("emoticon-button").addEventListener("click", toggleEmojiArea);
    document.getElementById("close-emoticon-button").addEventListener("click", toggleEmojiArea); */
}

function getChannels (){
    channels = mockChannels;
}

function getMessages (){
    messages = mockMessages;
}

// load existing messages into respective channel
function loadMessagesIntoChannel() {
    channels.forEach(channel => {
        messages.forEach(message => {
            if (message.channel === channel.id) {
                channel.messages.push(message)
            }
        })
    })
}


// display channels in channel area 
function displayChannels() {
    const favoriteList = document.getElementById('favorite-channels');
    const regularList = document.getElementById('regular-channels');
    favoriteList.innerHTML = ""
    regularList.innerHTML = ""
    channels.forEach(channel => {
        const currentChannelHtmlString = `  <li id="` + channel.id + `" onclick="switchChannel(this.id)">
                                                <i class="material-icons">group</i>
                                                <span class="channel-name">` + channel.name + `</span>
                                                <span class="timestamp">`+ channel.latestMessage() + `</span>
                                            </li>`
        if (channel.favorite) {
            favoriteList.innerHTML += currentChannelHtmlString;
        } else {
            regularList.innerHTML += currentChannelHtmlString;
        }
    })
    // always add selected class to current channel
    if (!!selectedChannel) {
        document.getElementById(selectedChannel.id).classList.add("selected")
    }
}

function loadEmojis () {

}
function Channel(name) {
    this.id = Math.random().toString(36).substr(2, 10);
    this.name = name;
    this.favorite = false;
    this.messages = [];
}

// Create new channel
function createChannel() {
    let channelName = prompt("Enter channel name", "... channel name");
    const newChannel = new Channel (channelName)
    console.log("New channel name: ", channelName);
    getChannels();
    mockChannels.push(newChannel)
    displayChannels();
    showMessages();
}
// Event listener for Create new channel
document.getElementById('fab').addEventListener('click', createChannel);

// Object method that returns the date of the latest message (to display it in channel section)
Channel.prototype.latestMessage = function() {
    //if messages exist, display timestamp
    if (!!this.messages.length){
        const latest = new Date(Math.max(...this.messages.map(message => message.createdOn)));
        // if message is from yesterday or older, display date, else display time
        if (new Date().getDate() - latest.getDate() > 1) {
            return latest.toLocaleDateString(browserLanguage, {year:"numeric", month:"numeric", day: "numeric"})
        } else {
            return latest.toLocaleTimeString(browserLanguage, {hour:"numeric", minute:"numeric"})
        }
    } else {
        return "No Messages"
    }
}

function switchChannel(selectedChannelID) {
    console.log("selected channel with id: " + selectedChannelID)
    if (!!selectedChannel){
        document.getElementById(selectedChannel.id).classList.remove("selected")
    }
    document.getElementById(selectedChannelID).classList.add("selected");
    channels.forEach((channel) => {
        if (channel.id === selectedChannelID) {
            selectedChannel = channel;
        }
    });
    // hide user prompt and show input area the first time a user selects a channel
    if(!!document.getElementById("select-channel")){
        document.getElementById("select-channel").style.display = "none";
        document.getElementById("input-area").style.display = "flex";
        document.getElementById("message-area-header").style.display = "flex";
    }
    showHeader();
    showMessages();
}

function toggleFavorite(){
    if (selectedChannel.favorite == false) {
        selectedChannel.favorite = true;
    } else if (selectedChannel.favorite == true) {
        selectedChannel.favorite = false;
    }
    showHeader();
    displayChannels();
}
// Event listener for Favorite button
document.getElementById('favorite-button').addEventListener('click', toggleFavorite);

function showHeader(){
    document.getElementById("message-area-header").getElementsByTagName('h1')[0].innerHTML = selectedChannel.name;
    document.getElementById('favorite-button').innerHTML = (selectedChannel.favorite)? "favorite" : "favorite_border";
}

// Show the messages of the selected channel
/** 
 * Message Constructor Function
 * @param {string} user - Name of sender.
 * @param {boolean} own - Own (outgoing) message or incoming.
 * @param {string} text - Message text.
 * @param {string} channelID - ID of channel in which message is sent.
 */
function Message(user, own, text, channelID) {
    this.createdBy = user;
    this.createdOn = new Date (Date.now());
    this.own = own;
    this.text = text;
    this.channel = channelID;
}
// Object method that returns the if message is from yesterday or older
Message.prototype.yesterdayOrOlder = function() {
    return new Date().getDate() - this.createdOn.getDate() > 1
}

// Event Listener: New message will be sent if user clicks send button or presses enter.
// send button is grayed out if there is no input provided
document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('message-input').onkeyup = function(e){
    if (!!document.getElementById('message-input').value) {
        document.getElementById('send-button').style.color = "#00838f"
    } else {
        document.getElementById('send-button').style.color = "#00838f54";
    }
    if(e.keyCode == 13){
        sendMessage()
    }
};

// simple sort function: insert current channel at [0] in channels array and call it if new message is sent
function sortChannels() {
    //remove first
    channels = channels.filter(channel => channel.id !== selectedChannel.id);
    //insert
    channels.unshift(selectedChannel);
}

 // Check if input is provided, send message, and clear input. Return if not.
function sendMessage() {
    const text = document.getElementById('message-input').value;
    if (!!text) {
        const myUserName = "Samuel";
        const own = true;
        const channelID = selectedChannel.id;
        const message = new Message (myUserName, own, text, channelID)
        console.log("New message: ", message);
        selectedChannel.messages.push(message);
        document.getElementById('message-input').value = '';
        document.getElementById('send-button').style.color = "#00838f54";
        showMessages();
        sortChannels();
        displayChannels();
        receiveEchoMessage();
    } else {
        return
    }
}

// Show the messages of the selected channel
function showMessages() {
    const chatArea = document.getElementById('chat-area');
    chatArea.innerHTML = ""
    selectedChannel.messages.forEach(message => {
        // if message is older than 24 hours, display full date
        let messageTime;
        if (message.yesterdayOrOlder()) {
            messageTime = message.createdOn.toLocaleTimeString(browserLanguage, {year:"numeric", month:"numeric", day:"numeric", hour: "numeric", minute: "numeric"});
        } else {
            messageTime = message.createdOn.toLocaleTimeString(browserLanguage, {hour: "numeric", minute: "numeric"});
        }

        let currentMessageHtmlString;
        if (message.own){
            currentMessageHtmlString =   `  <div class="message outgoing-message">
                                                <div class="message-wrapper">
                                                    <div class="message-content">
                                                        <p>` + message.text + `</p>
                                                    </div>
                                                    <i class="material-icons">account_circle</i>
                                                </div>
                                                <span class="timestamp">`+ messageTime + `</span>
                                            </div>`;
        } else {
            currentMessageHtmlString =   `  <div class="message incoming-message">
                                                <div class="message-wrapper">
                                                    <i class="material-icons">account_circle</i>
                                                    <div class="message-content">
                                                        <h3>` + message.createdBy + `</h3>
                                                        <p>` + message.text + `</p>
                                                    </div>
                                                </div>
                                                <span class="timestamp">`+ messageTime + `</span>
                                            </div>`;
        }
        chatArea.innerHTML += currentMessageHtmlString;
    })
    chatArea.scrollTop = chatArea.scrollHeight;
    //update timestamp in channel area
    document.getElementById(selectedChannel.id).querySelector(".timestamp").innerHTML = selectedChannel.latestMessage();
}

// get an echo message
function receiveEchoMessage() {
    const userName = "Lorenz";
    const own = false;
    const text = "You wrote: " + selectedChannel.messages.slice(-1)[0].text;
    const channelID = selectedChannel.id;
    const message = new Message (userName, own, text, channelID);
    selectedChannel.messages.push(message);
    // set timeout for a more natural response time
    setTimeout(showMessages, 1500)
}

// --------------------- Emojis ----------------------------

// load emojis into div
/*
function loadEmojis() {
    for (let i = 0; i < emojis.length; i++) {
        document.getElementById("emoji-list").innerHTML += `<span class="button">` + emojis[i] + `</span>`
    }
    const emojisInArea = document.getElementById('emoji-list').childNodes 
    for (let i = 0; i < emojisInArea.length; i++) {
        emojisInArea[i].addEventListener('click', function(){
            document.getElementById('message-input').value += this.innerHTML;
            document.getElementById('send-button').style.color = "#00838f";
        });
    }
}

document.getElementById('emoticon-button').addEventListener('click', toggleEmojiArea);
document.getElementById('close-emoticon-button').addEventListener('click', toggleEmojiArea);

function toggleEmojiArea(){
    const emojiArea = document.getElementById('emoji-area');
    const chatArea = document.getElementById('chat-area');
    emojiArea.classList.toggle('toggle-area');
    chatArea.style.height = (emojiArea.classList.contains('toggle-area')) ? "calc(100vh - 132px - 250px)" : "calc(100vh - 132px)";
    chatArea.scrollTop = chatArea.scrollHeight;   
}   */