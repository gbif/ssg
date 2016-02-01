
(function() {
    function appendScript(conditionalScript) {
        var el = document.createElement('script');
        el.setAttribute('src', conditionalScript);
        document.head.appendChild(el);
    }

    //We wan't classlist and this is not supported in ie9
    if (!document.body.classList) {
        appendScript('//cdnjs.cloudflare.com/ajax/libs/classlist/2014.01.31/classList.min.js');
    }
})();



//Matches there are vendor prefixes and no suport in ie9
this.Element && function(ElementPrototype) {
    ElementPrototype.matchesSelector = ElementPrototype.matchesSelector ||
    ElementPrototype.mozMatchesSelector ||
    ElementPrototype.msMatchesSelector ||
    ElementPrototype.oMatchesSelector ||
    ElementPrototype.webkitMatchesSelector ||
    function (selector) {
        var node = this, nodes = (node.parentNode || node.document).querySelectorAll(selector), i = -1;
        while (nodes[++i] && nodes[i] != node);
        return !!nodes[i];
    }
}(Element.prototype);


//Create a global GBIF Object
(function (global) {
    var gb = gb || {},
        util = {VERSION: '0.0.1'};


    //event listeners
    util.addEventListenerAll = function (selector, eventName, handler) {
        util.forEachElement(selector, function (el) {
            el.addEventListener(eventName, handler);
        })
    };

    //misc
    util.forEachElement = function (selector, fn) {
        var elements = document.querySelectorAll(selector);
        for (var i = 0; i < elements.length; i++)
            fn(elements[i], i);
    };

    //consider moving into polyfill
    util.matches = function (el, selector) {
        var p = Element.prototype;
        var f = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || function(s) {
                return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
            };
        return f.call(el, selector);
    };


    gb.util = util;
    global.gb = gb;
})(window);


var searchToggleSelector = '.site__searchToggle',
    navToggleSelector = '.site__menuToggle';
var toggleMenu = function () {
    document.getElementById('SiteHeader').classList.toggle('isActive');
    document.getElementById('siteCanvas').classList.toggle('hasActiveMenu');
    closeSearch();
};
function closeSearch() {
    gb.util.forEachElement(searchToggleSelector, function (el) {
        el.classList.remove('isActive');
    });

    var searchAreaEl = document.getElementById('site_search');
    searchAreaEl.classList.remove('isActive');
}
gb.util.addEventListenerAll(navToggleSelector, 'click', toggleMenu);

function getAncestors(el, stopEl) {
    var ancestors = [];
    while ((el = el.parentElement) && el != stopEl) ancestors.push(el);
    return ancestors;
}

//collapse and expand menu items
var siteNav = document.getElementById('nav');
var SiteNavCategoryItems = siteNav.querySelectorAll('.isCategory');
gb.util.addEventListenerAll('.isCategory>a', 'click', function (event) {
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
gb.util.addEventListenerAll('.ServiceMenu__teaser>a', 'click', function (event) {
    this.parentNode.parentNode.classList.toggle('isExpanded');
});


//Search toggling
gb.toggleSearch = function(event) {
    gb.util.forEachElement(searchToggleSelector, function (el) {
        el.classList.toggle('isActive');
    });

    var searchAreaEl = document.getElementById('site_search');
    searchAreaEl.classList.toggle('isActive');
    searchAreaEl.querySelector('input').focus();
    closeMenus();
    event.preventDefault(); //do not scroll to top
}
gb.util.addEventListenerAll(searchToggleSelector, 'click', gb.toggleSearch);


//close menu when clicking outside
function closeMenus() {
    siteNav.classList.remove('isExpanded');
    if (document.getElementById('siteCanvas').classList.contains('hasActiveMenu')) {
        toggleMenu();
    }
}
function closeMenusOnClickOutside(event) {
    var clickOnContent = gb.util.matches(event.target, '#main *') || event.target == document.documentElement;
    if (clickOnContent) {
        closeMenus();
    }
}
document.addEventListener('click', closeMenusOnClickOutside);
document.addEventListener('touchend', closeMenusOnClickOutside);

$(document).keydown(function(e){
    if (e.keyCode==27) {
        closeMenus();
        closeSearch();
    }
});

// gb.util.addEventListenerAll('a.btn', 'click', function (event) {
//     event.preventDefault();
// });


