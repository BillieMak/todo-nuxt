export default defineEventHandler(() => {
  return {
    data: [
      {
        user: "Sr. Carmen",
        problem: "PC No enciende",
        site: "Almacen Central",
        state: 0,
        attention: "",
      },
      {
        user: "Sr. Pedro",
        problem: "PC se reinicia",
        site: "Rectorado",
        state: 1,
        attention: "",
      },
      {
        user: "Sr. Juan",
        problem: "PC No enciende",
        site: "Archivo Central",
        state: 2,
        attention: "",
      },
    ],
  };
});
