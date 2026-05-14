// Dynamic year
document.getElementById("year").textContent = new Date().getFullYear();

// Smooth scroll helper
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// Open external link helper
function openLink(url) {
  window.open(url, "_blank");
}

// Contact form handler - sends data to backend API
function handleContactSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  // Client-side validation
  if (!name || !email || !message) {
    alert("Please fill in all fields.");
    return;
  }

  // Disable submit button and show loading state
  submitBtn.disabled = true;
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Sending...";

  // Send data to backend API
  fetch('http://localhost:5001/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, message })
  })
  .then(response => {
    // Check if response is valid JSON
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    if (data.success) {
      // Show success message
      alert(data.message);
      form.reset();
    } else {
      // Show validation or server errors
      if (Array.isArray(data.errors)) {
        alert("Validation errors:\n\n" + data.errors.join("\n"));
      } else {
        alert("Error: " + (data.message || "Failed to send message"));
      }
    }
  })
  .catch(error => {
    console.error('Request error:', error);
    alert("Failed to send message. Please check your internet connection and try again.");
  })
  .finally(() => {
    // Re-enable submit button and restore text
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  });
}

// 3D Tilt effect on hero card (improved)
(function () {
  const card = document.getElementById("tilt-card");
  if (!card) return;

  const maxRotate = 12; // degrees
  let width = 0, height = 0, left = 0, top = 0;
  let rafId = null;

  function updateRect() {
    const rect = card.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    left = rect.left;
    top = rect.top;
  }

  // Use a small smoothing to make motion pleasant
  let currentX = 0, currentY = 0, targetX = 0, targetY = 0;
  function animate() {
    // lerp smoothing
    currentX += (targetX - currentX) * 0.18;
    currentY += (targetY - currentY) * 0.18;
    const rotateY = ((currentX - width / 2) / (width / 2)) * maxRotate;
    const rotateX = -((currentY - height / 2) / (height / 2)) * maxRotate;
    card.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
    // subtle shadow increase when rotated
    const shadowStrength = 18 + Math.abs(rotateX) + Math.abs(rotateY);
    card.style.boxShadow = `0 ${shadowStrength}px ${shadowStrength * 2}px rgba(15,23,42,0.9)`;
    rafId = requestAnimationFrame(animate);
  }

  function handlePointerMove(clientX, clientY) {
    // ensure rect up-to-date (resize or scroll)
    if (!width || !height) updateRect();
    targetX = clientX - left;
    targetY = clientY - top;
  }

  function onMouseMove(e) {
    handlePointerMove(e.clientX, e.clientY);
  }

  function onTouchMove(e) {
    if (e.touches && e.touches[0]) {
      handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  }

  card.addEventListener('mouseenter', () => {
    updateRect();
    card.style.transition = 'none';
    if (!rafId) rafId = requestAnimationFrame(animate);
  });

  card.addEventListener('mousemove', onMouseMove, { passive: true });
  card.addEventListener('touchstart', (e) => {
    updateRect();
    if (!rafId) rafId = requestAnimationFrame(animate);
  }, { passive: true });
  card.addEventListener('touchmove', onTouchMove, { passive: true });

  function reset() {
    // cancel animation and reset transforms smoothly
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    card.style.transition = 'transform 0.45s cubic-bezier(.22,.9,.2,1), box-shadow 0.45s ease-out';
    card.style.transform = 'rotateX(0deg) rotateY(0deg)';
    card.style.boxShadow = '0 18px 45px rgba(15, 23, 42, 0.8)';
    // clear cached dims so next enter recalculates
    width = height = left = top = 0;
  }

  card.addEventListener('mouseleave', reset);
  card.addEventListener('touchend', reset);
  // update rect on resize / scroll
  window.addEventListener('resize', updateRect);
  window.addEventListener('scroll', () => { /* small delay */ setTimeout(updateRect, 50); });
})();
