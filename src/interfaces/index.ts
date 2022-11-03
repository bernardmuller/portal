import z from 'zod';

enum EService {
  MUNCHIES,
}

export const UserModel = z.object({
  id: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export const ServiceModel = z.object({
  name: z.string(),
  developmentUrl: z.string(),
  productionUrl: z.string(),
  queryParam: z.string(),
});

export interface TService extends z.infer<typeof ServiceModel> {}

export type TServices = z.infer<typeof ServiceModel>[];

export interface User extends z.infer<typeof UserModel> {
  Service: EService[];
}