import type { User } from "~/interfaces/user";
import { useUserStore } from "~/store/usersStore";

export const useUsers = () => {
  const userStore = useUserStore();

  const {users} = storeToRefs(userStore);

  const { $locally } = useNuxtApp();

  const loadUsers = async () => {
    try {
      const users = await $fetch<User[]>("/api/users", {
        headers: {
          token: `${$locally.getItem()}`,
        },
      });

      userStore.setUsers(users);
    } catch (error) {
       throw new Error('Error al cargar los usuarios')
    }
  };

  onMounted(() => {
    loadUsers();
  });

  return {
    users,

    //METHODS
    loadUsers
  }
};
