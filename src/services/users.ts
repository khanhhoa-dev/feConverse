import * as httpsRequest from '../utils/httpsRequest';
import type { IInformUser } from '../pages/ManageUsers/ManageUsers';

//[GET] /users
export const AllUser = async (token: string) => {
    try {
        const result = await httpsRequest.get('/users', {
            headers: {
                token,
            },
        });
        return result;
    } catch (error) {
        console.log('Error:', error);
    }
};

//[PATCH]: /users/update-role/:id
export const UpdateRoleUser = async (token: string, data: boolean, id: string) => {
    try {
        const result = await httpsRequest.patch<IInformUser>(
            `/users/update-role/${id}`,
            { data },
            {
                headers: {
                    token,
                },
            }
        );
        return result;
    } catch (error) {
        console.log('Error:', error);
    }
};

//[DELETE]: /users/:id
export const DeleteUsers = async (token: string, id: string) => {
    try {
        const result = await httpsRequest.del(`/users/${id}`, {
            headers: {
                token,
            },
        });
        return result;
    } catch (error) {
        console.log('Error', error);
    }
};
