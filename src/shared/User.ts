import { Entity, Fields } from "remult";

@Entity("users", {
	allowApiCrud: true
})
export class User {
	@Fields.uuid<User>({
		validate: (user) => {
			if(user.userName == "")
				throw "First name is required"
		}
	})
	userName: string;

	@Fields.string<User>({
		validate: (user) => {
			if(user.firstName == "")
				throw "First name is required"
		}
	})
	firstName: string;

	@Fields.string()
	lastName!: string;

	@Fields.string()
	password: string;

	@Fields.object()
	lists: string[]=[];

	constructor(username: string, first:string, last:string="", pwd:string, lists: string[]){
		this.userName = username;
		this.firstName = first;
		this.password = pwd;
		this.lists = lists;
		if(last > ""){
			this.lastName = last;
		}
	}
}