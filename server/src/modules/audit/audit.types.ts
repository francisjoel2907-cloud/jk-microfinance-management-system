export enum AuditAction {
  CREATE = "CREATE",

  UPDATE = "UPDATE",

  DELETE = "DELETE",

  LOGIN = "LOGIN",

  LOGOUT = "LOGOUT",

  PAYMENT = "PAYMENT",

  PENALTY = "PENALTY",
}

export enum AuditEntity {
  CUSTOMER = "CUSTOMER",

  LOAN = "LOAN",

  PAYMENT = "PAYMENT",

  INSTALLMENT = "INSTALLMENT",

  USER = "USER",

  REPORT = "REPORT",
}

export type AuditLog = {
  id: string;

  userId: string;

  action: AuditAction;

  entity: AuditEntity;

  entityId: string;

  description: string;

  createdAt: Date;
};

export type CreateAuditPayload = {
  userId: string;

  action: AuditAction;

  entity: AuditEntity;

  entityId: string;

  description: string;
};
