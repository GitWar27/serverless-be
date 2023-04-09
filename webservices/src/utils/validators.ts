import isEmpty from "lodash/isEmpty";

export const validator = async (body: any) => {
  let errors: any = [];
  let max = 150;
  await body.forEach(async (item) => {
    const maxLength = item.max === undefined ? max : item.max;
    if (item.type === "text") {
      if (item.optional === true) {
        if (!isEmpty(item.data)) {
          if (item.data.length > maxLength) {
            errors.push({
              resource: "length",
              field: item.field,
              code: maxLength,
            });
          }

          if (isEmpty(item.charset)) {
            const alphabet = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
            const number = /^\d+$/;
            const alphanumeric = /^([a-zA-Z0-9 _-]+)$/;

            if (!isEmpty(item.charset)) {
              if (item.charset === "alphabet") {
                if (!alphabet.test(item.data)) {
                  errors.push({
                    resource: "type",
                    field: item.field,
                    code: "alphabet",
                  });
                }
              }

              if (item.charset === "number") {
                if (!number.test(item.data)) {
                  errors.push({
                    resource: "type",
                    field: item.field,
                    code: "numeric",
                  });
                }
              }

              if (item.charset === "alphanumeric") {
                if (!alphanumeric.test(item.data)) {
                  errors.push({
                    resource: "type",
                    field: item.field,
                    code: "alphanumeric",
                  });
                }
              }
            }
          }
        }
      } else {
        if (isEmpty(item.data)) {
          errors.push({
            resource: "issue",
            field: item.field,
            code: "missing_field",
          });
        } else {
          if (item.data.length > maxLength) {
            errors.push({
              resource: "length",
              field: item.field,
              code: maxLength,
            });
          }

          if (isEmpty(item.charset)) {
            const alphabet = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
            const number = /^\d+$/;
            const alphanumeric = /^([a-zA-Z0-9 _-]+)$/;
            if (!isEmpty(item.charset)) {
              if (item.charset === "alphabet") {
                if (!alphabet.test(item.data)) {
                  errors.push({
                    resource: "type",
                    field: item.field,
                    code: "alphabet",
                  });
                }
              }

              if (item.charset === "number") {
                if (!number.test(item.data)) {
                  errors.push({
                    resource: "type",
                    field: item.field,
                    code: "numeric",
                  });
                }
              }

              if (item.charset === "alphanumeric") {
                if (!alphanumeric.test(item.data)) {
                  errors.push({
                    resource: "type",
                    field: item.field,
                    code: "alphanumeric",
                  });
                }
              }
            }
          }
        }

        if (!new RegExp(item.checker).test(item.data)) {
          errors.push({
            resource: "format",
            field: item.field,
            code: "invalid_format",
            format: item.format,
          });
        }
      }
    }

    if (item.type === "object") {
      if (item.optional === true) {
        if (typeof item.data === "object") {
          errors.push({
            resource: "issue",
            field: item.field,
            code: "data_type",
          });
        }
      } else {
        if (isEmpty(item.data)) {
          errors.push({
            resource: "issue",
            field: item.field,
            code: "missing_field",
          });
        }
      }
    }

    if (item.type === "number") {
      if (item.optional === true) {
        if (!isEmpty(item.data)) {
          if (
            isNaN(item.data) ||
            item.data === null ||
            item.data === undefined ||
            item.data === ""
          ) {
            errors.push({
              resource: "issue",
              field: item.field,
              code: "data_type",
            });
          }
        }
      } else {
        if (
          isNaN(item.data) ||
          item.data === null ||
          item.data === undefined ||
          item.data === ""
        ) {
          errors.push({
            resource: "issue",
            field: item.field,
            code: "missing_field",
          });
        }
      }
    }

    if (item.type === "array") {
      if (item.optional === true) {
        if (!isEmpty(item.data)) {
          const isInValues = item.values.find((value) => value === item.data);

          if (isEmpty(isInValues)) {
            errors.push({
              resource: "issue",
              field: item.field,
              code: "uncompatible_array_value",
            });
          }
        }
      } else {
        if (isEmpty(item.data)) {
          errors.push({
            resource: "issue",
            field: item.field,
            code: "missing_field",
          });
        }

        const isInValues = item.values.find((value) => value === item.data);

        if (isEmpty(isInValues)) {
          errors.push({
            resource: "issue",
            field: item.field,
            code: "uncompatible_array_value",
          });
        }
      }
    }

    if (item.type === "arrayString") {
      if (isEmpty(item.data)) {
        errors.push({
          resource: "issue",
          field: item.field,
          code: "missing_field",
        });
      } else {
        if (!Array.isArray(item.data)) {
          errors.push({
            resource: "issue",
            field: item.field,
            code: "data_type",
          });
        } else {
          if (!isEmpty(item.values)) {
            item.data.map((str) => {
              const isInValues = item.values.find((value) => value === str);

              if (isEmpty(isInValues)) {
                errors.push({
                  resource: "issue",
                  field: item.field,
                  code: `uncompatible_array_values`,
                  values: JSON.stringify(item.values),
                });
              }
            });
          }
        }
      }
    }
  });

  if (!isEmpty(errors)) {
    return {
      code: "ValidationException",
      name: "ValidationException",
      message: "Validation Failed",
      errors,
    };
  }
  return {};
};
