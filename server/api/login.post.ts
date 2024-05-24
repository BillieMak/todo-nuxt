export default defineEventHandler(async (event) => {
  const { apiAuth } = useRuntimeConfig();

  const body = await readBody(event);

  const res = await $fetch(`${apiAuth}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
  return res;
});
