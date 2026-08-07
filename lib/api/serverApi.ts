import { cookies } from "next/headers";
import { api } from "./api";
import { User } from "@/types/user";
import { AxiosResponse } from "axios";

type RefreshSessionResponse = {
  message: string;
};
export const fetchNotes = async (
  page: number,
  search: string,
  tag?: string,
) => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");
  const { data } = await api.get("/notes", {
    params: {
      search,
      page,
      perPage: 12,
      tag,
    },
    headers: {
      Cookie: cookieHeader,
    },
  });
  return data;
};
export const fetchNoteById = async (postId: string) => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");
  const { data } = await api.get(`/notes/${postId}`, {
    headers: {
      Cookie: cookieHeader,
    },
  });
  return data;
};
export const checkServerSession = async (): Promise<
  AxiosResponse<RefreshSessionResponse>
> => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");
  const res = await api.get("/auth/session", {
    headers: {
      Cookie: cookieHeader,
    },
  });
  return res;
};
export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");
  const res = await api.get<User>("/users/me", {
    headers: {
      Cookie: cookieHeader,
    },
  });
  return res.data;
};
