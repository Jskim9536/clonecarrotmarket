import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { Responsetype } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Responsetype>,
) {
  const { token } = req.body;
  const foundToken = await client.token.findUnique({
    where: {
      payload: token,
    },
    include: {
      user: true, //user data를 포함시킨다.
    },
  });
  if (!foundToken) {
    return res.status(400).end();
  }
  req.session.user = {
    id: foundToken?.userId,
  };
  await req.session.save(); //암호화해서 저장하는 방식  //destroy() 하면 로그아웃 방식
  await client.token.deleteMany({
    where: {
      userId: foundToken?.userId,
    },
  }); //인증되면 기존 토큰은 삭제한다.
  res.json({ ok: true });
  res.status(200).end();
  console.log(token);
  console.log("userId", req.session);
}
export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler: handler,
  }),
);

//post인지 체크 하고 함수 실행시키기 때문에 서버를 보호할 수 있음.
