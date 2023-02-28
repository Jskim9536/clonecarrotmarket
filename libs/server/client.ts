import { PrismaClient } from "@prisma/client";

//declare
//declare를 통해서 타입이 정해져있지 않으며 이미 존재하는 함수나 변수를 컴퍼일러에게 알려줄 수 있다. (이 코드는 자바스크립트로 컴파일되지 않는다)

declare global {
  var client: PrismaClient | undefined;
}

const client = global.client || new PrismaClient();
if (process.env.NODE_ENV == "development") {
  global.client = client;
}

export default new PrismaClient();
