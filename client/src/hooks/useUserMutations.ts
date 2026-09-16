import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createUser, updateUser, toggleUserStatus } from "@/api/user.api";

import type { UpdateUserPayload } from "@/types/user.types";

type UpdateUserMutation = {
  id: string;
  data: UpdateUserPayload;
};

export const useUserMutations = () => {
  const queryClient = useQueryClient();

  const refresh = () =>
    queryClient.invalidateQueries({
      queryKey: ["users"],
    });

  const create = useMutation({
    mutationFn: createUser,

    onSuccess: () => {
      toast.success("User created successfully");
      refresh();
    },
  });

  const update = useMutation({
    mutationFn: ({ id, data }: UpdateUserMutation) => updateUser(id, data),

    onSuccess: () => {
      toast.success("User updated successfully");
      refresh();
    },
  });

  const toggle = useMutation({
    mutationFn: toggleUserStatus,

    onSuccess: () => {
      toast.success("User status updated");
      refresh();
    },
  });

  return {
    create,
    update,
    toggle,
  };
};
