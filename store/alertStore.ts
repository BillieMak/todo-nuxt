import { defineStore } from 'pinia'

interface Alert {
  message: string,
  life:number,
  title: string
}

export const useAlertStore = defineStore('alert', ()=>{
  const alert = reactive<Alert>({
    message: 'Prueba',
    life: 800,
    title: 'David Rivera'
  })

  const visible = ref(false)

  const addAlert = (alertState: Alert) => {
    visible.value = true
    alert.life = alertState.life
    alert.title = alertState.title
    alert.message = alertState.message
  }

  return { alert, addAlert, visible }
})