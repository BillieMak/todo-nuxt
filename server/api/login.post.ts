import type { Auth } from "~/interfaces/auth";

interface resAuth {
  token: string;
  auth: Auth;
}

export default defineEventHandler(async (event) => {
  const { apiAuth } = useRuntimeConfig();

  const body = await readBody(event);

  try {
    const res: resAuth = await $fetch(`${apiAuth}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    setCookie(event, "token", res.token);

    setCookie(event, "user", JSON.stringify(res.auth as Auth));

    return res;
  } catch (error) {
    return error;
  }
});
