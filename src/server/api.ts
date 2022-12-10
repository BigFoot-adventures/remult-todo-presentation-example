import { remultExpress } from 'remult/remult-express';
import { List } from '../shared/List';
import { TasksController } from '../shared/TasksController';
import { User } from '../shared/User';
import { Task } from '../shared/Task';

export const api = remultExpress({
    entities: [Task, List, User],
    controllers: [TasksController],
    getUser: request => request.session!['user']
});
