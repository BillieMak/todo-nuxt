import type { User } from "~/interfaces/user";

interface resAuth{
  token: string,
  user: User
}

export default defineEventHandler(async (event) => {
  const { apiAuth } = useRuntimeConfig();

  const body = await readBody(event);

  const res : resAuth = await $fetch(`${apiAuth}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  setCookie(event, "token", res.token);

  setCookie(event, "user", JSON.stringify(res.user as User));

  return res;
});
