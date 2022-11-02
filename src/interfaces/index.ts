import z from 'zod'

enum EService {
	MUNCHIES
}

export const UserModel = z.object({
	id: z.string(),
	email: z.string().email(),
	password: z.string(),
})

export const ServiceModel = z.object({
	developmentUrl: z.string(),
	productionUrl: z.string(),
	queryParam: z.string()
})

export interface SErvice extends z.infer<typeof ServiceModel> {
	name: EService
	Service: EService[]
}

export interface User extends z.infer<typeof UserModel> {
	Service: EService[]
}