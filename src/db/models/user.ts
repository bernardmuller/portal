import { Entity, Schema, Client } from 'redis-om';

export class User extends Entity {}

export const userSchema = new Schema(
  User,
  {
    id: { type: 'string' },
    firstname: { type: 'string' },
    lastname: { type: 'string' },
    email: { type: 'string' },
    password: { type: 'string' },
    services: { type: 'string[]' },
    role: { type: 'number' },
  },
  { dataStructure: 'JSON' },
);
