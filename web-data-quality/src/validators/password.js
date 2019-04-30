function validaUpperCase(value, args) {
    return { valid: /[A-Z]/.test(value) };
}

function validaLowerCase(value, args) {
    return { valid: /[a-z]+/.test(value) };
}

function validaCaracterEspecial(value, args) {
    console.log('validaCaracterEspecial', (/[!@#$%&*()_+=§ª]+/.test(value)), 'value', value)
    return { valid: (/[!@#$%&*()_+=§ª]+/.test(value)) };
}

function validaLength(value, args) {
    return { valid: (value.length > 8) };
}

export const caracterEspecial = {
    messages: {
        en: (field, args) => {
            return "Password must be at least 1 special character!";
        },
        'pt_BR': (field, args) => {
            return "Senha tem que ter pelo menos 1 caracter especial[ @#$%&*()_+=§ª ]";
        }
    },
    validate(value, args) {
        return validaCaracterEspecial(value, args);
    }
};

export const passwordUpperCase = {
    messages: {
        en: (field, args) => {
            return "Password must be at least 1 uppercase letter!";
        },
        'pt_BR': (field, args) => {
            return "Senha tem quem ter pelo menos 1 letra em maiscula!";
        }
    },
    validate(value, args) {
        return validaUpperCase(value, args);
    }
};

export const passwordLowerCase = {
    messages: {
        en: (field, args) => {
            return "Password must be at least 1 lowercase letter!";
        },
        'pt_BR': (field, args) => {
            return "Senha tem quem ter pelo menos 1 letra em minuscula!";
        }
    },
    validate(value, args) {
        return validaLowerCase(value, args);
    }
};

export const passwordLength = {
    messages: {
        en: (field, args) => {
            return "Password must be at least 8 characters!";
        },
        'pt_BR': (field, args) => {
            return "Senha tem que ter pelo menos 8 caracteres!";
        }
    },
    validate(value, args) {
        return validaLength(value, args);
    }
};