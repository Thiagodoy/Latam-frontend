import Modal from '../components/modal/message-dialog.vue';
const mixin = {
    methods: {
        mxShowModal(options) {
            return Modal.show(options);
        },
        mxShowModalError(erro) {
            console.info(erro);
            let message = this.$t(`lang.msg_error_${erro.codeMessage}`)
            Modal.show({ title: "Erro", message: message });
        }
    }
}
export default mixin;