import { defineStore } from 'pinia'

interface AttendanceForm {
  name: string,
  description: string,
  problem: string,
  area:string
}


interface ModalFormState {
  isOpen: boolean,
  attendance: AttendanceForm
}

export const useModalFormStore = defineStore('modalForm', {
  state: () : ModalFormState => ({
    isOpen: false,
    attendance: {
      name: '',
      description: '',
      problem: '',
      area: ''
    }
  }),
  getters: {
    getAttendance: (state) => state.attendance,
    getOpen: (state) => state.isOpen,
  },
  actions: {
    setAttendance(attendance: AttendanceForm) {
      this.attendance = attendance
    },
    setArea(area : string) {
      this.attendance.area = area
    },
    open() {
      this.isOpen = true
    },
    close() {
      this.isOpen = false
    },
  }
})