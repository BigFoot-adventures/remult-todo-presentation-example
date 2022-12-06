import { Entity, Fields } from "remult";
import { Task } from "./Task";

@Entity("Lists", {
	allowApiCrud:true
})
export class List{

	@Fields.uuid()
	listId!: string;

	@Fields.string()
	name="";

	constructor(name=""){
		this.name = name;
	}
}