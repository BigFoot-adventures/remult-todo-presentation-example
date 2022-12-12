import { Allow, Entity, Fields, Validators } from "remult";

@Entity("tasks", {
    allowApiCrud: true,
    allowApiUpdate: Allow.authenticated
})
export class Task {
    @Fields.uuid()
    id!: string;

    @Fields.string()
    list: string;

    @Fields.string({
        validate: Validators.required
    })
    title = '';

    @Fields.boolean()
    completed = false;

    constructor(listId: string){
        this.list = listId;
    }
}