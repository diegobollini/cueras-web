(() => {
  const focusableSelector =
    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

  document.querySelectorAll('.wp-block-navigation').forEach((navigation) => {
    const openButton = navigation.querySelector(
      '.wp-block-navigation__responsive-container-open',
    );
    const closeButton = navigation.querySelector(
      '.wp-block-navigation__responsive-container-close',
    );
    const container = navigation.querySelector(
      '.wp-block-navigation__responsive-container',
    );
    const desktopQuery = window.matchMedia('(min-width: 600px)');

    if (!openButton || !closeButton || !container) return;

    const syncAccessibilityState = () => {
      const isOpen = container.classList.contains('is-menu-open');

      if (desktopQuery.matches) {
        container.removeAttribute('aria-hidden');
      } else {
        container.setAttribute('aria-hidden', String(!isOpen));
      }
    };

    const closeMenu = ({ restoreFocus = false } = {}) => {
      container.classList.remove('is-menu-open', 'has-modal-open');
      openButton.setAttribute('aria-expanded', 'false');
      document.documentElement.classList.remove('has-modal-open');
      syncAccessibilityState();

      if (restoreFocus && !desktopQuery.matches) {
        openButton.focus();
      }
    };

    const openMenu = () => {
      container.classList.add('is-menu-open', 'has-modal-open');
      container.setAttribute('aria-hidden', 'false');
      openButton.setAttribute('aria-expanded', 'true');
      document.documentElement.classList.add('has-modal-open');
      closeButton.focus();
    };

    const handleViewportChange = () => {
      if (desktopQuery.matches) {
        closeMenu();
      } else {
        syncAccessibilityState();
      }
    };

    openButton.setAttribute('aria-controls', container.id);
    openButton.setAttribute('aria-expanded', 'false');
    syncAccessibilityState();

    openButton.addEventListener('click', openMenu);
    closeButton.addEventListener('click', () => {
      closeMenu({ restoreFocus: true });
    });
    desktopQuery.addEventListener('change', handleViewportChange);
    container.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    navigation.addEventListener('keydown', (event) => {
      if (!container.classList.contains('is-menu-open')) return;

      if (event.key === 'Escape') {
        closeMenu({ restoreFocus: true });
        return;
      }

      if (event.key !== 'Tab') return;

      const focusable = [...container.querySelectorAll(focusableSelector)];
      const first = focusable[0];
      const last = focusable.at(-1);

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  });

  const main = document.querySelector('main');
  const site = document.querySelector('.wp-site-blocks');

  if (main && site && !document.querySelector('.skip-link')) {
    main.id ||= 'contenido';
    const skipLink = document.createElement('a');
    skipLink.className = 'skip-link screen-reader-text';
    skipLink.href = `#${main.id}`;
    skipLink.textContent = 'Saltar al contenido';
    site.before(skipLink);
  }
})();
