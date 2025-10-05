import { useEffect, useState } from "react";
import { validateContactForm } from "@/app/_utils/validation";
import { FormData, Errors } from "@/app/_types";

export function useFormErrors({ name, email, message }: FormData) {
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    const newErrors = validateContactForm({ name, email, message });
    setErrors(newErrors);
  }, [name, email, message]);

  return { errors };
}