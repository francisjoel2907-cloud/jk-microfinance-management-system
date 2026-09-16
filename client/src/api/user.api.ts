import api from "@/lib/api";
import type {
  User,
  CreateUserPayload,
  UpdateUserPayload,
} from "@/types/user.types";

export const getProfile = async (): Promise<User> => {
  const response = await api.get("/users/profile");
  return response.data.data;
};

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get("/users");
  return response.data.data;
};

export const createUser = async (payload: CreateUserPayload): Promise<User> => {
  const response = await api.post("/users", payload);
  return response.data.data;
};

export const updateUser = async (
  userId: string,
  payload: UpdateUserPayload,
): Promise<User> => {
  const response = await api.patch(`/users/${userId}`, payload);
  return response.data.data;
};

export const toggleUserStatus = async (userId: string): Promise<User> => {
  const response = await api.patch(`/users/${userId}/status`);
  return response.data.data;
};
