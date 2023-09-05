import type User from '@/model/User';
import type UsersStats from '@/model/UsersStats';
import axios, { type AxiosResponse } from 'axios';

export const UserService = new (class UserService {
    static URL = 'http://localhost:8000/users';

    async storeUser(user: User): Promise<AxiosResponse<String>> {
        return axios.post(UserService.URL, user);
    }

    async updateUser(user: User): Promise<AxiosResponse> {
        return axios.put(UserService.URL, user);
    }

    async getStats(): Promise<AxiosResponse<UsersStats>> {
        return axios.get(UserService.URL);
    }
})();
