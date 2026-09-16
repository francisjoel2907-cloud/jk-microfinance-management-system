import USER_ROLE from "../../shared/enums/user-role";

export interface UserProfile {
  id: string;

  firstName: string;

  lastName: string;

  email: string;

  phone: string;

  role: string;

  createdAt: Date;
}

export interface UserList {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: (typeof USER_ROLE)[keyof typeof USER_ROLE];
  isActive: boolean;
  createdAt: Date;
}

export interface CreateUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  role: (typeof USER_ROLE)[keyof typeof USER_ROLE];
}

export interface UpdateUserPayload {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  role: (typeof USER_ROLE)[keyof typeof USER_ROLE];
}
