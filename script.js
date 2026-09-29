/**
 * Mitali Yadav — Portfolio Interactions
 * Minimal vanilla JS for subtle interactions, clipboard actions, and active navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Email Copy to Clipboard with Toast Notification
  const copyElements = document.querySelectorAll('[data-copy-email]');
  const toast = document.getElementById('toastNotice');

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('visible');
    setTimeout(() => {
      toast.classList.remove('visible');
    }, 2800);
  }

  copyElements.forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const email = el.getAttribute('data-copy-email') || 'mitaliyadavvv@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast(`Copied ${email} to clipboard`);
      }).catch(() => {
        showToast(`Email: ${email}`);
      });
    });
  });

  // 2. Active Section Spy for Navigation
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const sections = Array.from(navLinks).map(link => {
    const id = link.getAttribute('href').substring(1);
    return document.getElementById(id);
  }).filter(Boolean);

  if (sections.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, {
      rootMargin: '-20% 0px -65% 0px'
    });

    sections.forEach(sec => observer.observe(sec));
  }

  // 3. Subtle interactive filter for prototypes (All / AI Agents / Systems)
  const filterBtns = document.querySelectorAll('.filter-btn');
  const prototypeCards = document.querySelectorAll('.prototype-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      prototypeCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });
});
