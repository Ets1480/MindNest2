// Function to fetch AI response using OpenRouter (Free AI model)
async function fetchAIResponse(userInput) {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer YOUR_API_KEY_HERE", // Replace with your real API key from openrouter.ai
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "mistralai/mistral-7b-instruct",
      messages: [{ role: "user", content: userInput }]
    })
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

// Dark/Light Mode Toggle
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
  const chatForm = document.getElementById('chat-form');

  chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const question = chatInput.value.trim().toLowerCase();
    if (!question) return;

    // Add user message
    addMessage(question, 'user');
    chatInput.value = '';

    try {
      const answer = await fetchAIResponse(question);
      addMessage(answer, 'bot');
    } catch (error) {
      console.error('Error fetching AI response:', error);
      addMessage('Sorry, there was an error fetching the response.', 'bot');
    }
  });

  function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');
    msgDiv.textContent = text;
    chatOutput.appendChild(msgDiv);
    chatOutput.scrollTop = chatOutput.scrollHeight;
  }
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
if (modeToggleBtn) {
  modeToggleBtn.addEventListener('click', () => {
    const newMode = body.classList.contains('dark-mode') ? 'light' : 'dark';
    applyMode(newMode);
  });
}
