import { instance } from "../api/axios.api";
import { IResponseUserData, IUserData } from "../types/types";

export const AuthService = {
    async registration(userData: IUserData): Promise<IResponseUserData | undefined> {
        const {data} = await instance.post<IUserData, {data: IResponseUserData}>('user', 'userData')
        return data
    },
    async login() {},
    async hetMe() {},
}