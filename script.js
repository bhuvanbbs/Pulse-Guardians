const chatBox = document.getElementById('chat-box');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');

const OPENAI_API_KEY = "sk-ijklmnopuvwx1234ijklmnopuvwx1234ijklmnop"; // Replace this with your API key

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
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "You are a helpful assistant providing disease awareness and health advice." },
                    { role: "user", content: message }
                ],
                max_tokens: 150
            })
        });
        const data = await response.json();
        if (data.choices && data.choices.length > 0) {
            return data.choices[0].message.content;
        } else {
            return "Sorry, I couldn't find information on that.";
        }
    } catch (error) {
        console.error(error);
        return "Oops! Something went wrong.";
    }
}