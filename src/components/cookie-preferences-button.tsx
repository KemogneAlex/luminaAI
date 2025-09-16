'use client';

export default function CookiePreferencesButton() {
  const handleClick = () => {
    localStorage.removeItem('cookieConsent');
    window.location.reload();
  };

  return (
    <button 
      onClick={handleClick}
      className='text-primary hover:underline'
    >
      Modifier mes préférences
    </button>
  );
}
