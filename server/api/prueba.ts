import { getToken } from "../utils";

export default defineEventHandler(async (event) => {

  const token = getToken();
  return JSON.stringify(token) || 'traca'
})
