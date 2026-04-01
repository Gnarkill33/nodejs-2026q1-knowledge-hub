import { randomUUID } from 'crypto';

export const uuid = (): string => randomUUID();

const userIds = Array.from({ length: 8 }, uuid);

export const db = {
  users: [
    {
      id: userIds[0],
      login: 'John',
      password: 'password1',
      role: 'admin',
      createdAt: 1710000000000,
      updatedAt: 1710000000000,
    },
    {
      id: userIds[1],
      login: 'Jane',
      password: 'password2',
      role: 'editor',
      createdAt: 1710000000100,
      updatedAt: 1710000000100,
    },
    {
      id: userIds[2],
      login: 'Donald',
      password: 'password3',
      role: 'viewer',
      createdAt: 1710000000200,
      updatedAt: 1710000000200,
    },
    {
      id: userIds[3],
      login: 'Alice',
      password: 'password4',
      role: 'admin',
      createdAt: 1710000000300,
      updatedAt: 1710000000300,
    },
    {
      id: userIds[4],
      login: 'Bob',
      password: 'password5',
      role: 'editor',
      createdAt: 1710000000400,
      updatedAt: 1710000000400,
    },
    {
      id: userIds[5],
      login: 'Kate',
      password: 'password6',
      role: 'viewer',
      createdAt: 1710000000500,
      updatedAt: 1710000000500,
    },
    {
      id: userIds[6],
      login: 'Ivan',
      password: 'password7',
      role: 'admin',
      createdAt: 1710000000600,
      updatedAt: 1710000000600,
    },
    {
      id: userIds[7],
      login: 'Olga',
      password: 'password8',
      role: 'editor',
      createdAt: 1710000000700,
      updatedAt: 1710000000700,
    },
  ],
};
