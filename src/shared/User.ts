import { Allow, Entity, Fields, remult } from "remult";

@Entity("users", {
	allowApiInsert: true,
	allowApiCrud: Allow.authenticated
})
export class User {
	@Fields.uuid<User>()
	id!: string;

	@Fields.string({
		validate: async (data) => {
			let userRepo = remult.repo(User);
			let found = await userRepo.find({where:{ userName: data }})
			if(found.length > 0)
				throw "Username in use"
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
	lastName: string;

	@Fields.string()
	password: string;

	constructor(username: string, first:string, last:string, pwd:string){
		this.userName = username;
		this.firstName = first;
		this.lastName = last;
		this.password = pwd;
	}
}