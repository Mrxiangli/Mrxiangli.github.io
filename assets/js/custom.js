// Initial Language Load (Run immediately)
var savedLang = localStorage.getItem('site-lang') || 'en';
document.documentElement.classList.add('lang-' + savedLang);

// Global Toggle Function
function toggleLanguage() {
  var html = document.documentElement;
  var currentLang = html.classList.contains('lang-zh') ? 'en' : 'zh';
  
  html.classList.remove('lang-en', 'lang-zh');
  html.classList.add('lang-' + currentLang);
  localStorage.setItem('site-lang', currentLang);
}
