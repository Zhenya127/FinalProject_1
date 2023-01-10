const localUrl = 'http://127.0.0.1:8000/generate-reply/';
/** TODO add remote url when the project is deployed and point currentUrl to it */
const remoteUrl = '';
let currentUrl = localUrl;

const chatBox = document.getElementById('chat-box');
const chatInput = document.getElementById('chat-input');

function sendMessage() {    
    const userInput = chatInput.value;
    addMessageToChat(userInput, 'client');
    if (userInput?.length > 0) {
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
            });
    }
}

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
