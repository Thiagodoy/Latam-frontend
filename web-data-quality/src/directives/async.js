import './async.scss';
import $ from 'jquery';

export default {

    inserted(el) {
        let overlay = $("<div  class=' async-overlay'><div class='fundo'></div><div class='spinner'></div></div>");
        $(el).append(overlay).data('overlay-div', overlay);

    },

    update(el, binding) {
        if (binding.value === binding.oldValue) return;
        let $el = $(el);
        let overlay = $el.data('overlay-div');

        // $el.css('position', 'relative');        
        if (binding.modifiers.opacity)
            overlay.addClass('opacity-loading');
        else
            overlay.removeClass('opacity-loading');

        overlay.width($el.width() + 20);
        overlay.height($el.height());
        overlay.show();
        binding.value
            .then(() => overlay.hide())
            .catch(() => overlay.hide());
    }
}