import { remultExpress } from 'remult/remult-express';
import { List } from '../shared/List';
import { TasksController } from '../shared/TasksController';
import { User } from '../shared/User';
import { Task } from '../shared/Task';

export const api = remultExpress({
    entities: [Task, List, User],
    controllers: [TasksController],
    getUser: request => request.session!['user'],
    /* 
        
    default: 
        dataProvider: async () => new JsonDataProvider(new JsonEntityFileStorage('./db'))

    MongoDB example:
        dataProvider: async () => {
            const client = new MongoClient("mongodb://localhost:27017/local");
            await client.connect();
            return new MongoDataProvider(client.db('test'), client);
        }
    */
});
