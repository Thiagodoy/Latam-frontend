/**
 * Componente que exibe "caixa de diálogo" como modal na página.
 *
 * Implementado usando um elemento "modal" único no página que é reutilizado a cada
 * mensagem.
 */

// Armazena a instância de componente montada na página.
let store = {
    dialog: undefined
};

export default {

    data() {
        return {
            title: undefined,
            message: undefined,
            type: undefined,
            headerClass: undefined,
            resultCallback: undefined,
            reason: undefined,
            disabled: undefined,
            resultResponse: undefined

        }
    },

    mounted() {
        // Ao montar, atribui a instancia de componente ao "store"        
        store.dialog = this;
    },

    methods: {
        result(res) {
            // retorna o resultado e fecha o modal.
            $(this.$el).modal('hide');

            if (this.type == 'OK-CANCEL-FILE') {
                this.resultCallback({ res, reason: this.reason });
                return;
            }
            if (this.type == 'TEMPLATE') {
                this.resultCallback({ res, result: this.resultResponse });
                this.resultResponse = '';
            }
            this.resultCallback(res);
        }
    },

    /**
     * Método estático para abrir o modal.
     *
     * Os tipos suportados são:
     *  'OK'
     *  'OK-CANCEL'
     *  'YES-NO'
     *  'DOWNLOAD'
     *
     * Retorna uma Promisse com o resultado.
     *
     * @param options objeto com a configuração do modal
     * @param options.title Título
     * @param options.message Mensagem (pode ser HTML)
     * @param options.type Tipo do modal.
     * @param options.headerClass a classe no header do modal. padrão: 'modal-info'
     **/
    show(options) {

        return new Promise((resolve, reject) => {

            store.dialog.title = options.title || '';
            store.dialog.headerClass = options.headerClass || 'modal-info';
            store.dialog.message = options.message || '';
            store.dialog.type = options.type || 'OK';
            store.dialog.resultCallback = resolve;
            store.dialog.reason = options.reason || '';
            store.dialog.disabled = options.disabled || false;
            $(store.dialog.$el).modal('show');
        });
    }
}