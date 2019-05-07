import Modal from '../components/modal/message-dialog.vue';
const mixin = {
    methods: {
        mxShowModal(options) {
            return Modal.show(options);
        },
        mxShowModalError(erro) {
            console.info(erro);

            let message = erro.stack ? erro.message : this.$t(`lang.msg_error_${erro.codeMessage}`)
           //message += erro.result && erro.result.length > 0 ? '\n' + erro.result : '';
            Modal.show({ title: "Erro", message: message });
        },

        mxShowModalAlerta(erro) {
            console.info(erro);

            let message = erro.stack ? erro.message : this.$t(`lang.msg_error_${erro.codeMessage}`)
            message += erro.result && erro.result.length > 0 ? '\n' + erro.result : '';
            Modal.show({ title: "Alerta", message: message });
        }
    }
}
export default mixin;