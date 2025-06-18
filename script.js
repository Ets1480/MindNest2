// Dark/Light mode toggle and remember preference
const modeToggleBtn = document.getElementById('mode-toggle');
const body = document.body;

function applyMode(mode) {
  if (mode === 'dark') {
    body.classList.add('dark-mode');
    modeToggleBtn.textContent = '☀️';
  } else {
    body.classList.remove('dark-mode');
    modeToggleBtn.textContent = '🌙';
  }
  localStorage.setItem('mindnest-mode', mode);
}

// Initialize mode on page load
const savedMode = localStorage.getItem('mindnest-mode') || 'light';
applyMode(savedMode);

// Toggle mode on button click
modeToggleBtn.addEventListener('click', () => {
  const newMode = body.classList.contains('dark-mode') ? 'light' : 'dark';
  applyMode(newMode);
});

// Chatbot logic
const chatContainer = document.getElementById('chat-container');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');

function addMessage(text, sender = 'bot') {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');
  msgDiv.textContent = text;
  chatContainer.appendChild(msgDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight; // scroll to latest
}

// Simple bot response logic
function getBotResponse(userText) {
  const text = userText.toLowerCase().trim();

  if (!text) return "Please say something so I can help you.";

  if (text.includes('hello') || text.includes('hi')) {
    return "Hello! How can MindNest support your mental wellness today?";
  }
  if (text.includes('help')) {
    return "Sure! You can ask me about relaxation tips, focus exercises, or financial advice.";
  }
  if (text.includes('focus')) {
    return "To improve focus, try the Pomodoro technique: work for 25 minutes, then take a 5-minute break.";
  }
  if (text.includes('stress') || text.includes('anxiety')) {
    return "Deep breathing exercises and mindfulness meditation can help reduce stress.";
  }
  if (text.includes('finance') || text.includes('money')) {
    return "Creating a budget and tracking expenses are great first steps to financial empowerment.";
  }

  // Default reply
  return "Thanks for sharing! MindNest is here to help with mental wellness and focus. Ask me anything!";
}

// Handle form submission
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const userText = chatInput.value.trim();
  if (!userText) return;

  addMessage(userText, 'user');
  chatInput.value = '';
  chatInput.focus();

  // Simulate a short delay for bot reply
  setTimeout(() => {
    const botReply = getBotResponse(userText);
    addMessage(botReply, 'bot');
  }, 700);
});
async function fetchAIResponse(userInput) {
  const response = await fetch('https://api.example.com/endpoint', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_KEY', // Replace with your actual API key
    },
    body: JSON.stringify({ input: userInput }),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return data.output; // Adjust based on the actual API response structure
}
