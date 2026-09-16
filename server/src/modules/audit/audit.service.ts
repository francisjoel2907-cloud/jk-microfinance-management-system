import prisma from "../../prisma/client";
import { Prisma } from "@prisma/client";

import { AuditLog, CreateAuditPayload } from "./audit.types";

const createAuditLog = async (
  payload: CreateAuditPayload,
  db: Prisma.TransactionClient = prisma,
): Promise<AuditLog> => {
  const auditLog = await db.auditLog.create({
    data: {
      userId: payload.userId,

      action: payload.action,

      entity: payload.entity,

      entityId: payload.entityId,

      description: payload.description,
    },
  });
  return auditLog as AuditLog;
};

const getAuditLogs = async (): Promise<AuditLog[]> => {
  const logs = await prisma.auditLog.findMany({
    include: {
      user: {
        select: {
          id: true,

          firstName: true,

          lastName: true,

          email: true,

          role: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });
  return logs as AuditLog[];
};

const auditService = {
  createAuditLog,

  getAuditLogs,
};

export default auditService;
