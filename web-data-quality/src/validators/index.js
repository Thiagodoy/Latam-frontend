import { Validator } from 'vee-validate';
import { accountExists,validaNroMaxAgencia,validaNroMaxPerfil } from './user'
import { caracterEspecial, passwordLength, passwordLowerCase, passwordUpperCase,caracterRepeated } from './password'


const dictionary = {
    pt_BR: {
        messages: {
            required: () => 'Campo é obrigatório.',
            min: (field, arg) => `Tamanho mínimo do campo de ${arg} caracteres.`,
            max: (field, arg) => `Tamanho máximo do campo de ${arg} caracteres.`,
            after: (field) => `Campo deve ser após ${field}`,
            confirmed: (field) => `Senhas não conferem`,
            email: (field) => 'O formato do e-mail é inválido.',
            decimal: (field) => 'Campo deve ser numérico',
            max_value: (field, arg) => `Campo inválido(a) , máximo(a) possível = ${arg} `,
            min_value: (field, arg) => `Campo inválido(a) , mínimo(a) possível = ${arg}`,
            caracterEspecial: () => 'Senha tem que ter pelo menos 1 caracter especial[ @#$%&*()_+=§ª ]',
            passwordLength: () => 'Senha tem que ter pelo menos 8 caracteres!',
            passwordLowerCase: () => 'Senha tem quem ter pelo menos 1 letra em minuscula!',
            passwordUpperCase: () => 'Senha tem quem ter pelo menos 1 letra em maiscula!',
            passwordCaracterRepeated:()=> 'Senha com pelo menos 3 caracteres repetidos em sequencia!',
            validaNroMaxAgencia:()=> 'Numero máximo para o perfil selecionado é uma agencia',
            validaNroMaxPerfil:()=> 'É permitido selecionar apenas um perfil!'
        }
    },
    en: {
        messages: {
            // required: () => 'Campo é obrigatório.',
            // min: (field, arg) => `Tamanho mínimo do campo de ${arg} caracteres.`,
            // max: (field, arg) => `Tamanho máximo do campo de ${arg} caracteres.`,
            // after: (field) => `Campo deve ser após ${field}`,
            // confirmed: (field) => `Senhas não conferem`,
            // email: (field) => 'O formato do e-mail é inválido.',
            // decimal: (field) => 'Campo deve ser numérico',
            // max_value: (field, arg) => `Campo inválido(a) , máximo(a) possível = ${arg} `,
            // min_value: (field, arg) => `Campo inválido(a) , mínimo(a) possível = ${arg}`,
            caracterEspecial: () => 'Password must be at least 1 special character!',
            passwordLength: () => 'Password must be at least 8 characters!',
            passwordLowerCase: () => 'Password must be at least 1 lowercase letter!',
            passwordUpperCase: () => 'Password must be at least 1 uppercase letter!',
            passwordCaracterRepeated:()=> 'Password with at least 3 characters repeated in sequence!',
            validaNroMaxAgencia:()=> 'Maximum number for the selected profile is an agency!',
            validaNroMaxPerfil:()=> 'Maximum number for the selected profile is an profile!'
        }
    }
};



const plugin = {};

plugin.install = function(Vue, options) {
    Validator.extend('userExists', accountExists);
    Validator.extend('caracterEspecial', caracterEspecial);
    Validator.extend('passwordLength', passwordLength);
    Validator.extend('passwordLowerCase', passwordLowerCase);
    Validator.extend('passwordUpperCase', passwordUpperCase);
    Validator.extend('passwordCaracterRepeated', caracterRepeated);
    Validator.extend('validaNroMaxAgencia', validaNroMaxAgencia,{ hasTarget: true });
    Validator.extend('validaNroMaxPerfil', validaNroMaxPerfil);
    
    
};

export { dictionary, plugin }