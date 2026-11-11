/*==================================================================
[ Alerta modal ]
Reemplazo en JavaScript puro de la ventana de confirmacion.
Uso: showAlert(titulo, texto, "success")
==================================================================*/
(function () {
    "use strict";

    var overlay = null;
    var lastFocus = null;

    function close() {
        if (!overlay) return;
        var el = overlay;
        overlay = null;
        el.classList.remove('swal-overlay--show-modal');
        document.removeEventListener('keydown', onKey);
        setTimeout(function () {
            if (el.parentNode) el.parentNode.removeChild(el);
            if (lastFocus && lastFocus.focus) lastFocus.focus();
        }, 300);
    }

    function onKey(e) {
        if (e.key === 'Escape') close();
    }

    function showAlert(title, text, icon, buttonText) {
        if (overlay) close();
        lastFocus = document.activeElement;

        var ov = document.createElement('div');
        ov.className = 'swal-overlay';
        ov.tabIndex = -1;

        var modal = document.createElement('div');
        modal.className = 'swal-modal';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');

        if (icon) {
            var ic = document.createElement('div');
            ic.className = 'swal-icon swal-icon--' + icon;
            modal.appendChild(ic);
        }

        if (title) {
            var t = document.createElement('div');
            t.className = 'swal-title';
            t.textContent = title;
            modal.appendChild(t);
        }

        if (text) {
            var p = document.createElement('div');
            p.className = 'swal-text';
            p.textContent = text;
            modal.appendChild(p);
        }

        var footer = document.createElement('div');
        footer.className = 'swal-footer';
        var wrap = document.createElement('div');
        wrap.className = 'swal-button-container';
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'swal-button swal-button--confirm';
        btn.textContent = buttonText || 'Aceptar';
        wrap.appendChild(btn);
        footer.appendChild(wrap);
        modal.appendChild(footer);

        ov.appendChild(modal);
        document.body.appendChild(ov);
        overlay = ov;

        btn.addEventListener('click', close);
        ov.addEventListener('click', function (e) {
            if (e.target === ov) close();
        });
        document.addEventListener('keydown', onKey);

        // Fuerza el reflujo para animar la aparicion
        void ov.offsetWidth;
        ov.classList.add('swal-overlay--show-modal');
        btn.focus();
    }

    window.showAlert = showAlert;
})();
