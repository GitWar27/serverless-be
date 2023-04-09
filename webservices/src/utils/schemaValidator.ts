import Joi from "joi";
import isEmpty from "lodash/isEmpty";

const validator = (schema: object, payload: object) => {
  const model = Joi.object(schema);

  const result = model.validate(payload, { abortEarly: false });

  const errorList: any = result?.error?.details;

  if (isEmpty(result?.error)) {
    return { isValid: 1, result: result.value };
  }

  const errorResult = errorList.map((item) => item.message);

  return { isValid: 0, result: errorResult };
};

export default validator;
