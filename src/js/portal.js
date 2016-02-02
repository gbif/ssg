var searchToggleSelector = '.site__searchToggle',
    navToggleSelector = '.site__menuToggle';
var toggleMenu = function (event) {
    document.getElementById('SiteHeader').classList.toggle('isActive');
    document.getElementById('siteCanvas').classList.toggle('hasActiveMenu');
    $('.overlayMobileMenu').toggleClass('isActive');
    hideToc();
    closeSearch();
    if (event){
        event.preventDefault();
    }
};
function closeSearch() {
    $(searchToggleSelector).removeClass('isActive');

    var searchAreaEl = document.getElementById('site_search');
    searchAreaEl.classList.remove('isActive');
}
$(navToggleSelector).on('click touchend', toggleMenu);

function getAncestors(el, stopEl) {
    var ancestors = [];
    while ((el = el.parentElement) && el != stopEl) ancestors.push(el);
    return ancestors;
}

//collapse and expand menu items
var siteNav = document.getElementById('nav');
var SiteNavCategoryItems = siteNav.querySelectorAll('.isCategory');
$('.isCategory>a').on('click', function (event) {
    var ancestors = getAncestors(this, siteNav),
        child, i;

    //collpase all items that are not parents
    for (i = 0; i < SiteNavCategoryItems.length; i++) {
        child = SiteNavCategoryItems[i];
        if (ancestors.indexOf(child) == -1) {
            child.classList.remove('isExpanded');
        }
    }

    if (!siteNav.classList.contains('isExpanded')) {
        //for horizontal layout. When changing from laptop to mobile this means that the first menu click is ignored
        this.parentNode.classList.add('isExpanded');
    }
    else {
        this.parentNode.classList.toggle('isExpanded');
    }
    siteNav.classList.add('isExpanded');//use for horizontal layout
    event.preventDefault();
});

//collapse expand service menu
$('.ServiceMenu__teaser>a').on('click', function (event) {
    this.parentNode.parentNode.classList.toggle('isExpanded');
});


//Search toggling
function toggleSearch(event) {
    $(searchToggleSelector).toggleClass('isActive');
    var searchAreaEl = document.getElementById('site_search');
    searchAreaEl.classList.toggle('isActive');
    searchAreaEl.querySelector('input').focus();
    closeMenus();
    event.preventDefault(); //do not scroll to top
}
$(searchToggleSelector).on('click', toggleSearch);


//close menu when clicking outside
function closeMenus() {
    siteNav.classList.remove('isExpanded');
    if (document.getElementById('siteCanvas').classList.contains('hasActiveMenu')) {
        toggleMenu();
    }
    hideToc();
}

$(document).keydown(function(e){
    if (e.keyCode==27) {
        closeMenus();
        closeSearch();
    }
});

toggleToc = function(event){
    $('.Site__drawer').toggleClass('isActive');
    $(this).toggleClass('isActive');
    $('.overlayFilter').toggleClass('isActive');
    return false;
};
$('.toggleDrawer').on('click touchend', toggleToc);

function hideToc() {
    $('.Site__drawer').removeClass('isActive');
    $('.toggleDrawer').removeClass('isActive');
    $('.overlayFilter').removeClass('isActive');

}

//overlay
$('.overlay').on('click touchend', closeMenus);

