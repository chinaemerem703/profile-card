const userTimeElement = document.querySelector('[data-testid="test-user-time"]');

function updateUserTime() {
  const currentTime = Date.now();
  userTimeElement.textContent = `Current Time: ${currentTime}ms`;
}

updateUserTime();
setInterval(updateUserTime, 1000);




