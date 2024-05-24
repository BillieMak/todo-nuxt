import { defineStore } from 'pinia'

interface area {
  id: number
  name : string
  // subArea : string 

}

interface areaState {
 areas :  area[]
}

export const useAreaStore =  defineStore("areas" ,{
   state : () :areaState =>({
     areas : []
   }),
   actions : {
     addAreas( areas : area[]) {
       this.areas = areas
     },
     async loadAreas () {
      console.log('cargando areas')
       const res = await $fetch('http://localhost:8080/api/v1/areas', {
         headers: {
           token: '123abc'
         }
       })
      this.areas = res as area[]
     }
   },

} )