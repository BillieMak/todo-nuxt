import { defineStore } from "pinia";

interface Atendance {
    id: number;
    name: string;
    description: string;
    state: number;
    created_at: string;
    updated_at: string;
    created_by: string;
    file: boolean;
}

interface attendanceState {
  attendances: Array<Atendance>;
  isLoading: boolean;
}

export const useAttendanceStore = defineStore("attendance", {
  state: (): attendanceState => ({
    attendances: [],
    isLoading: true,
  }),
  getters: {
    getAttendances: (state) => state.attendances,
  },
  actions: {
    setAttendances(attendances: Array<Atendance>) {
      this.attendances = attendances;
    },
    exist(item1: Atendance, item2: Atendance) {
      return item1.id === item2.id;
    },
    addAttendance(attendance: Atendance) {
        const index = this.attendances.findIndex((item) =>
          this.exist(item, attendance)
        );
        if (index === -1) {
          this.attendances.unshift(attendance);
        }
        this.attendances[index] = attendance;

    }
  },
});
