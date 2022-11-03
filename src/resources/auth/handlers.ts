import { Response, Request } from "express"
import { checkIfUserExists, checkIfUserExistsByEmail, createUser, getUserByEmail } from "../../resources/users/actions"
import { encryptPassword } from "./utils"

export const registerHandler = async (req: Request, res: Response) => {
	const { email, password } = req.body
	const existingUser = await checkIfUserExistsByEmail(email)
	if(existingUser) throw new Error('User with that email already exists.')
	const hash = await encryptPassword(password)
	const newUser = await createUser({
		email: email,
		password: hash
	})
	res.status(200).send(newUser)
}  