interface ModalState {
  isOpen: boolean;
  selected: any;
}

export const useModalDataStore = defineStore("modal", {
  state: (): ModalState => ({
    isOpen: false,
    selected: {},
  }),
  getters: {
    getOpen: (state) => state.isOpen,
    getSelected: (state) => state.selected,
  },
  actions: {
    setSelected(selected: any) {
      this.selected = selected
    },
    open() {
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
    },
  },
});
