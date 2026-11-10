
(function () {
    "use strict";

    /*==================================================================
    [ Utilidades ]*/
    function qs(selector, scope) { return (scope || document).querySelector(selector); }
    function qsa(selector, scope) { return Array.prototype.slice.call((scope || document).querySelectorAll(selector)); }

    function on(elements, type, handler) {
        if (!elements) return;
        if (elements instanceof Element || elements === window || elements === document) elements = [elements];
        Array.prototype.forEach.call(elements, function (el) { el.addEventListener(type, handler); });
    }

    function isVisible(el) { return window.getComputedStyle(el).display !== 'none'; }

    /* Animacion de despliegue vertical (reemplaza slideDown / slideUp / slideToggle) */
    function slide(el, show, duration) {
        duration = duration === undefined ? 400 : duration;
        if (el._slideAnim) el._slideAnim.cancel();
        el._slideShow = show;

        var props = ['height', 'paddingTop', 'paddingBottom', 'marginTop', 'marginBottom'];
        var zero = {}, full = {};

        if (show) el.style.display = 'block';
        var cs = window.getComputedStyle(el);
        props.forEach(function (p) {
            zero[p] = '0px';
            full[p] = p === 'height' ? el.scrollHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom) + 'px' : cs[p];
        });

        var overflow = el.style.overflow;
        el.style.overflow = 'hidden';

        var anim = el.animate(show ? [zero, full] : [full, zero], { duration: duration, easing: 'ease' });
        el._slideAnim = anim;

        anim.onfinish = function () {
            el.style.overflow = overflow;
            if (!show) el.style.display = 'none';
            el._slideAnim = null;
        };
        anim.oncancel = function () {
            el.style.overflow = overflow;
            if (el._slideAnim === anim) el._slideAnim = null;
        };
    }

    function slideToggle(el, duration) {
        var show = el._slideAnim ? !el._slideShow : !isVisible(el);
        slide(el, show, duration);
    }
    function slideUp(el, duration) { if (isVisible(el)) slide(el, false, duration); }


    /*==================================================================
    [ Carga de pagina ]*/
    (function () {
        var page = qs('.animsition');
        if (!page) return;

        var loading = document.createElement('div');
        loading.className = 'animsition-loading-1';
        loading.innerHTML = '<div class="loader05"></div>';
        document.documentElement.appendChild(loading);

        function showPage() {
            if (loading.parentNode) loading.parentNode.removeChild(loading);

            page.style.animationDuration = '1500ms';
            page.classList.add('fade-in');

            page.addEventListener('animationend', function done(e) {
                if (e.target !== page) return;
                page.removeEventListener('animationend', done);
                page.classList.remove('fade-in');
                page.style.animationDuration = '';
                page.style.opacity = '1';
            });
        }

        if (document.readyState === 'complete') showPage();
        else window.addEventListener('load', showPage);

        // Fundido de salida al navegar con enlaces .animsition-link
        on(qsa('.animsition-link'), 'click', function (e) {
            var link = this;
            var url = link.getAttribute('href');
            if (!url || url.charAt(0) === '#' || link.target === '_blank' ||
                e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

            e.preventDefault();
            page.style.animationDuration = '800ms';
            page.classList.add('fade-out');
            setTimeout(function () { window.location.href = url; }, 800);
        });

        // Al volver con el historial se restaura la pagina visible
        window.addEventListener('pageshow', function (e) {
            if (e.persisted) {
                page.classList.remove('fade-out', 'fade-in');
                page.style.opacity = '1';
            }
        });
    })();


    /*==================================================================
    [ Volver arriba ]*/
    (function () {
        var btn = qs('#myBtn');
        var windowH = window.innerHeight / 2;
        var rafId = null;

        window.addEventListener('scroll', function () {
            if (btn) btn.style.display = window.pageYOffset > windowH ? 'flex' : 'none';
        });

        on(btn, 'click', function () {
            var start = window.pageYOffset, startTime = null, duration = 300;
            cancelAnimationFrame(rafId);

            function step(t) {
                if (startTime === null) startTime = t;
                var p = Math.min((t - startTime) / duration, 1);
                var eased = 0.5 - Math.cos(p * Math.PI) / 2;
                window.scrollTo(0, start * (1 - eased));
                if (p < 1) rafId = requestAnimationFrame(step);
            }
            rafId = requestAnimationFrame(step);
        });
    })();


    /*==================================================================
    [ Cabecera fija ]*/
    (function () {
        var headerDesktop = qs('.container-menu-desktop');
        var wrapMenu = qs('.wrap-menu-desktop');
        var topBar = qs('.top-bar');
        var posWrapHeader = topBar ? topBar.offsetHeight : 0;

        function update() {
            if (!headerDesktop || !wrapMenu) return;
            var scrollTop = window.pageYOffset;

            if (scrollTop > posWrapHeader) {
                headerDesktop.classList.add('fix-menu-desktop');
                wrapMenu.style.top = '0px';
            } else {
                headerDesktop.classList.remove('fix-menu-desktop');
                wrapMenu.style.top = (posWrapHeader - scrollTop) + 'px';
            }
        }

        update();
        window.addEventListener('scroll', update);
    })();


    /*==================================================================
    [ Menu mobile ]*/
    (function () {
        var btnMenu = qs('.btn-show-menu-mobile');
        var menuMobile = qs('.menu-mobile');
        var arrows = qsa('.arrow-main-menu-m');

        on(btnMenu, 'click', function () {
            this.classList.toggle('is-active');
            if (menuMobile) slideToggle(menuMobile);
        });

        arrows.forEach(function (arrow) {
            arrow.addEventListener('click', function () {
                var sub = this.parentNode.querySelector('.sub-menu-m');
                if (sub) slideToggle(sub);
                this.classList.toggle('turn-arrow-main-menu-m');
            });
        });

        window.addEventListener('resize', function () {
            if (window.innerWidth < 992) return;

            if (menuMobile && window.getComputedStyle(menuMobile).display === 'block') {
                if (menuMobile._slideAnim) menuMobile._slideAnim.cancel();
                menuMobile.style.display = 'none';
                if (btnMenu) btnMenu.classList.toggle('is-active');
            }

            qsa('.sub-menu-m').forEach(function (sub) {
                if (window.getComputedStyle(sub).display === 'block') {
                    if (sub._slideAnim) sub._slideAnim.cancel();
                    sub.style.display = 'none';
                    arrows.forEach(function (a) { a.classList.remove('turn-arrow-main-menu-m'); });
                }
            });
        });
    })();


    /*==================================================================
    [ Mostrar / ocultar buscador modal ]*/
    (function () {
        var modal = qs('.modal-search-header');
        var showBtns = qsa('.js-show-modal-search');

        on(showBtns, 'click', function () {
            if (modal) modal.classList.add('show-modal-search');
            this.style.opacity = '0';
        });

        on(qsa('.js-hide-modal-search'), 'click', function () {
            if (modal) modal.classList.remove('show-modal-search');
            showBtns.forEach(function (b) { b.style.opacity = '1'; });
        });

        on(qsa('.container-search-header'), 'click', function (e) { e.stopPropagation(); });
    })();


    /*==================================================================
    [ Filtro de productos por categoria ]*/
    (function () {
        var grids = qsa('.isotope-grid');
        var groups = qsa('.filter-tope-group');
        var buttons = qsa('.filter-tope-group button');

        function applyFilter(filter) {
            grids.forEach(function (grid) {
                qsa('.isotope-item', grid).forEach(function (item) {
                    var show = !filter || filter === '*' || item.matches(filter);
                    var wasHidden = item.classList.contains('is-filtered-out');

                    item.classList.toggle('is-filtered-out', !show);
                    item.classList.remove('is-filter-show');

                    if (show && wasHidden) {
                        void item.offsetWidth;
                        item.classList.add('is-filter-show');
                    }
                });
            });
        }

        groups.forEach(function (group) {
            group.addEventListener('click', function (e) {
                var button = e.target.closest('button');
                if (!button || !group.contains(button)) return;
                applyFilter(button.getAttribute('data-filter'));
            });
        });

        on(buttons, 'click', function () {
            buttons.forEach(function (b) { b.classList.remove('how-active1'); });
            this.classList.add('how-active1');
        });

        on(qsa('.isotope-item'), 'animationend', function () { this.classList.remove('is-filter-show'); });
    })();


    /*==================================================================
    [ Filtro / Busqueda de productos ]*/
    (function () {
        var btnFilter = qs('.js-show-filter');
        var btnSearch = qs('.js-show-search');
        var panelFilter = qs('.panel-filter');
        var panelSearch = qs('.panel-search');

        on(btnFilter, 'click', function () {
            this.classList.toggle('show-filter');
            if (panelFilter) slideToggle(panelFilter, 400);

            if (btnSearch && btnSearch.classList.contains('show-search')) {
                btnSearch.classList.remove('show-search');
                if (panelSearch) slideUp(panelSearch, 400);
            }
        });

        on(btnSearch, 'click', function () {
            this.classList.toggle('show-search');
            if (panelSearch) slideToggle(panelSearch, 400);

            if (btnFilter && btnFilter.classList.contains('show-filter')) {
                btnFilter.classList.remove('show-filter');
                if (panelFilter) slideUp(panelFilter, 400);
            }
        });
    })();


    /*==================================================================
    [ Carrito ]*/
    (function () {
        var panel = qs('.js-panel-cart');
        on(qsa('.js-show-cart'), 'click', function () { if (panel) panel.classList.add('show-header-cart'); });
        on(qsa('.js-hide-cart'), 'click', function () { if (panel) panel.classList.remove('show-header-cart'); });
    })();


    /*==================================================================
    [ Menu lateral ]*/
    (function () {
        var sidebar = qs('.js-sidebar');
        on(qsa('.js-show-sidebar'), 'click', function () { if (sidebar) sidebar.classList.add('show-sidebar'); });
        on(qsa('.js-hide-sidebar'), 'click', function () { if (sidebar) sidebar.classList.remove('show-sidebar'); });
    })();


    /*==================================================================
    [ +/- cantidad de producto ]*/
    on(qsa('.btn-num-product-down'), 'click', function () {
        var input = this.nextElementSibling;
        var num = Number(input.value);
        if (num > 0) input.value = num - 1;
    });

    on(qsa('.btn-num-product-up'), 'click', function () {
        var input = this.previousElementSibling;
        input.value = Number(input.value) + 1;
    });


    /*==================================================================
    [ Calificacion con estrellas ]*/
    qsa('.wrap-rating').forEach(function (wrap) {
        var items = qsa('.item-rating', wrap);
        var input = qs('input', wrap);
        var rated = -1;
        if (input) input.value = 0;

        function paint(upTo) {
            items.forEach(function (item, i) {
                item.classList.toggle('zmdi-star', i <= upTo);
                item.classList.toggle('zmdi-star-outline', i > upTo);
            });
        }

        items.forEach(function (item, index) {
            item.addEventListener('mouseenter', function () { paint(index); });
            item.addEventListener('click', function () {
                rated = index;
                if (input) input.value = index + 1;
            });
        });

        wrap.addEventListener('mouseleave', function () { paint(rated); });
    });


    /*==================================================================
    [ Ventana modal de producto ]*/
    (function () {
        var modal = qs('.js-modal1');

        on(qsa('.js-show-modal1'), 'click', function (e) {
            e.preventDefault();
            if (modal) modal.classList.add('show-modal1');
        });

        on(qsa('.js-hide-modal1'), 'click', function () {
            if (modal) modal.classList.remove('show-modal1');
        });
    })();


    /*==================================================================
    [ Pestañas ]*/
    on(qsa('[data-tab]'), 'click', function (e) {
        e.preventDefault();

        var link = this;
        var pane = document.getElementById((link.getAttribute('href') || '').replace('#', ''));
        if (!pane || link.classList.contains('active')) return;

        var nav = link.closest('.nav');
        if (nav) qsa('.nav-link.active', nav).forEach(function (a) { a.classList.remove('active'); });
        link.classList.add('active');

        qsa(':scope > .tab-pane.active', pane.parentNode).forEach(function (p) {
            p.classList.remove('active', 'show');
        });

        pane.classList.add('active');
        void pane.offsetWidth;
        pane.classList.add('show');
    });


    /*==================================================================
    [ Parallax de fondo ]*/
    qsa('.parallax100').forEach(function (obj) {
        var speedScroll = 3;

        function setPos() {
            if (window.innerWidth > 992) {
                var x = obj.getBoundingClientRect().top;
                obj.style.backgroundPosition = 'center ' + (x / speedScroll) + 'px';
            } else {
                obj.style.backgroundPosition = 'center';
            }
        }

        setPos();
        window.addEventListener('resize', setPos);
        window.addEventListener('scroll', setPos);
    });


    /*==================================================================
    [ Lista de deseos / carrito: avisos ]*/
    (function () {
        function nameFrom(el, levels, selector) {
            var node = el;
            for (var i = 0; i < levels && node; i++) node = node.parentElement;
            var target = node ? node.querySelector(selector) : null;
            return target ? target.textContent.trim() : '';
        }

        on(qsa('.js-addwish-b2, .js-addwish-detail'), 'click', function (e) { e.preventDefault(); });

        qsa('.js-addwish-b2').forEach(function (btn) {
            var name = nameFrom(btn, 2, '.js-name-b2');
            btn.addEventListener('click', function () {
                showAlert(name, 'se agregó a la lista de deseos.', 'success');
                btn.classList.add('js-addedwish-b2');
            }, { once: true });
        });

        qsa('.js-addwish-detail').forEach(function (btn) {
            var name = nameFrom(btn, 3, '.js-name-detail');
            btn.addEventListener('click', function () {
                showAlert(name, 'se agregó a la lista de deseos.', 'success');
                btn.classList.add('js-addedwish-detail');
            }, { once: true });
        });

        qsa('.js-addcart-detail').forEach(function (btn) {
            var name = nameFrom(btn, 4, '.js-name-detail');
            btn.addEventListener('click', function () {
                showAlert(name, 'se agregó al carrito.', 'success');
            });
        });
    })();


    /*==================================================================
    [ Barra de desplazamiento personalizada ]*/
    qsa('.js-pscroll').forEach(function (el) {
        if (typeof PerfectScrollbar === 'undefined') return;

        el.style.position = 'relative';
        el.style.overflow = 'hidden';

        var ps = new PerfectScrollbar(el, {
            wheelSpeed: 1,
            scrollingThreshold: 1000,
            wheelPropagation: false
        });

        window.addEventListener('resize', function () { ps.update(); });
    });

})();
