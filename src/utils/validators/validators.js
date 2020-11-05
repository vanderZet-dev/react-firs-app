export const required = (value) => {

    if (!value) return 'Required';
    else return undefined;
}

export const minLength = (minLength) => (value) => {

    if (value) {
        if (value.length < minLength) return `Min length is ${minLength} symbols`;
        else return undefined;
    }
    else return undefined;
}

export const maxLength = (maxLength) => (value) => {

    if (value) {
        if (value.length > maxLength) return `Max length is ${maxLength} symbols`;
        else return undefined;
    }
    else return undefined;
}

