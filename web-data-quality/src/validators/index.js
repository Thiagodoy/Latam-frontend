import { Validator } from 'vee-validate'


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

export { dictionary }