import type { Attendance } from "~/interfaces/attendance";

export const useModalDataStore = defineStore("modal", ()=>{
  const selected = ref<Attendance>({
    id: 0,
    name: "",
    description: "",
    area: "",
    state: 0,
    person: "",
    problem: "",
    created_at: new Date(),
    updated_at: "",
    created_by: "",
    assigned_person: "",
    codigo_file: ""
  })

  const isOpen = ref(false)


  return {
    isOpen,
    getOpen: computed(() => isOpen.value),
    getSelected: computed(() => selected.value),

    // ACTIONS 
    open: () => isOpen.value = true,
    close: () => isOpen.value = false,

    setSelected: (attendance: any) => selected.value = attendance

  }
});
