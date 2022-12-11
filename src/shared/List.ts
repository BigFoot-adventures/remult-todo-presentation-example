import { Entity, Fields } from "remult";
import { Task } from "./Task";

@Entity("Lists", {
	allowApiCrud:true
})
export class List{

	@Fields.uuid()
	listId!: string;

	@Fields.string()
	user: string;

	@Fields.string()
	name="";

	constructor(user: string){
		this.user = user
	}
}