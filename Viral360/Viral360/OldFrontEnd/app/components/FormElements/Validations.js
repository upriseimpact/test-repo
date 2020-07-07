export function requireText(text) {
    if (typeof text !== 'string' || text === '') {
        throw new Error('required text');
    }

    return text;
}

export function requireEmail(email) {
    const regex = RegExp(/^\S+@\S+\.\S+$/);

    if (!regex.test(email)) {
        throw new Error('valid email address required');
    }

    return email;
}
