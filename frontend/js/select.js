/*==================================================================
[ Select personalizado ]
Reemplaza cada <select class="js-select2"> por una lista desplegable
estilizada. El <select> original se conserva (oculto) para que el
valor siga enviandose con el formulario. Usa los mismos nombres de
clase (select2-*) que el diseño ya tenia definidos en main.css.
==================================================================*/
(function () {
    "use strict";

    var openInstance = null;

    function el(tag, className, attrs) {
        var node = document.createElement(tag);
        if (className) node.className = className;
        if (attrs) Object.keys(attrs).forEach(function (k) { node.setAttribute(k, attrs[k]); });
        return node;
    }

    function CustomSelect(select) {
        var self = this;
        this.select = select;
        this.dropParent = select.nextElementSibling && select.nextElementSibling.classList.contains('dropDownSelect2')
            ? select.nextElementSibling : null;
        this.highlighted = -1;
        this.isOpen = false;

        // --- Contenedor visible ---
        this.container = el('span', 'select2 select2-container select2-container--default');
        var selectionWrap = el('span', 'selection');
        this.selection = el('span', 'select2-selection select2-selection--single', {
            role: 'combobox', 'aria-haspopup': 'true', 'aria-expanded': 'false', tabindex: select.tabIndex >= 0 ? '0' : '-1'
        });
        this.rendered = el('span', 'select2-selection__rendered');
        var arrow = el('span', 'select2-selection__arrow', { role: 'presentation' });
        arrow.appendChild(el('b', null, { role: 'presentation' }));

        this.selection.appendChild(this.rendered);
        this.selection.appendChild(arrow);
        selectionWrap.appendChild(this.selection);
        this.container.appendChild(selectionWrap);

        select.classList.add('select2-hidden-accessible');
        select.setAttribute('tabindex', '-1');
        select.setAttribute('aria-hidden', 'true');
        select.parentNode.insertBefore(this.container, select.nextSibling);

        this.updateRendered();

        // --- Eventos ---
        this.selection.addEventListener('mousedown', function (e) {
            e.preventDefault();
            self.selection.focus();
            self.isOpen ? self.close() : self.open();
        });

        this.selection.addEventListener('keydown', function (e) { self.onKeydown(e); });
        select.addEventListener('change', function () { self.updateRendered(); });
    }

    CustomSelect.prototype.options = function () {
        return Array.prototype.slice.call(this.select.options);
    };

    CustomSelect.prototype.updateRendered = function () {
        var opt = this.select.options[this.select.selectedIndex];
        var text = opt ? opt.textContent : '';
        this.rendered.textContent = text;
        this.rendered.title = text;
    };

    CustomSelect.prototype.open = function () {
        if (this.isOpen || this.select.disabled) return;
        if (openInstance && openInstance !== this) openInstance.close();
        openInstance = this;
        this.isOpen = true;

        var self = this;
        var opts = this.options();
        var parent = this.dropParent || this.container.parentNode;

        // --- Lista desplegable ---
        this.dropContainer = el('span', 'select2-container select2-container--default select2-container--open');
        this.dropContainer.style.display = 'block';
        this.dropContainer.style.position = 'static';
        var dropdown = el('span', 'select2-dropdown select2-dropdown--below');
        var results = el('span', 'select2-results');
        this.list = el('ul', 'select2-results__options', { role: 'listbox' });

        opts.forEach(function (opt, i) {
            var li = el('li', 'select2-results__option', {
                role: 'option',
                'aria-selected': i === self.select.selectedIndex ? 'true' : 'false'
            });
            li.textContent = opt.textContent;
            if (opt.disabled) li.setAttribute('aria-disabled', 'true');
            li.addEventListener('mouseenter', function () { self.highlight(i); });
            li.addEventListener('mousedown', function (e) { e.preventDefault(); });
            li.addEventListener('click', function () { if (!opt.disabled) self.choose(i); });
            self.list.appendChild(li);
        });

        results.appendChild(this.list);
        dropdown.appendChild(results);
        this.dropContainer.appendChild(dropdown);
        parent.appendChild(this.dropContainer);

        this.container.classList.add('select2-container--open', 'select2-container--focus');
        this.selection.setAttribute('aria-expanded', 'true');

        this.position();
        this.highlight(this.select.selectedIndex);

        this.onDocClick = function (e) {
            if (!self.container.contains(e.target) && !self.dropContainer.contains(e.target)) self.close();
        };
        this.onResize = function () { self.position(); };
        document.addEventListener('mousedown', this.onDocClick);
        window.addEventListener('resize', this.onResize);
    };

    CustomSelect.prototype.position = function () {
        var holder = this.dropParent;
        if (!holder) return;
        var base = holder.offsetParent || document.body;
        var baseRect = base.getBoundingClientRect();
        var rect = this.container.getBoundingClientRect();
        holder.style.top = (rect.bottom - baseRect.top) + 'px';
        holder.style.left = (rect.left - baseRect.left) + 'px';
        holder.style.width = rect.width + 'px';
    };

    CustomSelect.prototype.close = function () {
        if (!this.isOpen) return;
        this.isOpen = false;
        if (openInstance === this) openInstance = null;

        if (this.dropContainer && this.dropContainer.parentNode) {
            this.dropContainer.parentNode.removeChild(this.dropContainer);
        }
        this.container.classList.remove('select2-container--open', 'select2-container--focus');
        this.selection.setAttribute('aria-expanded', 'false');
        document.removeEventListener('mousedown', this.onDocClick);
        window.removeEventListener('resize', this.onResize);
    };

    CustomSelect.prototype.highlight = function (index) {
        var items = this.list.children;
        if (!items.length) return;
        index = Math.max(0, Math.min(items.length - 1, index));
        if (this.highlighted >= 0 && items[this.highlighted]) {
            items[this.highlighted].classList.remove('select2-results__option--highlighted');
        }
        this.highlighted = index;
        items[index].classList.add('select2-results__option--highlighted');
        // Mantiene visible la opcion resaltada
        var it = items[index], box = this.list;
        if (it.offsetTop < box.scrollTop) box.scrollTop = it.offsetTop;
        else if (it.offsetTop + it.offsetHeight > box.scrollTop + box.clientHeight) {
            box.scrollTop = it.offsetTop + it.offsetHeight - box.clientHeight;
        }
    };

    CustomSelect.prototype.choose = function (index) {
        this.select.selectedIndex = index;
        this.updateRendered();
        this.close();
        this.selection.focus();
        this.select.dispatchEvent(new Event('change', { bubbles: true }));
    };

    CustomSelect.prototype.onKeydown = function (e) {
        var key = e.key;
        if (!this.isOpen) {
            if (key === 'Enter' || key === ' ' || key === 'ArrowDown' || key === 'ArrowUp') {
                e.preventDefault();
                this.open();
            }
            return;
        }
        if (key === 'ArrowDown') { e.preventDefault(); this.highlight(this.highlighted + 1); }
        else if (key === 'ArrowUp') { e.preventDefault(); this.highlight(this.highlighted - 1); }
        else if (key === 'Enter' || key === ' ') { e.preventDefault(); this.choose(this.highlighted); }
        else if (key === 'Escape') { e.preventDefault(); this.close(); }
        else if (key === 'Tab') { this.close(); }
    };

    function init() {
        Array.prototype.forEach.call(document.querySelectorAll('.js-select2'), function (select) {
            new CustomSelect(select);
        });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
