import { ValidationErrorType } from "../types/validationError.type";

export const isEmail = (email: String) => {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(!email.match(validRegex)) return false;
    return true;
};

export const isPhoneNumberValid = (phoneNumber: String) => {
    const validRegex = /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/;
    if(!phoneNumber.match(validRegex)) return false;
    return true;
};

export const isPasswordValid = (password: String) => {
    if(!password || password.length < 8) return false;
    if(!password.match(/^\S*$/)) return false;
    return true;
}

export const comparePasswords = (password1: String, password2: String) => {
    if(!password1.length || !password2.length) return false;
    if(password1 !== password2) return false;
    return true;
}

export const validateRegisterFields = (data: any) => {
    const { email, phonenumber, password1, password2 } = data;
    const error: ValidationErrorType[] = [];
    if(!isEmail(email)) {
        error.push({
            field: 'email',
            message: 'The email is not valid.'
        });
    };
    if(!isPhoneNumberValid(phonenumber)) {
        error.push({
            field: 'phonenumber',
            message: 'The phone number is not valid for Argentina.'
        });
    }
    if(!isPasswordValid(password1)) {
        error.push({
            field: 'password',
            message: 'The password is not valid.'
        });
    };

    if(!comparePasswords(password1, password2)) {
        error.push({
            field: 'passwords',
            message: 'The passwords are not equals.'
        });
    }
    if(error.length > 0) return {hasError: true, error};
    return {hasError: false, error};
};