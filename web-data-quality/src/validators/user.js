import account from "../services/user";
import UserStore from "../store/user";


function validaAccount(val, args) {
    return account.checkCpfCnpj(val).then(r => {
        return {
            valid: !r
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

function validaCPF(cpf, args)
  {   
    cpf = cpf.replace(/(\.|-)+/g,'');

    var numeros, digitos, soma, i, resultado, digitos_iguais;
    digitos_iguais = 1;
    if (cpf.length < 11)
          return false;
    for (i = 0; i < cpf.length - 1; i++)
          if (cpf.charAt(i) != cpf.charAt(i + 1))
                {
                digitos_iguais = 0;
                break;
                }
    if (!digitos_iguais)
          {
          numeros = cpf.substring(0,9);
          digitos = cpf.substring(9);
          soma = 0;
          for (i = 10; i > 1; i--)
                soma += numeros.charAt(10 - i) * i;
          resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
          if (resultado != digitos.charAt(0))
                return false;
          numeros = cpf.substring(0,10);
          soma = 0;
          for (i = 11; i > 1; i--)
                soma += numeros.charAt(11 - i) * i;
          resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
          if (resultado != digitos.charAt(1))
                return false;
          return true;
          }
    else
        return false;
  }

export const validCpf = {    
    validate(value, args) {
        return validaCPF(value, args);
    }
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