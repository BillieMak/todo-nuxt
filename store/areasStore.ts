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
     }
   }
} )