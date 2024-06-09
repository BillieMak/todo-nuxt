import type { User } from "~/interfaces/user";

export const useUserStore = defineStore("users", () => {
  const users = ref<User[]>([]);

  const setUsers = (usersArray: User[]) => {
    users.value = usersArray;
  };

  return {
    users,

    // ACTIONS
    setUsers,
  };
});
