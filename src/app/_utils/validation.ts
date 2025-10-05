import { FormData, Errors } from "@/app/_types";

export function validateContactForm({ name, email, message }: FormData): Errors {
  const errors: Errors = {};

  if (!name) errors.name = "名前は必須です";
  else if (name.length > 30) errors.name = "30文字以内で入力してください";

  if (!email) errors.email = "メールアドレスは必須です";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "正しいメールアドレスを入力してください";

  if (!message) errors.message = "本文は必須です";
  else if (message.length > 500)
    errors.message = "500文字以内で入力してください";

  return errors;
}