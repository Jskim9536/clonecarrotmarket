import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler, { Responsetype } from "@libs/server/withHandler";
import twilio from "twilio";
import smtpTransport from "@libs/server/email";

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Responsetype>,
) {
  const { phone, email } = req.body;
  const user = phone ? { phone } : email ? { email } : null; //분기장소
  if (!user) return res.status(400).json({ ok: false });
  const payload = Math.floor(100000 + Math.random() * 900000) + "";
  const token = await client.token.create({
    data: {
      payload: payload,
      user: {
        connectOrCreate: {
          //user 가 존재하면 컨넥 하고  없으면 크리에이트 한다.
          where: {
            ...user, //phone 이 있으면 phone번호를 찾고
          }, // 먼저 해당 phone number을 가진 사람을 찾고
          create: {
            name: "Anything",
            ...user, //phone 이 있으면 phone번호를 찾고
          }, // 없으면 create
        },
      },
    },
  });
  console.log("token:", token);
  if (phone) {
    // const message = await twilioClient.messages.create({
    //   messagingServiceSid: process.env.TWILIO_MSID,
    //   to: process.env.MY_PHONE!,
    //   // from: "+12185036553", // MSID가 없을 때
    //   body: `Your Login Token is ${payload}`,
    // });
    // console.log(message);
  }
  if (email) {
    const mailOptions = {
      from: process.env.MAIL_ID,
      to: email,
      subject: "Nomad Carrot Authentication Email",
      text: `Authentication Code : ${payload}`,
    };
    const result = await smtpTransport.sendMail(
      mailOptions,
      (error, responses) => {
        if (error) {
          console.log(error);
          return null;
        } else {
          console.log(responses);
          return null;
        }
      },
    );
    smtpTransport.close();
    console.log(result);
  }
  return res.json({
    ok: true,
  });
}
export default withHandler({
  methods: ["POST"],
  handler: handler,
  isPrivate: false,
}); //post인지 체크 하고 함수 실행시키기 때문에 서버를 보호할 수 있음.

//참고자료
// await client.user.create({
//   data: {
//     name: "test",
//     email: "song",
//   },
// });

// res.json({
//   ok: true,
// });

//*******
// const user = await client.user.upsert({
//   where: {
//     ...payload, //phone 이 있으면 phone번호를 찾고
//   }, // 먼저 해당 phone number을 가진 사람을 찾고
//   create: {
//     name: "Anything",
//     ...payload, //phone 이 있으면 phone번호를 찾고
//   }, // 없으면 create
//   update: {}, // 있더라도 수정이 필요하면 update 함수 사용
// }); */

// if (email) {
//   console.log(email, "is here");
//   user = await client.user.findUnique({
//     where: {
//       email: email,
//     },
//   });
//   if (user) {
//     console.log("find it");
//   }
//   if (!user) {
//     console.log("유저를 찾지 못했습니다. 생성하곘습니다.");
//     user = await client.user.create({
//       data: {
//         name: "Anonymous",
//         email,
//       },
//     });
//   }
//   console.log(user);
// }
// if (phone) {
//   console.log(phone, "is here");
//   user = await client.user.findUnique({
//     where: {
//       phone: +phone,  //string 을 number 로 바꾸는 작업
//     },
//   });
//   if (user) {
//     console.log("find it");
//   }
//   if (!user) {
//     console.log("유저를 찾지 못했습니다. 생성하곘습니다.");
//     user = await client.user.create({
//       data: {
//         name: "Anonymous",
//         phone: +phone,
//       },
//     });
//   }
//   console.log(user);
// }
