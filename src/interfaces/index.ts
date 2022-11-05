import z from 'zod';

enum EService {
  MUNCHIES,
}

export const UserModel = z.object({
  id: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  email: z.string().email(),
  password: z.string(),
  services: z.string().array(),
});

export const ServiceModel = z.object({
  name: z.string(),
  developmentUrl: z.string(),
  productionUrl: z.string(),
  queryParam: z.string(),
});

export interface TService extends z.infer<typeof ServiceModel> {}

export type TServices = z.infer<typeof ServiceModel>[];

export interface User extends z.infer<typeof UserModel> {}
