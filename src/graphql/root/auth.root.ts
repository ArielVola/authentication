import { validateRegisterFields } from "../../utils/validations"
import user from '../../models/user';
import { compare, hashText } from "../../utils/bcrypt";
import { generateRandomNumber } from "../../utils/verifyCode";
import { activationAccountEmail, restorePasswordEmail } from "../../email/html_emails";
import { transporter } from "../../config/mailer";
import jwt from 'jsonwebtoken';
import { userForToken } from "../../utils/user";

const secret = process.env.JWT_SECRET;

export const root = {

    register: async (data: any) => {
        const { hasError: fieldsHaveErrors, error } = validateRegisterFields(data);
        if(fieldsHaveErrors) {
            return {
                hasError: fieldsHaveErrors,
                error: JSON.stringify(error),
                success: false
            };
        };
        
        const userFoundByEmail = await user.findOne({ email: data.email });
        if(userFoundByEmail) return {
            hasError: true,
            error: '',
            success: false
        };

        const userFoundByPhonenumber = await user.findOne({ phonenumber: data.phonenumber });
        if(userFoundByPhonenumber) return {
            hasError: true,
            error: '',
            success: false
        };

        const { email, phonenumber, password1: password } = data;
        const { verifyCode } = await user.create(new user({
            email,
            phonenumber,
            password: await hashText(password),
            verifyCode: generateRandomNumber()
        }));
        if( verifyCode ) {
            transporter.sendMail({
                from: '"Activa tu cuenta JoditaApp" <jodita@gmail.com>',
                to: email,
                subject: 'Activa tu cuenta en Jodita',
                html: activationAccountEmail(verifyCode!)
            });
        }else {
            return  {
                hasError: true,
                error: JSON.stringify(error),
                success: false
            };
        }

        return  {
            hasError: false,
            error: JSON.stringify(error),
            success: true
        };
        
    },

    activeAccount: async (data: any) => {
        const { email, activeCode: verifyCode } = data;
        const userFound = await user.findOne({ email, verifyCode });
        if(!userFound || userFound.verifiedAccount) return {
            hasError: true
        };
        
        const userUpdated = await user.findOneAndUpdate({email}, {
            verifiedAccount: true,
            isFirstTime: true
        });
        return {
            hasError: false,
            token: jwt.sign({
                data: userForToken(userUpdated)
              }, secret!, { expiresIn: '90d' })
        };
    },

    signIn: async (data: any) => {
        const { email, password } = data;
        const userFound = await user.findOne({ email });
        if(!userFound) return {
            hasError: true
        };

        if(!userFound.verifiedAccount) return {
            verifiedAccount: false
        }

        if (await compare(password, userFound.password) === false) return {
            hasError: true
        }
        
        const token = jwt.sign({
            data: userForToken(userFound)
          }, secret!, { expiresIn: '90d' });

        return {
            token,
            isFirstTime: userFound.isFirstTime,
            verifiedAccount: userFound.verifiedAccount,
            hasError: false
        };
    },

    sendEmailToRestorePassword: async (data: any) => {
        const { email } = data;
        const userFound = await user.findOne({ email });
        if(!userFound) return false;

        const restorePasswordCode = generateRandomNumber();
        const userUpdated = await user.findOneAndUpdate({ email }, {
            restorePasswordCode
        });
        if(!userUpdated) return false;

        transporter.sendMail({
            from: '"Restaura tu contraseña en Jodita" <jodita@gmail.com>',
            to: email,
            subject: 'Restaura tu contraseña en Jodita',
            html: restorePasswordEmail(restorePasswordCode)
        });
        return true;
    },

    canRestorePassword: async (data: any) => {
        const { email, restorePasswordCode } = data;
        const userFound = await user.findOne({ email, restorePasswordCode });
        if(!userFound) return false;

        return true;
    },

    changePasswordByRestoreCode: async (data: any) => {
        const { email, restorePasswordCode, newPassword } = data;
        const userFound = await user.findOne({ email, restorePasswordCode });
        if(!userFound) return false;

        const userUpdated = await user.findOneAndUpdate({ email, restorePasswordCode }, {
            password: await hashText(newPassword)
        });
        if(!userUpdated) return false;
        return true;
    }
}
