import account from "../services/user";


function validaAccount(val, args) {
    return account.checkCpfCnpj(val).then(r => {
        return {
            valid: r
        }
    });
}





export const accountExists = {
    messages: {
        en: (field, args) => {
            return "CPF/CNPJ já cadastrado!";
        },
        'pt_BR': (field, args) => {
            return "CPF/CNPJ já cadastrado!";
        }
    },
    validate(value, args) {
        return validaAccount(value, args);
    }
};