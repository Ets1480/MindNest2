function applyMode(mode) {
  if (mode === 'dark') {
    body.classList.add('dark-mode');
    modeToggleBtn.textContent = '☀️'; // Change icon to sun
  } else {
    body.classList.remove('dark-mode');
    modeToggleBtn.textContent = '🌙'; // Change icon to moon
  }
  localStorage.setItem('mindnest-mode', mode);
}

// Initialize mode on page load
const savedMode = localStorage.getItem('mindnest-mode') || 'light';
applyMode(savedMode);

// Toggle mode on button click
const modeToggleBtn = document.getElementById('mode-toggle'); // Ensure the button exists
if (modeToggleBtn) {
  modeToggleBtn.addEventListener('click', () => {
    const newMode = body.classList.contains('dark-mode') ? 'light' : 'dark';
    applyMode(newMode);
  });
}
