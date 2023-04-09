export const handler = (event, _context, callback) => {
  console.log("[event.request]", event.request);
  console.log("[event.triggerSource]", event.triggerSource);
  console.log("[event.userPoolId]", event.userPoolId);

  const message = `
    <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        </head>
        <body>
          <p></p>
          <p style = "color :#333333; font-family: Arial;font-size: 16px;font-weight: bold;">Welcome to Oxfam</p>
          <p style = "color :#333333; font-family: Arial; font-size: 14px;">Here is your verification code,</p>
          <p style = "color: #2E76BB;font-family: Arial;font-style: normal;font-weight: bold;font-size: 24px;line-height: 28px;">${event.request.codeParameter}</p>
          <p></p>
          <p style= "font-family: Arial;
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            line-height: 16px;
            color: #333333;">Warm regards,</p>
            <p style= "font-family: Arial;
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            line-height: 16px;
            color: #333333;">Oxfam Team</p>
            <p style ="font-family: Arial;
            font-style: normal;
            font-weight: normal;
            font-size: 12px;
            line-height: 14px;
            color: #9E9E9E;"><em>This is an automatically generated e-mail. Please do not reply. Copyright &copy; 2022 Oxfam. All rights reserved.</em></p>
        </body>
    </html>
    `;

  const messageInvite = `
    <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        </head>
        <body>
        
          <p></p>
          <p style = "color :#333333; font-family: Arial; font-size: 14px;">You may now access the database system using the following credentials:</p>
          <p></p>

          <p></p>
          <p style = "color :#333333; font-family: Arial; font-size: 14px;">Username: ${event.request.usernameParameter}</p>
          <p style = "color :#333333; font-family: Arial; font-size: 14px;">Temporary password: ${event.request.codeParameter}</p>
          
          <p></p>
          <p></p>
          <p></p>

          <p></p>
          <p style = "color :#333333; font-family: Arial; font-size: 14px;">Visit the PTDS portal and log in using your creds at https://ptds-stg.oxfam.org.ph</p>
          <p></p>

          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>

          <p style= "font-family: Arial;
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            line-height: 16px;
            color: #333333;">- PTDS OXFAM Pilipinas team</p>

            <p style ="font-family: Arial;
            font-style: normal;
            font-weight: normal;
            font-size: 12px;
            line-height: 14px;
            color: #9E9E9E;"><em>This is an automatically generated e-mail. Please do not reply. Copyright © 2022 Oxfam. All rights reserved.</em></p>
        </body>
    </html>
    `;

  if (event.userPoolId === process.env.COGNITO_USER_POOL_ID) {
    if (event.triggerSource === "CustomMessage_ResendCode") {
      event.response.emailMessage = message;
      event.response.emailSubject = "Oxfam - Verification";
    }

    if (event.triggerSource === "CustomMessage_ForgotPassword") {
      event.response.emailMessage = message;
      event.response.emailSubject = "Oxfam - Verification";
    }

    if (event.triggerSource === "CustomMessage_AdminCreateUser") {
      event.response.emailSubject = "Welcome to PTDS portal!";
      event.response.emailMessage = messageInvite;
    }
  }

  console.log("[event.response]", event.response);

  callback(null, event);
};
