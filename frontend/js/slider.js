/*==================================================================
[ Slider ]
Carrusel en JavaScript puro. Soporta modo desplazamiento y modo
fundido, flechas, puntos (con miniaturas), reproduccion automatica,
configuracion responsive y gestos de arrastre.
==================================================================*/
(function () {
    "use strict";

    function htmlToElement(html) {
        var tpl = document.createElement('div');
        tpl.innerHTML = html.trim();
        return tpl.firstChild;
    }

    function Slider(root, options) {
        var defaults = {
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: false,
            speed: 500,
            infinite: true,
            autoplay: false,
            autoplaySpeed: 3000,
            arrows: true,
            appendArrows: null,
            prevArrow: '<button type="button" class="slider-prev">Anterior</button>',
            nextArrow: '<button type="button" class="slider-next">Siguiente</button>',
            dots: false,
            appendDots: null,
            dotsClass: '',
            customPaging: null,
            responsive: [],
            onInit: null,
            onAfterChange: null
        };

        this.root = root;
        this.base = Object.assign({}, defaults, options);
        this.settings = Object.assign({}, this.base);
        this.current = 0;
        this.timer = null;
        this.afterTimer = null;
        this.dragged = false;

        this.build();
        this.applyResponsive(true);
        this.bind();

        if (typeof this.base.onInit === 'function') this.base.onInit(this);
        this.startAutoplay();
    }

    /*---------------------------------------------
    Construccion del DOM */
    Slider.prototype.build = function () {
        var self = this, o = this.base;

        this.root.classList.add('slider');
        this.root.style.setProperty('--slider-speed', o.speed + 'ms');
        if (o.fade) this.root.classList.add('slider-fade');

        this.slides = Array.prototype.slice.call(this.root.children);

        this.list = document.createElement('div');
        this.list.className = 'slider-list';
        this.track = document.createElement('div');
        this.track.className = 'slider-track';

        this.slides.forEach(function (slide) {
            slide.classList.add('slider-slide');
            self.track.appendChild(slide);
        });

        this.list.appendChild(this.track);
        this.root.appendChild(this.list);

        // Flechas
        if (o.arrows) {
            var host = o.appendArrows || this.root;
            this.prevBtn = htmlToElement(o.prevArrow);
            this.nextBtn = htmlToElement(o.nextArrow);
            this.prevBtn.classList.add('slider-arrow');
            this.nextBtn.classList.add('slider-arrow');
            this.prevBtn.addEventListener('click', function (e) { e.preventDefault(); self.prev(true); });
            this.nextBtn.addEventListener('click', function (e) { e.preventDefault(); self.next(true); });
            host.appendChild(this.prevBtn);
            host.appendChild(this.nextBtn);
        }
    };

    /*---------------------------------------------
    Configuracion responsive (equivale a "max-width") */
    Slider.prototype.applyResponsive = function (force) {
        var width = window.innerWidth;
        var chosen = null;

        (this.base.responsive || []).forEach(function (r) {
            if (width < r.breakpoint && (!chosen || r.breakpoint < chosen.breakpoint)) chosen = r;
        });

        var key = chosen ? chosen.breakpoint : 'base';
        if (!force && key === this.currentKey) return;
        this.currentKey = key;

        this.settings = Object.assign({}, this.base, chosen ? chosen.settings : {});
        this.layout();
    };

    Slider.prototype.maxIndex = function () {
        var s = this.settings;
        return s.fade ? this.slides.length - 1 : Math.max(0, this.slides.length - s.slidesToShow);
    };

    Slider.prototype.layout = function () {
        var s = this.settings, self = this;

        if (!s.fade) {
            var basis = (100 / s.slidesToShow) + '%';
            this.slides.forEach(function (slide) {
                slide.style.flex = '0 0 ' + basis;
                slide.style.width = basis;
            });
        }

        this.current = Math.min(this.current, this.maxIndex());
        this.buildDots();
        this.update(false);
    };

    Slider.prototype.buildDots = function () {
        var self = this, s = this.settings;

        if (this.dotsEl && this.dotsEl.parentNode) this.dotsEl.parentNode.removeChild(this.dotsEl);
        this.dotsEl = null;
        if (!s.dots) return;

        var count = s.fade ? this.slides.length : Math.ceil(this.maxIndex() / s.slidesToScroll) + 1;
        this.dotsEl = document.createElement('ul');
        this.dotsEl.className = 'slider-dots ' + (s.dotsClass || '');

        for (var i = 0; i < count; i++) {
            (function (i) {
                var li = document.createElement('li');
                var index = s.fade ? i : i * s.slidesToScroll;
                li.innerHTML = typeof s.customPaging === 'function'
                    ? s.customPaging(self, index)
                    : '<button type="button">' + (i + 1) + '</button>';
                li.addEventListener('click', function () { self.goTo(index, true); });
                self.dotsEl.appendChild(li);
            })(i);
        }

        (s.appendDots || this.root).appendChild(this.dotsEl);
    };

    /*---------------------------------------------
    Actualiza posicion / estados */
    Slider.prototype.update = function (animate) {
        var s = this.settings, self = this;

        if (!s.fade) {
            this.track.style.transition = animate ? 'transform ' + s.speed + 'ms ease' : 'none';
            this.track.style.transform = 'translate3d(' + (-this.current * 100 / s.slidesToShow) + '%,0,0)';
        }

        this.slides.forEach(function (slide, i) {
            var active = s.fade
                ? i === self.current
                : i >= self.current && i < self.current + s.slidesToShow;
            slide.classList.toggle('slider-active', active);
            slide.setAttribute('aria-hidden', active ? 'false' : 'true');
        });

        if (this.dotsEl) {
            var activeDot = s.fade ? this.current : Math.round(this.current / s.slidesToScroll);
            Array.prototype.forEach.call(this.dotsEl.children, function (li, i) {
                li.classList.toggle('slider-active', i === activeDot);
            });
        }

        if (this.prevBtn && !s.infinite) {
            var atStart = this.current <= 0, atEnd = this.current >= this.maxIndex();
            this.prevBtn.classList.toggle('slider-disabled', atStart);
            this.nextBtn.classList.toggle('slider-disabled', atEnd);
            this.prevBtn.setAttribute('aria-disabled', atStart);
            this.nextBtn.setAttribute('aria-disabled', atEnd);
        }
    };

    Slider.prototype.goTo = function (index, user) {
        var s = this.settings, self = this, max = this.maxIndex();

        if (index > max) index = s.infinite ? 0 : max;
        if (index < 0) index = s.infinite ? max : 0;

        if (index !== this.current) {
            this.current = index;
            this.update(true);

            clearTimeout(this.afterTimer);
            this.afterTimer = setTimeout(function () {
                if (typeof self.base.onAfterChange === 'function') self.base.onAfterChange(self, self.current);
            }, s.speed);
        }

        if (user) this.startAutoplay();
    };

    Slider.prototype.next = function (user) { this.goTo(this.current + this.settings.slidesToScroll, user); };
    Slider.prototype.prev = function (user) { this.goTo(this.current - this.settings.slidesToScroll, user); };

    /*---------------------------------------------
    Reproduccion automatica */
    Slider.prototype.startAutoplay = function () {
        var self = this;
        clearTimeout(this.timer);
        if (!this.settings.autoplay) return;
        this.timer = setTimeout(function () {
            self.next(false);
            self.startAutoplay();
        }, this.settings.autoplaySpeed);
    };

    /*---------------------------------------------
    Eventos: resize + arrastre */
    Slider.prototype.bind = function () {
        var self = this, startX = 0, startY = 0, tracking = false;

        window.addEventListener('resize', function () { self.applyResponsive(false); });

        this.list.addEventListener('dragstart', function (e) { e.preventDefault(); });

        this.list.addEventListener('pointerdown', function (e) {
            if (e.pointerType === 'mouse' && e.button !== 0) return;
            tracking = true;
            self.dragged = false;
            startX = e.clientX;
            startY = e.clientY;
        });

        this.list.addEventListener('pointermove', function (e) {
            if (!tracking) return;
            var dx = e.clientX - startX, dy = e.clientY - startY;
            if (Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) {
                self.dragged = true;
                self.list.classList.add('slider-dragging');
            }
        });

        function end(e) {
            if (!tracking) return;
            tracking = false;
            self.list.classList.remove('slider-dragging');
            var dx = e.clientX - startX;
            if (self.dragged && Math.abs(dx) > 50) dx < 0 ? self.next(true) : self.prev(true);
        }

        this.list.addEventListener('pointerup', end);
        this.list.addEventListener('pointercancel', function () {
            tracking = false;
            self.list.classList.remove('slider-dragging');
        });

        // Evita abrir enlaces (p. ej. galeria) cuando se arrastro
        this.list.addEventListener('click', function (e) {
            if (self.dragged) {
                e.preventDefault();
                e.stopPropagation();
                self.dragged = false;
            }
        }, true);
    };

    window.Slider = Slider;


    /*==================================================================
    [ Inicializacion ]*/
    function init() {

        /*---------------------------------------------
        Slider 1: portada con capas animadas */
        Array.prototype.forEach.call(document.querySelectorAll('.wrap-slick1'), function (wrap) {
            var root = wrap.querySelector('.slick1');
            if (!root) return;

            var items = Array.prototype.slice.call(root.querySelectorAll('.item-slick1'));
            var allLayers = Array.prototype.slice.call(root.querySelectorAll('.layer-slick1'));
            var actions = [];

            function playLayers(index) {
                var layers = Array.prototype.slice.call(items[index].querySelectorAll('.layer-slick1'));

                actions.forEach(clearTimeout);
                actions = [];

                allLayers.forEach(function (layer) {
                    layer.classList.remove(layer.dataset.appear, 'visible-true');
                });

                layers.forEach(function (layer, i) {
                    actions[i] = setTimeout(function () {
                        layer.classList.add(layer.dataset.appear, 'visible-true');
                    }, Number(layer.dataset.delay) || 0);
                });
            }

            var dotsHost = wrap.querySelector('.wrap-slick1-dots');

            new Slider(root, {
                slidesToShow: 1,
                slidesToScroll: 1,
                fade: true,
                speed: 1000,
                infinite: true,
                autoplay: true,
                autoplaySpeed: 6000,
                arrows: true,
                appendArrows: wrap,
                prevArrow: '<button class="arrow-slick1 prev-slick1"><i class="zmdi zmdi-caret-left"></i></button>',
                nextArrow: '<button class="arrow-slick1 next-slick1"><i class="zmdi zmdi-caret-right"></i></button>',
                dots: !!dotsHost,
                appendDots: dotsHost,
                dotsClass: 'slick1-dots',
                customPaging: function (slider, index) {
                    var slide = slider.slides[index];
                    return '<img src="' + slide.dataset.thumb + '">' +
                           '<span class="caption-dots-slick1">' + slide.dataset.caption + '</span>';
                },
                onInit: function () { playLayers(0); },
                onAfterChange: function (slider, index) { playLayers(index); }
            });
        });

        /*---------------------------------------------
        Slider 2: carrusel de productos */
        Array.prototype.forEach.call(document.querySelectorAll('.wrap-slick2'), function (wrap) {
            var root = wrap.querySelector('.slick2');
            if (!root) return;

            new Slider(root, {
                slidesToShow: 4,
                slidesToScroll: 4,
                infinite: false,
                autoplay: false,
                autoplaySpeed: 6000,
                speed: 300,
                arrows: true,
                appendArrows: wrap,
                prevArrow: '<button class="arrow-slick2 prev-slick2"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
                nextArrow: '<button class="arrow-slick2 next-slick2"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
                responsive: [
                    { breakpoint: 1200, settings: { slidesToShow: 4, slidesToScroll: 4 } },
                    { breakpoint: 992,  settings: { slidesToShow: 3, slidesToScroll: 3 } },
                    { breakpoint: 768,  settings: { slidesToShow: 2, slidesToScroll: 2 } },
                    { breakpoint: 576,  settings: { slidesToShow: 1, slidesToScroll: 1 } }
                ]
            });
        });

        /*---------------------------------------------
        Slider 3: galeria del detalle de producto */
        Array.prototype.forEach.call(document.querySelectorAll('.wrap-slick3'), function (wrap) {
            var root = wrap.querySelector('.slick3');
            if (!root) return;

            new Slider(root, {
                slidesToShow: 1,
                slidesToScroll: 1,
                fade: true,
                infinite: true,
                autoplay: false,
                autoplaySpeed: 6000,
                arrows: true,
                appendArrows: wrap.querySelector('.wrap-slick3-arrows'),
                prevArrow: '<button class="arrow-slick3 prev-slick3"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
                nextArrow: '<button class="arrow-slick3 next-slick3"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
                dots: true,
                appendDots: wrap.querySelector('.wrap-slick3-dots'),
                dotsClass: 'slick3-dots',
                customPaging: function (slider, index) {
                    var portrait = slider.slides[index].dataset.thumb;
                    return '<img src=" ' + portrait + ' "/><div class="slick3-dot-overlay"></div>';
                }
            });
        });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
