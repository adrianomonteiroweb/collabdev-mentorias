import moment from "moment";
import jwt from "jsonwebtoken";

type User = {
  id: string;
  email: string;
  passcode: any;
};

export class JWTAuth {
  static create(user: User) {
    const access_token = jwt.sign(
      {
        sub: user.id,
        email: user.email.toLowerCase(),
      },
      process.env.TOKEN_KEY || "",
      {
        expiresIn: 262800 * 60, // 6 months in seconds
        algorithm: "HS256",
      }
    );

    const decoded: any = jwt.decode(access_token);
    const expires = moment.unix(decoded.exp);

    delete user?.passcode;

    return { access_token, expires, user };
  }

  static verify(
    access_token: string,
    token_key: string = process.env.TOKEN_KEY || ""
  ) {
    const decoded: any = jwt.verify(access_token, token_key);
    return decoded;
  }

  static decode(access_token: string) {
    return jwt.decode(access_token);
  }

  static custom(data: any, token: string, expiresIn: number) {
    const access_token: any = jwt.sign(
      {
        sub: data.id,
        ...data,
      },
      token,
      {
        expiresIn,
        algorithm: "HS256",
      }
    );

    const decoded: any = jwt.decode(access_token);
    const expires = moment.unix(decoded.exp);

    return { access_token, expires, data };
  }

  static customVerify(access_token: string, token: string) {
    return jwt.verify(access_token, token);
  }

  static createCustom(data: any, token: string, expiresIn: number) {
    const access_token = jwt.sign(data, token, {
      expiresIn, // in seconds
      algorithm: "HS256",
    });

    const decoded: any = jwt.decode(access_token);
    const expires = moment.unix(decoded.exp).toDate();

    return { access_token, expires };
  }
}

export default JWTAuth;
