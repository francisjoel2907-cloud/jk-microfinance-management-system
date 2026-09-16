import type { User } from "@/types/auth.types";

export interface AuthState {
  user: User | null;
  isLoading: boolean;
}

export type AuthAction =
  | {
      type: "SET_LOADING";
      payload: boolean;
    }
  | {
      type: "LOGIN";
      payload: User;
    }
  | {
      type: "LOGOUT";
    }
  | {
      type: "SET_USER";
      payload: User | null;
    }
  | {
      type: "INITIALIZE";
      payload: User | null;
    };

export const initialAuthState: AuthState = {
  user: null,
  isLoading: true,
};

export function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };

    case "INITIALIZE":
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      };

    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };

    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
}
