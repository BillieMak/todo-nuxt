import { defineStore } from 'pinia'

interface Alert {
  message: string,
  life:number,
  visible: boolean,
  title: string
}

export const useAlertStore = defineStore('alert', ()=>{

  const alert = ref<Alert>({
    message: '',
    life: 0,
    visible: false,
    title: ''
  })

  const addAlert = (alert: Alert) => {
    alert.visible = true
    alert.life = alert.life
    alert.title = alert.title
    alert.message = alert.message
  }


  return { alert, addAlert }
})