const localUrl = 'http://127.0.0.1:8000/generate-reply/';
/** TODO add remote url when the project is deployed and point currentUrl to it */
const remoteUrl = '';
let currentUrl = localUrl;

const chatBox = document.getElementById('chat-box');
const chatInput = document.getElementById('chat-input');

/** Send request to the server and add response to chat. */
function sendMessage() {
    const userInput = chatInput.value;
    chatInput.value = '';
    if (userInput?.length > 0) {
        startLoading();
        addMessageToChat(userInput, 'client');
        fetch(currentUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ utterance: userInput })
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.reply) {
                    addMessageToChat(res.reply, 'response');
                }
            })
            .catch((err) => {
                console.error(err);
            })
            .finally((res) => {
                endLoading();
            });
    }
}

/** Append message to the chat box */
function addMessageToChat(message, side) {
    const node = document.createElement('li');
    const textNode = document.createTextNode(message);

    node.classList.add('message');

    if (side === 'client') {
        node.classList.add('client-message');
    } else if (side === 'response') {
        node.classList.add('response-message');
    }

    node.appendChild(textNode);
    chatBox.appendChild(node);
}

/** Enable loading status and styles */
function startLoading() {
    chatInput.placeholder = 'Loading...';
    chatInput.disabled = true;
}

/** Disable loading status and styles */
function endLoading() {
    chatInput.placeholder = '';
    chatInput.disabled = false;
}

// send message on Enter
chatInput.addEventListener('keydown', (event) => {
    event.stopPropagation();
    if (event.code === 'Enter') {
        sendMessage();
    }
});
