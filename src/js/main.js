const headerNode = document.querySelector('.header');
const headerToggleNode = headerNode.querySelector('.header__toggler');
const headerNavNode = headerNode.querySelector('.header__nav');

let openNav = false;

const Classes = {
  TOGGLE_CLOSE: 'toggler--close',
  TOGGLE_OPEN: 'toggler--open',
  HEADER_NAV_OPEN: 'header__nav--open',
  HEADER_TRANSPARENT: 'header--transparent',
};

function toggleMenu() {
  openNav = !openNav;
  headerToggleNode.classList.toggle(Classes.TOGGLE_CLOSE);
  headerToggleNode.classList.toggle(Classes.TOGGLE_OPEN);
  headerNavNode.classList.toggle(Classes.HEADER_NAV_OPEN);

  if (!window.pageYOffset > 0) {
    headerNode.classList.toggle(Classes.HEADER_TRANSPARENT);
  }
}

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 0) {
    headerNode.classList.remove(Classes.HEADER_TRANSPARENT);
  }
  if (window.pageYOffset <= 0 && !openNav) {
    headerNode.classList.add(Classes.HEADER_TRANSPARENT);
  }
});

headerToggleNode.addEventListener('click', toggleMenu);
