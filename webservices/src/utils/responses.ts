export const handleSuccess = (body: any): object => {
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
      "Access-Control-Allow-Credentials": true,
      "Content-Type": "application/json",
      "Cache-control": "no-store",
      Pragma: "no-cache",
    },
    body: JSON.stringify(body, null, 2),
  };
};
export const handleCreated = (body: any) => {
  return {
    statusCode: 201,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
      "Access-Control-Allow-Credentials": true,
      "Content-Type": "application/json",
      "Cache-control": "no-store",
      Pragma: "no-cache",
    },
    body: JSON.stringify(body, null, 2),
  };
};
export const handleNoContent = (body: any) => {
  return {
    statusCode: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
      "Access-Control-Allow-Credentials": true,
      "Content-Type": "application/json",
      "Cache-control": "no-store",
      Pragma: "no-cache",
    },
    body: JSON.stringify(body, null, 2),
  };
};
export const handleNotModified = (body: any) => {
  return {
    statusCode: 304,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
      "Access-Control-Allow-Credentials": true,
      "Content-Type": "application/json",
      "Cache-control": "no-store",
      Pragma: "no-cache",
    },
    body: JSON.stringify(body, null, 2),
  };
};

export const handleError = (body: any): object => {
  return {
    statusCode: 400,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
      "Access-Control-Allow-Credentials": true,
      "Content-Type": "application/json",
      "Cache-control": "no-store",
      Pragma: "no-cache",
    },
    body: JSON.stringify(body, null, 2),
  };
};
export const handleUnauthorized = (body: any) => {
  return {
    statusCode: 401,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
      "Access-Control-Allow-Credentials": true,
      "Content-Type": "application/json",
      "Cache-control": "no-store",
      Pragma: "no-cache",
    },
    body: JSON.stringify(body, null, 2),
  };
};
export const handleForbidden = (body: any) => {
  return {
    statusCode: 403,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
      "Access-Control-Allow-Credentials": true,
      "Content-Type": "application/json",
      "Cache-control": "no-store",
      Pragma: "no-cache",
    },
    body: JSON.stringify(body, null, 2),
  };
};
export const handleNotFound = (message: string) => {
  return {
    statusCode: 404,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
      "Access-Control-Allow-Credentials": true,
      "Content-Type": "application/json",
      "Cache-control": "no-store",
      Pragma: "no-cache",
    },
    body: JSON.stringify(
      {
        code: "NotExist",
        name: "NotExist",
        message,
      },
      null,
      2
    ),
  };
};
export const handleNotAllowed = (body: any) => {
  return {
    statusCode: 405,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
      "Access-Control-Allow-Credentials": true,
      "Content-Type": "application/json",
      "Cache-control": "no-store",
      Pragma: "no-cache",
    },
    body: JSON.stringify(body, null, 2),
  };
};
export const handleConflict = (body: any) => {
  return {
    statusCode: 409,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
      "Access-Control-Allow-Credentials": true,
      "Content-Type": "application/json",
      "Cache-control": "no-store",
      Pragma: "no-cache",
    },
    body: JSON.stringify(body, null, 2),
  };
};
export const handleGone = (body: any) => {
  return {
    statusCode: 410,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
      "Access-Control-Allow-Credentials": true,
      "Content-Type": "application/json",
      "Cache-control": "no-store",
      Pragma: "no-cache",
    },
    body: JSON.stringify(body, null, 2),
  };
};
export const handleUnsupported = (body: any) => {
  return {
    statusCode: 415,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
      "Access-Control-Allow-Credentials": true,
      "Content-Type": "application/json",
      "Cache-control": "no-store",
      Pragma: "no-cache",
    },
    body: JSON.stringify(body, null, 2),
  };
};
export const handleUnprocessable = (body: any) => {
  return {
    statusCode: 422,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
      "Access-Control-Allow-Credentials": true,
      "Content-Type": "application/json",
      "Cache-control": "no-store",
      Pragma: "no-cache",
    },
    body: JSON.stringify(body, null, 2),
  };
};
export const handleTooMany = (body: any) => {
  return {
    statusCode: 429,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
      "Access-Control-Allow-Credentials": true,
      "Content-Type": "application/json",
      "Cache-control": "no-store",
      Pragma: "no-cache",
    },
    body: JSON.stringify(body, null, 2),
  };
};
export const handleRequiredBody = () => {
  return {
    statusCode: 422,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
      "Access-Control-Allow-Credentials": true,
      "Content-Type": "application/json",
      "Cache-control": "no-store",
      Pragma: "no-cache",
    },
    body: JSON.stringify(
      {
        code: "BodyException",
        name: "BodyException",
        message: "Request body is required",
      },
      null,
      2
    ),
  };
};
