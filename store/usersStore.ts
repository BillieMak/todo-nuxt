import type { User } from "~/interfaces/user"

interface UserState{
    users: User[]
}

export const useAreaStore =  defineStore("users" ,{
    state : () :UserState =>({
      users: []
    })
})