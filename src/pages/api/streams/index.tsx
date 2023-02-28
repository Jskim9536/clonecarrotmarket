import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { Responsetype } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Responsetype>,
) {
  //   const { name, price, description } = req.body;
  //   const { user } = req.session;

  const {
    body: { name, price, description },
    session: { user },
  } = req;

  const streams = await client.stream.findMany({});
  res.json({ ok: true, streams });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler: handler,
  }),
);

//핸들러 쓰는 이유 : post인지 체크 하고 함수 실행시키기 때문에 서버를 보호할 수 있음.
