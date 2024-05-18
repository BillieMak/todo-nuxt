import { defineStore } from 'pinia'

interface alertState {
  message: string,
  life:number,
  visible: boolean,
  title: string
}

export const useAlertStore =  defineStore("alert" ,{
   state : () :alertState =>({
     message: 'prueba',
     life: 1000,
     visible: false,
     title: 'prueba'
   }),
   actions : {
      addAlert ( alert: alertState) {
        this.message = alert.message
        this.life = alert.life
        this.visible = alert.visible
        this.title = alert.title
      }
   }
} )