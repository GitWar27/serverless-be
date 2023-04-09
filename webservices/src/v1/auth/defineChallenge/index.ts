export const handler = async (event, _, callback) => {
  console.log("[event.response.challengeName]", event.response.challengeName);

  console.log(
    "[event.response.failAuthentication]",
    event.response.failAuthentication
  );

  console.log("[event.request]", event.request);

  if (
    (!event.request.session || event.request.session.length === 0) &&
    event.request.userNotFound === false
  ) {
    // If we don't have a session or it is empty then send a CUSTOM_CHALLENGE
    event.response.challengeName = "CUSTOM_CHALLENGE";
    event.response.failAuthentication = false;
    event.response.issueTokens = false;
  } else if (
    event.request.session.length === 1 &&
    event.request.session[0].challengeResult === true
  ) {
    // If we passed the CUSTOM_CHALLENGE then issue token
    event.response.failAuthentication = false;
    event.response.issueTokens = true;
  } else {
    // Something is wrong. Fail authentication
    event.response.failAuthentication = true;
    event.response.issueTokens = false;
  }
  return callback(null, event);
};
