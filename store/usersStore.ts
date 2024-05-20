interface User{
    username: String
    password: String
    email: String
    rol_id: Number
    rolName: String
    name: String
    enabled: Number
}

export const useAreaStore =  defineStore("users" ,{
    state : () =>({
      users: []
    })
})