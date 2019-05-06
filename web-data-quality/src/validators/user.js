import account from "../services/user";
import UserStore from "../store/user";


function validaAccount(val, args) {
    return account.checkCpfCnpj(val).then(r => {
        return {
            valid: r
        }
    });
}


function validaNroMaxAge(val,args){  

    if( args.some(g => g == 'master agência' || g == 'agência')){
        return {valid: !(val.length > 1)};
    }  

    return {valid:true};

}

function validaNroMaxPerf(val,args){  

  
    return {valid:val.length == 1};

}

export const validaNroMaxPerfil = {
    messages: {
        en: (field, args) => {
            return "CPF/CNPJ já cadastrado!";
        },
        'pt_BR': (field, args) => {
            return "CPF/CNPJ já cadastrado!";
        }
    },
    validate(value, args) {
        return validaNroMaxPerf(value, args);
    }
};

export const validaNroMaxAgencia = {
    messages: {
        en: (field, args) => {
            return "CPF/CNPJ já cadastrado!";
        },
        'pt_BR': (field, args) => {
            return "CPF/CNPJ já cadastrado!";
        }
    },
    validate(value, args) {
        return validaNroMaxAge(value, args);
    },
    hasTarget: true
};

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