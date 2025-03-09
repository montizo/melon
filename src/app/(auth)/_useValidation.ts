import { useState, useEffect, useRef } from "react";
import { ZodObject } from "zod";

export default function useValidation<T extends ZodObject<any>>(
  schema: T,
  checkExists: (field: string, value: string) => Promise<boolean> = () =>
    Promise.resolve(false)
) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>(() =>
    Object.keys(schema.shape).reduce<Record<string, string>>((acc, field) => {
      acc[field] = `${
        field.charAt(0).toUpperCase() + field.slice(1)
      } is required`;
      return acc;
    }, {})
  );
  const [isValid, setIsValid] = useState(false);
  const [pendingField, setPendingField] = useState<string | null>(null);

  const debounceTimeouts = useRef<Record<string, NodeJS.Timeout>>({});
  const latestCheck = useRef<Record<string, number>>({});

  const validateField = (name: string, value: string) => {
    const fieldSchema = schema.shape[name];
    if (!fieldSchema) return;

    const result = fieldSchema.safeParse(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: result.success ? "" : result.error.errors[0].message,
    }));

    return result.success;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    const isFieldValid = validateField(name, value);

    if (!isFieldValid || !value.trim()) return;
    if (name !== "username" && name !== "email") return;

    if (debounceTimeouts.current[name]) {
      clearTimeout(debounceTimeouts.current[name]);
    }

    const requestId = Date.now();
    latestCheck.current[name] = requestId;

    debounceTimeouts.current[name] = setTimeout(() => {
      setPendingField(name);

      checkExists(name, value)
        .then((exists) => {
          if (latestCheck.current[name] !== requestId) return;

          setErrors((prevErrors) => {
            if (prevErrors[name]) return prevErrors;
            return {
              ...prevErrors,
              [name]: exists
                ? `${
                    String(name).charAt(0).toUpperCase() + String(name).slice(1)
                  } already exists`
                : "",
            };
          });
        })
        .finally(() => {
          setPendingField(null);
        });
    }, 500);
  };

  useEffect(() => {
    const hasErrors = Object.values(errors).some((error) => error !== "");

    const allFieldsFilled = Object.keys(schema.shape).every(
      (field) => values[field]?.trim() !== ""
    );

    console.log(
      "Doesn't have errors:",
      !hasErrors,
      "All fields filled:",
      allFieldsFilled
    );

    setIsValid(!hasErrors && allFieldsFilled);
  }, [values, errors, schema]);

  useEffect(() => {
    console.log("Errors:", errors);
  }, [errors]);

  return { values, errors, handleChange, isValid, pendingField };
}
