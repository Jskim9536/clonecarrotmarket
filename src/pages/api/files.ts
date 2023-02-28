import withHandler, { Responsetype } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Responsetype>,
) {
  //   const response = await( await fetch(`url${process.env.CF_ID}`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Tpye": "application/json",
  //       Authorization: `Bearer ${process.env.CF_TOKEN}`,
  //     },
  //   })).json();        //CloudFlare에 업로드 시 해당 이미지의 id와 url을 받을 수 있다.
  // 이때 받은 url은 30분 안에 만료되는 1회용이다.
  res.json({
    ok: true,
    // ...response.result,
  });
}

export default withApiSession(
  withHandler({
    methods: ["GET"], //CloudFlare에 항상 url을 요청할 것이기 때문에(mutate는 하지 않는다)
    handler: handler,
  }),
);
