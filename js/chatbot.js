// Global variable to store intents
let globalIntents = null;

// Class to manage chat history
class ChatHistory {
    constructor() {
        this.messages = [];
    }

    addMessage(message) {
        this.messages.push(message);
    }

    getHistory() {
        return this.messages;
    }
}

// Create an instance of ChatHistory
const historyMessages = new ChatHistory();

// Function for retrieving and processing JSON
function fetchJSON(url) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (Object.keys(data).length === 0 && data.constructor === Object) {
        throw new Error('Empty JSON or malformed JSON');
      }
      console.log(data);
      // Store intents globally
      globalIntents = data.intents;
      // Optional: Show welcome message
      showMessage("Hello! I'm the site's assistant! What would you like to be informed about?", 'bot');
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
      showMessage("Sorry, I'm having trouble connecting. Please refresh the page.", 'bot');
    });
}

// Function to process the user's message
function processMessage(intents, message) {
    let response = null;
    
    // Browse chatbot intentions
    for (const intent of intents) {
        for (const pattern of intent.patterns) {
            if (message.toLowerCase().includes(pattern.toLowerCase())) {
                // Select a random answer from the list
                response = intent.responses[Math.floor(Math.random() * intent.responses.length)];
                break; // Exit inner loop
            }
        }
        if (response) break; // Exit outer loop if response found
    }
    
    // Return response or fallback
    return response || "I'm sorry, I'm unable to answer this question. Please ask about our first four semesters' programs instead";
}

// Function to display messages in the chat box
function showMessage(message, type) {
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', type);
    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// New function to handle sending messages
function sendUserMessage() {
    if (!globalIntents) {
        showMessage("Please wait, I'm still loading...", 'bot');
        return;
    }
    
    const userInput = document.getElementById('user-input');
    const message = userInput.value.trim();
    
    if (message === "") return;
    
    showMessage(message, 'user');
    // Add user message to history
    historyMessages.addMessage({ message: message, sender: 'user' });
    
    const botResponse = processMessage(globalIntents, message);
    showMessage(botResponse, 'bot');
    // Add bot response to history
    historyMessages.addMessage({ message: botResponse, sender: 'bot' });
    
    userInput.value = "";
}

// Function to save messages to sessionStorage
function saveMessages() {
    console.log('Saving chat history...');
    console.log(historyMessages.getHistory());
    sessionStorage.setItem('chatHistory', JSON.stringify(historyMessages.getHistory()));
}

// Function to load messages from sessionStorage
function loadMessages() {
    const chatHistory = JSON.parse(sessionStorage.getItem('chatHistory'));
    if (chatHistory) {
        chatHistory.forEach(msg => {
            showMessage(msg.message, msg.sender);
        });
    }
}

// Load intents when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Load saved messages from sessionStorage
    loadMessages();
    
    fetchJSON('../json/intents.json');
    
    // Also allow Enter key to send
    document.getElementById('user-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendUserMessage();
        }
    });
});

// Save chat messages to sessionStorage before leaving the page
window.addEventListener('beforeunload', () => {
    saveMessages();
});