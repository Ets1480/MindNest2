// Function to fetch AI response
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
  return data.output; // Adjust based on actual API response structure
}

// Dark/Light Mode Toggle (shared on both pages)
const toggleButtons = document.querySelectorAll('#toggle-theme');
toggleButtons.forEach(btn => 
  btn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
  })
);

// Load mode preference on page load
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark-mode');
}

// --- index.html functionality ---

if (document.getElementById('signup-form')) {
  const signupForm = document.getElementById('signup-form');
  const loginForm = document.getElementById('login-form');

  // On sign up
  signupForm.addEventListener('submit', e => {
    e.preventDefault();

    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value;

    if (!name || !email || !password) {
      alert('Please fill in all fields');
      return;
    }

    const user = { name, email, password };
    localStorage.setItem('user', JSON.stringify(user));

    alert(`Account created for ${name}. Please sign in.`);
    signupForm.reset();
  });

  // On login
  loginForm.addEventListener('submit', e => {
    e.preventDefault();

    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.email === email && storedUser.password === password) {
      localStorage.setItem('loggedInUser', JSON.stringify(storedUser));

      alert(`Welcome back, ${storedUser.name}!`);
      window.location.href = 'chatbot.html';
    } else {
      alert('Incorrect email or password');
    }
  });
}

// --- chatbot.html functionality ---

if (document.getElementById('chatbot-container')) {
  const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));

  if (!storedUser) {
    alert('You must log in first!');
    window.location.href = 'index.html';
  } else {
    document.getElementById('user-name').textContent = storedUser.name;
  }

  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('loggedInUser');
      alert('Logged out!');
      window.location.href = 'index.html';
    });
  }

  // Chatbot logic
  const chatOutput = document.getElementById('chat-output');
  const chatInput = document.getElementById('chat-input');
  const sendBtn = document.getElementById('send-btn');

  sendBtn.addEventListener('click', async () => {
    const question = chatInput.value.trim().toLowerCase();
    if (!question) return;

    try {
      const answer = await fetchAIResponse(question);

      const userMsg = document.createElement('div');
      userMsg.textContent = `You: ${chatInput.value}`;
      userMsg.style.fontWeight = 'bold';

      const botMsg = document.createElement('div');
      botMsg.textContent = `MindNest: ${answer}`;

      chatOutput.appendChild(userMsg);
      chatOutput.appendChild(botMsg);
      chatOutput.scrollTop = chatOutput.scrollHeight;
      chatInput.value = '';
    } catch (error) {
      console.error('Error fetching AI response:', error);
      alert('Sorry, there was an error fetching the response.');
    }
  });
}

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
  
sendBtn.addEventListener('click', async () => {
  const question = chatInput.value.trim().toLowerCase();
  if (!question) return;

  // Fetch response from AI API
  try {
    const answer = await fetchAIResponse(question);

    const userMsg = document.createElement('div');
    userMsg.textContent = `You: ${chatInput.value}`;
    userMsg.style.fontWeight = 'bold';

    const botMsg = document.createElement('div');
    botMsg.textContent = `MindNest: ${answer}`;

    chatOutput.appendChild(userMsg);
    chatOutput.appendChild(botMsg);

    // Scroll to the bottom of the chat output
    chatOutput.scrollTop = chatOutput.scrollHeight;
    chatInput.value = '';
  } catch (error) {
    console.error('Error fetching AI response:', error);
    alert('Sorry, there was an error fetching the response.');
  }
});
