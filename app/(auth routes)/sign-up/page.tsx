"use client";
import { useRouter } from "next/navigation";
import css from "./SignUpPage.module.css";
import { useState } from "react";
import { register, RegisterData } from "@/lib/api/clientApi";
import { AxiosError } from "axios";
import { useAuthStore } from "@/lib/store/authStore";
const SignUp = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const setUser = useAuthStore((state) => state.setUser);
  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(
        formData,
      ) as unknown as RegisterData;
      const res = await register(formValues);
      if (res) {
        setUser(res);
        router.push("/profile");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;
      setError(err.response?.data.error ?? err.message ?? "Oops... some error");
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} action={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>

        <p className={css.error}>Error</p>
      </form>
      {error && <p>{error}</p>}
    </main>
  );
};
export default SignUp;
