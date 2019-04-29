import Modal from '../components/modal/message-dialog.vue';
const mixin = {
    methods: {
        mxShowModalError(erro) {
            console.info(erro);
            let message = this.$t(`lang.msg_error_${erro.codeMessage}`)
            Modal.show({ title: "Erro", message: message });
        }
    }
}
export default mixin;