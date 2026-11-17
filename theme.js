/* Light / Dark theme toggle
   - First visit: follows the device setting
   - After the user clicks the toggle: their choice is remembered
   Load this in <head> (no defer) so the right theme is set before the page paints. */
(function () {
  var KEY = 'theme';
  var root = document.documentElement;
  var media = window.matchMedia('(prefers-color-scheme: dark)');

  function getSaved() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    var btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.setAttribute('aria-pressed', theme === 'dark');
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  // Set the theme immediately (before first paint)
  apply(getSaved() || (media.matches ? 'dark' : 'light'));

  document.addEventListener('DOMContentLoaded', function () {
    apply(root.getAttribute('data-theme'));
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      apply(next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
    });
  });

  // If the user never chose, follow live changes in the device setting
  if (media.addEventListener) {
    media.addEventListener('change', function (e) {
      if (!getSaved()) apply(e.matches ? 'dark' : 'light');
    });
  }
})();