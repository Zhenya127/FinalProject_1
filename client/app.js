const localUrl = 'http://127.0.0.1:8000/generate-reply/';
/** TODO add remote url when the project is deployed and point currentUrl to it */
const remoteUrl = '';
let currentUrl = localUrl;

const chatBox = document.getElementById('chat-box');
const chatInput = document.getElementById('chat-input');

function sendMessage() {
    if (chatInput.value?.length > 0) {
        fetch(currentUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ utterance: chatInput.value })
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
            });
    }
}
