(function() {
    var searchToggleSelector = '.site__searchToggle',
        navToggleSelector = '.site__menuToggle',
        siteNav = document.getElementById('nav'),
        SiteNavCategoryItems = siteNav.querySelectorAll('.isCategory');

    /**
     * Toggle the main navigation
     * @param event Optional and will prevent default
     */
    var toggleMenu = function (event) {
        $('#SiteHeader').toggleClass('isActive');
        $('#siteCanvas').toggleClass('hasActiveMenu');
        $('.overlayMobileMenu').toggleClass('isActive');
        hideToc();
        closeSearch();
        if (event) {
            event.preventDefault();//prevent default to avoid scrolling to top when interacting with the menu. If not anchor will be executed
        }
    };

    /**
     * Close search area and return to main interface
     */
    function closeSearch() {
        $(searchToggleSelector).removeClass('isActive');
        $('#site_search').removeClass('isActive');
    }

    /**
     * Get an elements ancestors
     * @param childElement, element to start with
     * @param stopElement. Stop search when this element is reached
     * @returns {Array} list of elements ancestors
     */
    function getAncestors(childElement, stopElement) {
        var ancestors = [];
        while ((childElement = childElement.parentElement) && childElement != stopElement) ancestors.push(childElement);
        return ancestors;
    }

    //collapse and expand menu items
    $('.isCategory>a').on('click', function (event) {
        var ancestors = getAncestors(this, siteNav),
            child, i;

        //collapse all items that are not an ancestor of the clicked menu item
        for (i = 0; i < SiteNavCategoryItems.length; i++) {
            child = SiteNavCategoryItems[i];
            if (ancestors.indexOf(child) == -1) {
                $(child).removeClass('isExpanded');
            } else {
                $(child).addClass('isExpanded');
            }
        }

        $(siteNav).addClass('isExpanded'); //mark the navigation as having an expanded child. this is used for horizontal layout
        event.preventDefault();//prevent default to avoid scrolling to top when interacting with the menu. If not anchor will be executed
    });

    /**
     * Toggle search area
     * @param event Optional and will prevent default
     */
    function toggleSearch(event) {
        $(searchToggleSelector).toggleClass('isActive');
        var searchAreaEl = document.getElementById('site_search');
        $(searchAreaEl).toggleClass('isActive');
        searchAreaEl.querySelector('input').focus();
        closeMenus();
        hideToc();
        if (event) {
            event.preventDefault();//prevent default to avoid scrolling to top when interacting with the menu. If not anchor will be executed
        }
    }

    /**
     * hide menu
     */
    function closeMenus() {
        $(siteNav).removeClass('isExpanded');
        if ($('#siteCanvas').hasClass('hasActiveMenu')) {
            toggleMenu();
        }
    }

    /**
     * hide navigation areas.
     */
    function hideNavigation() {
        "use strict";
        hideToc();
        closeMenus();
    }

    /**
     * Toggle drawer
     * @returns {boolean}
     */
    function toggleToc() {
        $('.Site__drawer').toggleClass('isActive');
        $(this).toggleClass('isActive');
        $('.overlayFilter').toggleClass('isActive');
        return false;
    }

    /**
     * Hide drawer
     */
    function hideToc() {
        $('.Site__drawer').removeClass('isActive');
        $('.toggleDrawer').removeClass('isActive');
        $('.overlayFilter').removeClass('isActive');

    }

    /**
     * Hide horizontal menu if event
     * @param event
     */
    function closeMenusOnClickOutside(event) {
        var clickOnContent = $(event.target).is('#main *') || $(event.target).is('#site_search *');
        if (clickOnContent) {
            closeMenus();
        }
    }

    //hide horizontal menu if clicking outside menu area
    document.addEventListener('click', closeMenusOnClickOutside);
    document.addEventListener('touchend', closeMenusOnClickOutside);

    //hide menu, drawer and search area if ESC is pressed
    $(document).keydown(function (e) {
        if (e.keyCode == 27) {
            closeMenus();
            closeSearch();
            hideToc();
        }
    });

    //Hide navigation when overlay is clicked
    $('.overlay').on('click touchend', hideNavigation);

    //toggle drawer on click
    $('.toggleDrawer').on('click touchend', toggleToc);

    //show/hide search area
    $(searchToggleSelector).on('click', toggleSearch);

    //toggle menu when clicking on the menu icon
    $(navToggleSelector).on('click touchend', toggleMenu);
})();
