import { buildSchema } from 'graphql';

export const authSchema = buildSchema(`
    type User {
        id: String,
        email: String
    }

    type ValidationError {
        field: String,
        message: String
    }

    type Response {
        hasError: Boolean,
        error: String,
        success: Boolean
    }

    type SignInResponse {
        token: String,
        isFirstTime: Boolean,
        verifiedAccount: Boolean
        hasError: Boolean
    }

    type ActiveAccountResponse {
        hasError: Boolean,
        token: String
    }

    type Query {
        users: [User]
    }

    type Mutation {
        register(email: String, phonenumber: String, password1: String, password2: String): Response
        activeAccount(email: String, activeCode: Int): ActiveAccountResponse
        signIn(email: String, password: String): SignInResponse
        sendEmailToRestorePassword(email: String): Boolean
        canRestorePassword(email: String, restorePasswordCode: Int): Boolean
        changePasswordByRestoreCode(email: String, restorePasswordCode: Int, newPassword: String): Boolean
    }
`);