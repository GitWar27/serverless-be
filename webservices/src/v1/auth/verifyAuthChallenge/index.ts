export const handler = async (event, context) => {
  console.log(
    "[event.request.privateChallengeParameters.answer]",
    event.request.privateChallengeParameters.answer
  );

  console.log(
    "[ event.request.challengeAnswer]",
    event.request.challengeAnswer
  );

  if (
    event.request.privateChallengeParameters.answer ===
    event.request.challengeAnswer
  ) {
    event.response.answerCorrect = true;
  } else {
    event.response.answerCorrect = false;
  }
  return event;
};
