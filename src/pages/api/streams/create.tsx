import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { Responsetype } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Responsetype>,
) {
  const {
    session: { user },
    body: { name, description, price },
  } = req;

  const createStream = await client.stream.create({
    data: {
      name: name,
      description: description,
      price: Number(price),
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
  });
  res.json({ ok: true, createStream });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler: handler,
  }),
);

//post인지 체크 하고 함수 실행시키기 때문에 서버를 보호할 수 있음.
