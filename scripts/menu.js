(function() {
    const menus = document.querySelectorAll('[data-menu]');

    menus.forEach(menu => {
        const toggler = menu.querySelector('[data-menu-toggler]');
        const content = menu.querySelector('[data-menu-content]');

        toggler.addEventListener('click', e => {
            const icon = toggler.querySelector('i');

            if (icon.classList.contains('fa-angle-up')) {
                icon.classList.replace('fa-angle-up', 'fa-angle-down');
            } else {
                icon.classList.replace('fa-angle-down', 'fa-angle-up');
            }
            
            content.classList.toggle('hidden');   
        });
    });
})();