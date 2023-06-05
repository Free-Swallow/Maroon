const headerNode = document.querySelector('.header');
const headerIndexNode = document.querySelector('.header--index');
const headerToggleNode = headerNode.querySelector('.header__toggler');
const headerNavNode = headerNode.querySelector('.header__nav');
const catalogFilterToggler = document.querySelector('.catalog-preview__toggler');
const catalogFilterList = document.querySelector('.catalog-preview__filter-list');
const sliderNodeList = document.querySelectorAll('.slider-list');

let openNav = false;

const Classes = {
  TOGGLE_CLOSE: 'toggler--close',
  TOGGLE_OPEN: 'toggler--open',
  HEADER_NAV_OPEN: 'header__nav--open',
  HEADER_TRANSPARENT: 'header--transparent',
  FILTER_CLOSE: 'catalog-preview__toggler--close',
  FILTER_OPEN: 'catalog-preview__toggler--open',
  FILTER_LIST_CLOSE: 'catalog-preview__filter-list--close',
};

function toggleMenu() {
  openNav = !openNav;
  headerToggleNode.classList.toggle(Classes.TOGGLE_CLOSE);
  headerToggleNode.classList.toggle(Classes.TOGGLE_OPEN);
  headerNavNode.classList.toggle(Classes.HEADER_NAV_OPEN);

  if (!window.pageYOffset > 0) {
    headerIndexNode.classList.toggle(Classes.HEADER_TRANSPARENT);
  }
}

function toggleFilter() {
  catalogFilterToggler.classList.toggle(Classes.FILTER_CLOSE);
  catalogFilterToggler.classList.toggle(Classes.FILTER_OPEN);
  catalogFilterList.classList.toggle(Classes.FILTER_LIST_CLOSE);
}

function toggleSliderList(evt) {
  const accardion = document.querySelector(`#${evt.target.dataset.uniqId}-${evt.target.dataset.buttonId}`);
  if (evt.target.nodeName === 'BUTTON') {
    accardion.classList.toggle('slider-list--close');
    evt.target.classList.toggle('slider-list__toggler--close');
    evt.target.classList.toggle('slider-list__toggler--open');
  }
}

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 0) {
    headerIndexNode.classList.remove(Classes.HEADER_TRANSPARENT);
  }
  if (window.pageYOffset <= 0 && !openNav) {
    headerIndexNode.classList.add(Classes.HEADER_TRANSPARENT);
  }
});

sliderNodeList.forEach((item) => item.addEventListener('click', toggleSliderList));

headerToggleNode.addEventListener('click', toggleMenu);
catalogFilterToggler.addEventListener('click', toggleFilter)
