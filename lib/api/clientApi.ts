import { Note } from "@/types/note";
import { api } from "./api";
import { User } from "@/types/user";
interface NotesFetchResponse {
  notes: Note[];
  totalPages: number;
}
interface CreatePostBody {
  title: string;
  content: string;
  tag: string;
}
export interface RegisterData {
  email: string;
  password: string;
}
type CheckSessionRequest = {
  success: boolean;
};
type UpdateUserRequest = {
  username?: string;
};
export const fetchNotes = async (
  page: number,
  search: string,
  tag?: string,
): Promise<NotesFetchResponse> => {
  const response = await api.get<NotesFetchResponse>("/notes", {
    params: {
      search,
      page,
      perPage: 12,
      tag,
    },
  });
  return response.data;
};
export const createNote = async (newPost: CreatePostBody): Promise<Note> => {
  const response = await api.post<Note>("/notes", newPost);
  return response.data;
};
export const deleteNote = async (postId: string): Promise<Note> => {
  const response = await api.delete<Note>(`/notes/${postId}`);
  return response.data;
};
export const fetchNoteById = async (postId: string): Promise<Note> => {
  const response = await api.get<Note>(`/notes/${postId}`);
  return response.data;
};
export const register = async (credentials: RegisterData): Promise<User> => {
  const { data } = await api.post("/auth/register", credentials);
  return data;
};
export const checkSession = async () => {
  const res = await api.get<CheckSessionRequest>("/auth/session");
  return res.data.success;
};
export const getMe = async (): Promise<User> => {
  const res = await api.get<User>("/users/me");
  return res.data;
};
export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};
export const login = async (data: RegisterData) => {
  const res = await api.post<User>("/auth/login", data);
  return res.data;
};
export const updateMe = async (data: UpdateUserRequest): Promise<User> => {
  const res = await api.patch<User>("/users/me", data);
  return res.data;
};
