const animationScreen = document.getElementById('animation-screen');
const chatScreen = document.getElementById('chat-screen');
const chatBox = document.getElementById('chat-box');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');

const PAWAN_API_KEY = "pk-NbUjiNvMCqsXBrDsElltVlskjLkWaWhfeonwAvixkVFIBxtw"; // Your updated Pawan AI key
const API_URL = "https://api.pawan.krd/api/v1/chat/completions";

setTimeout(() => {
    document.getElementById('creator').style.opacity = 1;
}, 1500);

setTimeout(() => {
    animationScreen.style.opacity = 0;
    animationScreen.style.transition = "opacity 1s ease";
    setTimeout(() => {
        animationScreen.style.display = "none";
        chatScreen.classList.remove('hidden');
    }, 1000);
}, 3500);

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = userInput.value.trim();
    if (!message) return;
    appendMessage(message, 'user-message');
    userInput.value = '';
    const botReply = await getBotResponse(message);
    appendMessage(botReply, 'bot-message');
});

function appendMessage(text, className) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', className);
    messageDiv.textContent = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function getBotResponse(message) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${PAWAN_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt",
                messages: [{ role: "user", content: message }]
            })
        });

        const data = await response.json();
        if (data && data.choices && data.choices.length > 0) {
            return data.choices[0].message.content;
        } else {
            console.error("Unexpected response format:", data);
            return "Sorry, I couldn't process that.";
        }
    } catch (error) {
        console.error(error);
        return "Oops! Something went wrong.";
    }
}
