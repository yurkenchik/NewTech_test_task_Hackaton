export interface IUserData {
    username: string
    name: string
    lastname: string
    password: string
}

export interface IResponseUserData {
    username: string | undefined
    name: string | undefined
    lastname: string | undefined
    password: string | undefined
    createdAt: string | undefined
    updatedAt: string | undefined
    __v?: number | undefined
    _id?: string | undefined
    message: string | undefined
}