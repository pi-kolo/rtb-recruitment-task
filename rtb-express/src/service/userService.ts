import DbConnection from "../db/mongo";
import User from "../model/User";
import UsersStats from "../model/UsersStats";

export const UserService = new class UserService {
    static COLLECTION = 'users';

    async storeUser(user: User): Promise<String> {
        const collection = await DbConnection.db.collection(UserService.COLLECTION);
        const result = await collection.insertOne(user);
        return result.insertedId.toString();
    }

    async markVisited(user: User): Promise<Number> {
        const collection = await DbConnection.db.collection(UserService.COLLECTION);
        const result = await collection.updateOne( {
            uid: user.uid
        }, {
            $set: {
                visited: true,
            }
        });
        return result.modifiedCount;
    };

    async getUsersData(): Promise<UsersStats> {
        const collection = await DbConnection.db.collection(UserService.COLLECTION);
        const visited = await collection.countDocuments({ visited: true });
        const all = await collection.countDocuments();
        return {
            all,
            visited
        }
    }
};  