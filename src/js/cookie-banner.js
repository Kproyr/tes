document.addEventListener('DOMContentLoaded', () => {
  const cookieBanner = document.querySelector('.cookie-banner');
  const cookieDetails = document.querySelector('.cookie-details');
  const readMoreLink = document.querySelector('.read-more');

  // Show banner if no consent exists
  if (!localStorage.getItem('cookieConsent')) {
    cookieBanner.style.display = 'block';
  }

  // Read more toggle
  readMoreLink?.addEventListener('click', (e) => {
    e.preventDefault();
    cookieDetails.style.display = cookieDetails.style.display === 'none' ? 'block' : 'none';
  });

  // Consent handlers
  document.getElementById('accept-all')?.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'all');
    cookieBanner.style.display = 'none';
  });

  document.getElementById('reject-all')?.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'none');
    cookieBanner.style.display = 'none';
  });

  document.getElementById('accept-selected')?.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'selected');
    cookieBanner.style.display = 'none';
  });
});
