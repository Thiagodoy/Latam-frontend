import { Validator } from 'vee-validate';
import { accountExists } from './user'


const dictionary = {
    brasil: {
        messages: {
            required: () => 'Campo é obrigatório.',
            min: (field, arg) => `Tamanho mínimo do campo de ${arg} caracteres.`,
            max: (field, arg) => `Tamanho máximo do campo de ${arg} caracteres.`,
            after: (field) => `Campo deve ser após ${field}`,
            confirmed: (field) => `Senhas não conferem`,
            email: (field) => 'O formato do e-mail é inválido.',
            decimal: (field) => 'Campo deve ser numérico',
            max_value: (field, arg) => `Campo inválido(a) , máximo(a) possível = ${arg} `,
            min_value: (field, arg) => `Campo inválido(a) , mínimo(a) possível = ${arg} `
        }
    }
};



const plugin = {};

plugin.install = function(Vue, options) {
    Validator.extend('userExists', accountExists);
};

export { dictionary, plugin }