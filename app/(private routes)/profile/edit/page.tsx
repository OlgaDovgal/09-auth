"use client";
import { useAuthStore } from "@/lib/store/authStore";
import css from "./EditProfile.module.css";
import Image from "next/image";
import { useState } from "react";
import { updateMe } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
const EditProfile = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const [error, setError] = useState("");
  const [username, setUsername] = useState(user?.username ?? "");
  const handleSaveUser = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const updateUser = await updateMe({
        username,
      });
      setUser(updateUser);
      router.push("/profile");
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;
      setError(err.response?.data.error ?? err.message ?? "Oops... some error");
    }
  };
  if (!user) {
    return null;
  }
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user.avatar}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} onSubmit={handleSaveUser}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <p>Email: {user.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={() => router.push("/profile")}
            >
              Cancel
            </button>
          </div>
          {error && <p>{error}</p>}
        </form>
      </div>
    </main>
  );
};
export default EditProfile;
