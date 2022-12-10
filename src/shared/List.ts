import { Entity, Fields } from "remult";
import { Task } from "./Task";

@Entity("Lists", {
	allowApiCrud:true
})
export class List{

	@Fields.uuid()
	listId!: string;

	@Fields.string()
	user="";

	@Fields.string()
	name="";

	constructor(name=""){
		this.name = name;
	}
}