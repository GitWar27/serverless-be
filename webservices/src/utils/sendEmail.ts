import aws from "aws-sdk";

const ses = new aws.SES({ region: "ap-southeast-1" });

export const sendAdminEmail: any = async (email: any) => {
  try {
    const params: any = {
      Source: "RCadayongCaalim@oxfam.org.uk",
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Text: {
            Data: `A new APP Registration has been requested. Please signin and check in https://www.oxfam.com`,
          },
        },
        Subject: {
          Data: "From Oxfam Registration Confirmation",
        },
      },
    };

    const result = await ses.sendEmail(params).promise();

    console.log("[result]:", result);

    return {
      status_code: 200,
      body: "Email was sent successfully",
    };
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

export const sendEmail: any = async (email: any) => {
  try {
    const params: any = {
      Source: "RCadayongCaalim@oxfam.org.uk",
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Text: {
            Data: "Hello! " + email,
          },
        },
        Subject: {
          Data: "From Oxfam Registration Confirmation",
        },
      },
    };
    const result = await ses.sendEmail(params).promise();

    console.log("[result]:", result);

    return {
      status_code: 200,
      body: "Email was sent successfully",
    };
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

export const sendAuthCode: any = async (email: string, messageBody: any) => {
  try {
    const params: any = {
      Source: "RCadayongCaalim@oxfam.org.uk",
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: messageBody,
          },
        },
        Subject: {
          Data: "PTDS OTP Verification",
        },
      },
    };
    const result = await ses.sendEmail(params).promise();

    console.log("[result]:", result);

    return {
      status_code: 200,
      body: "Email was sent successfully",
    };
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};
