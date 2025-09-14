const animationScreen = document.getElementById('animation-screen');
const chatScreen = document.getElementById('chat-screen');
const chatBox = document.getElementById('chat-box');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');

const HUGGING_FACE_API_KEY = "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"; // Replace this with your API key
const MODEL = "gpt2"; // Example model

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
        const response = await fetch(`https://api-inference.huggingface.co/models/${MODEL}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${HUGGING_FACE_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                inputs: message
            })
        });

        const data = await response.json();
        if (data && data.length > 0 && data[0].generated_text) {
            return data[0].generated_text;
        } else {
            return "Sorry, I couldn't process that.";
        }
    } catch (error) {
        console.error(error);
        return "Oops! Something went wrong.";
    }
}