import { withIronSessionApiRoute } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const cookieOptions = {
  cookieName: "carrot-Market",
  password: process.env.COOKIE_CRYPTO!, // ! 달아주면 undefined 일 수 있는 것을 없앨 수 있다.
};

export function withApiSession(fn: any) {
  return withIronSessionApiRoute(fn, cookieOptions);
}
