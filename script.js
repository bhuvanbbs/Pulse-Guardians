const splash = document.getElementById('splash-screen');
const credits = document.getElementById('credits');
const chatContainer = document.getElementById('chat-container');
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');

// Predefined disease knowledge base
const knowledgeBase = {
    "covid": "COVID-19 is a respiratory illness caused by the coronavirus. Symptoms include fever, cough, and shortness of breath.",
    "diabetes": "Diabetes is a condition where the body cannot properly process blood sugar. Regular exercise and a balanced diet can help manage it.",
    "malaria": "Malaria is a mosquito-borne disease causing fever, chills, and sweating. Use mosquito nets and avoid stagnant water.",
    "hypertension": "Hypertension, or high blood pressure, increases the risk of heart disease. Monitoring blood pressure and reducing salt intake are beneficial.",
    "flu": "Flu is a viral infection that affects the respiratory system. Get vaccinated annually and maintain good hygiene.",
    "dengue": "Dengue is transmitted by mosquitoes and causes severe fever, muscle pain, and rash. Prevent mosquito breeding around you.",
    "chickenpox": "Chickenpox is a contagious disease causing itchy rashes and blisters. Vaccination can prevent severe outbreaks."
};

// Splash screen -> Credits -> Chatbot sequence
setTimeout(() => {
    // Fade out splash
    splash.style.opacity = 0;
    setTimeout(() => {
        splash.classList.add('hidden');
        credits.classList.remove('hidden');
        credits.style.opacity = 1;

        // Show credits for 2s then transition to chatbot
        setTimeout(() => {
            credits.style.opacity = 0;
            setTimeout(() => {
                credits.classList.add('hidden');
                chatContainer.classList.remove('hidden');
            }, 1000);
        }, 2000);

    }, 1000);
}, 2000); // Splash screen duration

// Chatbot message logic
function sendMessage() {
    const message = userInput.value.trim().toLowerCase();
    if (!message) return;

    addMessage(userInput.value, 'user');
    userInput.value = '';

    let reply = "Sorry, I don't have information on that disease.";

    for (let key in knowledgeBase) {
        if (message.includes(key)) {
            reply = knowledgeBase[key];
            break;
        }
    }

    addMessage(reply, 'bot');
}

function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    msgDiv.textContent = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}
