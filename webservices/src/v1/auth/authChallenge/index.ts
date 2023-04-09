import { sendAuthCode } from "../../../utils/sendEmail";

export const handler = async (event) => {
  console.log("[event.request.session]", event.request.session);
  console.log("[event.request]", event.request);

  if (!event.request.session || event.request.session.length === 0) {
    const email = event.request.userAttributes.email;
    const otp = Math.floor(100000 + Math.random() * 900000);

    const message = `
    <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        </head>
        <body>
          <p></p>
          <p style = "color :#333333; font-family: Arial;font-size: 16px;">Please use the OTP code below to verify your access to the PTDS portal</p>

          <p></p>
          <p></p>

          <p style = "color :#333333; font-family: Arial; font-size: 14px;">Enter this OTP code,</p>
          <p style = "color: #2E76BB;font-family: Arial;font-style: normal;font-weight: bold;font-size: 24px;line-height: 28px;">${otp}</p>

          <p></p>
            <p style= "font-family: Arial;
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            line-height: 16px;
            color: #333333;">-PTDS OXFAM Pilipinas team</p>
            <p style ="font-family: Arial;
            font-style: normal;
            font-weight: normal;
            font-size: 12px;
            line-height: 14px;
            color: #9E9E9E;"><em>This is an automatically generated e-mail. Please do not reply. Copyright &copy; 2022 Oxfam. All rights reserved.</em></p>
        </body>
    </html>
    `;

    const handleSendEmail = await sendAuthCode(email, message);

    console.log("[handleSendEmail]", handleSendEmail);

    event.response.privateChallengeParameters = {
      answer: otp,
    };

    event.response.challengeMetadata = "CUSTOM_CHALLENGE";
  }

  return event;
};
