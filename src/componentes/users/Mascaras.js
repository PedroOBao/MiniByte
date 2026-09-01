// mascaras.js

export const aplicarMascaraCPF = (value) => {
    value = value.replace(/\D/g, '').slice(0, 11);
    if (value.length > 9) {
        value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (value.length > 6) {
        value = value.replace(/^(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
    } else if (value.length > 3) {
        value = value.replace(/^(\d{3})(\d{0,3})/, '$1.$2');
    }
    return value;
};

export const aplicarMascaraCNPJ = (value) => {
    value = value.replace(/\D/g, '').slice(0, 14);
    if (value.length > 12) {
        value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/, '$1.$2.$3/$4-$5');
    } else if (value.length > 8) {
        value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{0,4})/, '$1.$2.$3/$4');
    } else if (value.length > 5) {
        value = value.replace(/^(\d{2})(\d{3})(\d{0,3})/, '$1.$2.$3');
    } else if (value.length > 2) {
        value = value.replace(/^(\d{2})(\d{0,3})/, '$1.$2');
    }
    return value;
};

export const aplicarMascaraCEP = (value) => {
    value = value.replace(/\D/g, '').slice(0, 8);
    if (value.length > 5) {
        value = value.replace(/^(\d{5})(\d{0,3})/, '$1-$2');
    }
    return value;
};

export const aplicarMascaraTelefone = (value) => {
    value = value.replace(/\D/g, '').slice(0, 11);
    if (value.length > 10) {
        // Celular com 9 dígitos: (XX) 9XXXX-XXXX → (XX) XXXXX-XXXX
        value = value.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (value.length > 6) {
        // Fixo ou celular ainda incompleto
        value = value.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    } else if (value.length > 2) {
        value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
    } else if (value.length > 0) {
        value = `(${value}`;
    }
    return value;
};

export const aplicarMascaraEmail = (value) => {
    return value.trim().toLowerCase();
};