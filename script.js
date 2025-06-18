// Dark/Light Mode Toggle (shared on both pages)
const toggleButtons = document.querySelectorAll('#toggle-theme');
toggleButtons.forEach(btn =>
  btn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    // Save mode preference
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

    // Save user data (for demo, using localStorage)
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
      // Save login state
      localStorage.setItem('loggedInUser', JSON.stringify(storedUser));

      alert(`Welcome back, ${storedUser.name}!`);
      // Redirect to chatbot page
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

  // Logout button
  document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('loggedInUser');
    alert('Logged out!');
    window.location.href = 'index.html';
  });

  // Chatbot logic
  const chatOutput = document.getElementById('chat-output');
  const chatInput = document.getElementById('chat-input');
  const sendBtn = document.getElementById('send-btn');

  // Example Q&A dataset (extend this to 200+ answers)
  const qaDataset = {
    "hello": "Hello! How can I help you today?",
    "how are you": "I'm just a bot, but I'm here to assist you!",
    "what is mindnest": "MindNest is your AI assistant for mental health and finance.",
    // ... add 200+ Q&A pairs here
  };

  sendBtn.addEventListener('click', () => {
    const question = chatInput.value.trim().toLowerCase();
    if (!question) return;

    const answer = qaDataset[question] || "Sorry, I don't have an answer for that.";

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
  });
}
