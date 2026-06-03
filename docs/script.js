document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Email Clipboard Copy Feature ---
  const copyBtn = document.getElementById('btn-copy');
  const emailText = document.getElementById('email-text').innerText;
  const copyToast = document.getElementById('copy-toast');

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(emailText)
        .then(() => {
          // Show toast alert
          copyToast.classList.add('show');
          
          // Toggle icon check style briefly (optional transition)
          copyBtn.style.color = '#06b6d4';
          
          // Hide toast after 2 seconds
          setTimeout(() => {
            copyToast.classList.remove('show');
            copyBtn.style.color = '';
          }, 2000);
        })
        .catch(err => {
          console.error('Failed to copy email: ', err);
        });
    });
  }

  // --- 2. Active Navigation Links on Scroll & Click ---
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');

  // Handle active class based on scroll position
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      // Triggers slightly before section reaches the top of the viewport
      if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // --- 3. Scroll Reveal Animation ---
  const revealElements = document.querySelectorAll('.reveal');

  const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Once revealed, no need to keep observing
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15 // Triggers when 15% of the element is visible
  });

  revealElements.forEach(element => {
    revealOnScroll.observe(element);
  });
});
