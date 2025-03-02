import { useEffect, useState } from "react";
import { ZodType } from "zod";

interface Field {
  value: string;
  schema: ZodType<any, any>;
  checkExists?: (val: string) => Promise<boolean>;
}

export function useValidation(fields: Field[]): boolean {
  const [hasErrors, setHasErrors] = useState(false);

  useEffect(
    () => {
      async function validateFields() {
        for (const field of fields) {
          if (!field.schema.safeParse(field.value).success) {
            console.log("Field value:", field.value, "Has error:", true);
            setHasErrors(true);
            return;
          }

          if (field.checkExists && (await field.checkExists(field.value))) {
            console.log("Existance detected for: ", field.value);
            setHasErrors(true);
            return;
          }
        }

        setHasErrors(false);
      }
      validateFields();
    },
    fields.map((f) => f.value)
  );

  return hasErrors;
}
