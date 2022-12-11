import { Entity, Fields } from "remult";

@Entity("users", {
	allowApiCrud: true
})
export class User {
	@Fields.uuid<User>({
		validate: (user) => {
			if(user.id == "")
				throw "First name is required"
		}
	})
	id: string;

	@Fields.string<User>({
		validate: (user) => {
			if(user.firstName == "")
				throw "First name is required"
		}
	})
	firstName: string;

	@Fields.string()
	lastName: string;

	@Fields.string()
	password: string;

	constructor(username: string, first:string, last:string, pwd:string){
		this.id = username;
		this.firstName = first;
		this.lastName = last;
		this.password = pwd;
	}
}