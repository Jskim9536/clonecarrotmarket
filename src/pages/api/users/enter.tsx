import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../../libs/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    req.status(401).end();
  }
  console.log(req.body);
  res.status(200).end();
  // await client.user.create({
  //   data: {
  //     name: "test",
  //     email: "song",
  //   },
  // });

  // res.json({
  //   ok: true,
  // });
}
