import { Auth, User } from "../models";
import addMinutes from "date-fns/addMinutes";
import { randomCode } from "../lib/utils/random-numbers";
import { createToken } from "../lib/jwt";
import { sendgridMail } from "../lib/sendgrid";

interface userProps {
  email: string;
  full_name: string;
}

//function create user or find user
const createUser = async (userInfo: userProps) => {
  const { full_name, email } = userInfo;

  const [user] = await User.findOrCreate({
    where: { email },
    defaults: {
      full_name,
      email,
    },
  });

  const [auth] = await Auth.findOrCreate({
    where: { user_id: user.get("id") },
    defaults: {
      email,
      code: 0,
      expiration: new Date().toLocaleTimeString("es-AR"),
    },
  });

  return { user, auth };
};

//update code and set expiration time
const updateAuth = async (email: string) => {
  const authCode = randomCode();
  try {
    const response = await Auth.update(
      {
        code: authCode,
        expiration: addMinutes(new Date(), 10).toLocaleTimeString("es-AR"),
      },
      { where: { email } }
    );

    await sendgridMail({
      to: email,
      subject: "¡Código de autenticación para Ayuda Ciudadana!",
      template: 1,
      params: { code: authCode, email },
    });

    return response;
  } catch (error) {
    throw error;
  }
};

//send email with code
export const sendCode = async (userInfo: userProps) => {
  try {
    const { user } = await createUser(userInfo);
    const email = user.get("email");
    await updateAuth(email as string);
    return `un email ha sido enviado a ${email}`;
  } catch (error) {
    throw error;
  }
};

//verify user exist and code validation, then return a token.
export const findUserAndVerifyCode = async (email: string, code: number) => {
  try {
    const response = await Auth.findOne({ where: { email } });
    const actualTime = new Date().toLocaleTimeString("es-AR");
    const expirationTime = response?.get("expiration") as string;
    const securityCode = response?.get("code") as number;

    if (securityCode === code && code) {
      response?.update({ code: 0 });
      return createToken(response?.get("user_id") as string);
    } else {
      throw "ya pasó diez minutos o el código es incorrecto";
    }
  } catch (error) {
    throw error;
  }
};
