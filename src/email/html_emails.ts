export const activationAccountEmail = (verifyCode: Number) => {
    return `
        <h1 style="color:#4B556B;">Te damos la bienvenida a <span style="color:#FC6767;">Jodita App</span></h1>
        <h3 style="color:#4B556B;">Este es el código para activar tu cuenta</h3>
        <span style="color:#4B556B;font-size:24px">${verifyCode}</span>
    `
};

export const restorePasswordEmail = (restorePasswordCode: Number) => {
    return `
        <h1 style="color:#4B556B;">Código de recuperación en tu cuenta de <span style="color:#FC6767;">Jodita App</span></h1>
        <h3 style="color:#4B556B;">Este es el código para recuperar tu contraseña</h3>
        <span style="color:#4B556B;font-size:24px">${restorePasswordCode}</span>
    `
};