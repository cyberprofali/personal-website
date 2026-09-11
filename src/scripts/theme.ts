/**
 * Inlined into <head> by Layout.astro. Runs before <body> is parsed so the
 * theme is applied before first paint, avoiding a flash of the wrong theme.
 *
 * Resolution order: stored preference, then the OS preference
 * (prefers-color-scheme). Writes <html data-theme="light|dark">, which selects
 * the custom properties in src/styles/global.css.
 */
export const themeInitScript = `(function () {
  var STORAGE_KEY = 'theme';

  function readStored() {
    try {
      var value = localStorage.getItem(STORAGE_KEY);
      return value === 'light' || value === 'dark' ? value : null;
    } catch (e) {
      // Private mode / storage disabled — fall back to the system preference.
      return null;
    }
  }

  function systemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme;
  }

  // Paint the resolved theme immediately.
  apply(readStored() || systemTheme());

  // Keep following the OS while no explicit choice has been made.
  var query = window.matchMedia('(prefers-color-scheme: dark)');
  var onSystemChange = function () {
    if (!readStored()) apply(systemTheme());
  };

  if (typeof query.addEventListener === 'function') {
    query.addEventListener('change', onSystemChange);
  } else if (typeof query.addListener === 'function') {
    query.addListener(onSystemChange); // Safari < 14
  }

  // Expose a tiny API for the toggle button.
  window.__theme = {
    get: function () {
      return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    },
    set: function (theme) {
      apply(theme);
      try {
        localStorage.setItem(STORAGE_KEY, theme);
      } catch (e) {
        /* storage unavailable — the choice just won't persist */
      }
    },
    /** Forget the explicit choice and go back to following the OS. */
    clear: function () {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {
        /* no-op */
      }
      apply(systemTheme());
    },
  };
})();`;
