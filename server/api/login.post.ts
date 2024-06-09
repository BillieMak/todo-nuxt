import type { UserAuth } from "~/interfaces/auth";

interface resAuth {
  token: string;
  auth: UserAuth;
}

export default defineEventHandler(async (event) => {
  const { apiAuth } = useRuntimeConfig();

  const body = await readBody(event);

  try {
    const auth = await $fetch<resAuth>(`${apiAuth}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    setCookie(event, "token", auth.token);

    setCookie(event, "user", JSON.stringify(auth.auth as UserAuth));

    return auth;
  } catch (error) {
    return error;
  }
});
