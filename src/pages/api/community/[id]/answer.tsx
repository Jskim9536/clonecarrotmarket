import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { Responsetype } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Responsetype>,
) {
  const {
    query: { id },
    session: { user },
    body: { answer },
  } = req;

  const answers = await client.answer.create({
    data: {
      answer: answer,
      user: {
        connect: {
          id: user?.id,
        },
      },
      post: {
        connect: {
          id: Number(id),
        },
      },
      //   product: {
      //     connect: {
      //       id: undefined,
      //     },
      //   },
    },
  });
  if (!answer) {
    res.status(404).json({ ok: false, error: "Not found post" });
  } else if (answer) {
    res.json({ ok: true, answers });
  }
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler: handler,
  }),
);

//핸들러 쓰는 이유 : post인지 체크 하고 함수 실행시키기 때문에 서버를 보호할 수 있음.
