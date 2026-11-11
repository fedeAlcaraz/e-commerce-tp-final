/*==================================================================
[ Lightbox ]
Galeria de imagenes en JavaScript puro. Cada contenedor
.gallery-lb abre sus enlaces <a href="imagen"> en una ventana
con navegacion (anterior / siguiente / cerrar / teclado).
==================================================================*/
(function () {
    "use strict";

    var box, bg, content, img, counter, btnPrev, btnNext, btnClose;
    var items = [];
    var current = 0;
    var lastFocus = null;

    function build() {
        if (box) return;

        box = document.createElement('div');
        box.className = 'lightbox';
        box.setAttribute('role', 'dialog');
        box.setAttribute('aria-modal', 'true');

        bg = document.createElement('div');
        bg.className = 'lightbox-bg';

        content = document.createElement('div');
        content.className = 'lightbox-content';

        img = document.createElement('img');
        img.className = 'lightbox-img';
        img.alt = '';

        counter = document.createElement('div');
        counter.className = 'lightbox-counter';

        btnClose = document.createElement('button');
        btnClose.type = 'button';
        btnClose.className = 'lightbox-close';
        btnClose.setAttribute('aria-label', 'Cerrar (Esc)');

        btnPrev = document.createElement('button');
        btnPrev.type = 'button';
        btnPrev.className = 'lightbox-arrow lightbox-prev';
        btnPrev.setAttribute('aria-label', 'Anterior (flecha izquierda)');

        btnNext = document.createElement('button');
        btnNext.type = 'button';
        btnNext.className = 'lightbox-arrow lightbox-next';
        btnNext.setAttribute('aria-label', 'Siguiente (flecha derecha)');

        content.appendChild(img);
        content.appendChild(counter);
        box.appendChild(bg);
        box.appendChild(content);
        box.appendChild(btnClose);
        box.appendChild(btnPrev);
        box.appendChild(btnNext);
        document.body.appendChild(box);

        btnClose.addEventListener('click', close);
        btnPrev.addEventListener('click', function (e) { e.stopPropagation(); go(-1); });
        btnNext.addEventListener('click', function (e) { e.stopPropagation(); go(1); });
        img.addEventListener('click', function (e) { e.stopPropagation(); go(1); });

        // Clic fuera de la imagen (fondo / contenedor) cierra la galeria
        box.addEventListener('click', function (e) {
            if (e.target === box || e.target === bg || e.target === content) close();
        });

        document.addEventListener('keydown', function (e) {
            if (!box.classList.contains('lightbox-open')) return;
            if (e.key === 'Escape') close();
            else if (e.key === 'ArrowLeft') go(-1);
            else if (e.key === 'ArrowRight') go(1);
        });
    }

    function render() {
        var many = items.length > 1;
        img.src = items[current].href;
        counter.textContent = many ? (current + 1) + ' / ' + items.length : '';
        btnPrev.style.display = many ? '' : 'none';
        btnNext.style.display = many ? '' : 'none';
    }

    function go(step) {
        if (items.length < 2) return;
        current = (current + step + items.length) % items.length;
        render();
    }

    function open(list, index) {
        build();
        items = list;
        current = index;
        lastFocus = document.activeElement;
        render();

        box.classList.remove('lightbox-removing');
        box.classList.add('lightbox-open');
        document.body.style.overflow = 'hidden';
        // Fuerza el reflujo para que la transicion de aparicion se ejecute
        void box.offsetWidth;
        box.classList.add('lightbox-ready');
        btnClose.focus();
    }

    function close() {
        if (!box.classList.contains('lightbox-open')) return;
        box.classList.remove('lightbox-ready');
        box.classList.add('lightbox-removing');
        setTimeout(function () {
            box.classList.remove('lightbox-open', 'lightbox-removing');
            document.body.style.overflow = '';
            if (lastFocus && lastFocus.focus) lastFocus.focus();
        }, 300);
    }

    function init() {
        var galleries = document.querySelectorAll('.gallery-lb');

        Array.prototype.forEach.call(galleries, function (gallery) {
            gallery.addEventListener('click', function (e) {
                var link = e.target.closest('a');
                if (!link || !gallery.contains(link) || !link.getAttribute('href')) return;

                e.preventDefault();
                var list = Array.prototype.slice.call(gallery.querySelectorAll('a[href]'));
                open(list, list.indexOf(link));
            });
        });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
