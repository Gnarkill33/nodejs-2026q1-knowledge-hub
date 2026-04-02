import { randomUUID } from 'crypto';
import { UserRole, ArticleStatus } from 'src/types';

export const uuid = (): string => randomUUID();

const userIds = Array.from({ length: 8 }, uuid);
const articleIds = Array.from({ length: 8 }, uuid);
const categoryIds = Array.from({ length: 8 }, uuid);

export const db = {
  users: [
    {
      id: userIds[0],
      login: 'John',
      password: 'password1',
      role: UserRole.ADMIN,
      createdAt: 1710000000000,
      updatedAt: 1710000000000,
    },
    {
      id: userIds[1],
      login: 'Jane',
      password: 'password2',
      role: UserRole.EDITOR,
      createdAt: 1710000000100,
      updatedAt: 1710000000100,
    },
    {
      id: userIds[2],
      login: 'Donald',
      password: 'password3',
      role: UserRole.VIEWER,
      createdAt: 1710000000200,
      updatedAt: 1710000000200,
    },
    {
      id: userIds[3],
      login: 'Alice',
      password: 'password4',
      role: UserRole.ADMIN,
      createdAt: 1710000000300,
      updatedAt: 1710000000300,
    },
    {
      id: userIds[4],
      login: 'Bob',
      password: 'password5',
      role: UserRole.EDITOR,
      createdAt: 1710000000400,
      updatedAt: 1710000000400,
    },
    {
      id: userIds[5],
      login: 'Kate',
      password: 'password6',
      role: UserRole.VIEWER,
      createdAt: 1710000000500,
      updatedAt: 1710000000500,
    },
    {
      id: userIds[6],
      login: 'Ivan',
      password: 'password7',
      role: UserRole.ADMIN,
      createdAt: 1710000000600,
      updatedAt: 1710000000600,
    },
    {
      id: userIds[7],
      login: 'Olga',
      password: 'password8',
      role: UserRole.EDITOR,
      createdAt: 1710000000700,
      updatedAt: 1710000000700,
    },
  ],
  articles: [
    {
      id: articleIds[0],
      title: 'Introduction to TypeScript',
      content:
        'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript...',
      status: ArticleStatus.PUBLISHED,
      authorId: userIds[0],
      categoryId: categoryIds[0],
      tags: ['typescript', 'javascript', 'programming'],
      createdAt: 1704067200000,
      updatedAt: 1704153600000,
    },
    {
      id: articleIds[1],
      title: 'React Hooks Fundamentals',
      content:
        'React Hooks allow you to use state and other React features without writing classes...',
      status: ArticleStatus.PUBLISHED,
      authorId: userIds[0],
      categoryId: categoryIds[1],
      tags: ['react', 'hooks', 'frontend'],
      createdAt: 1704326400000,
      updatedAt: 1704412800000,
    },
    {
      id: articleIds[2],
      title: 'Database Management in Node.js',
      content:
        'This article covers connecting and working with PostgreSQL and MongoDB from Node.js applications...',
      status: ArticleStatus.DRAFT,
      authorId: userIds[1],
      categoryId: categoryIds[4],
      tags: ['nodejs', 'database', 'postgresql', 'mongodb'],
      createdAt: 1704585600000,
      updatedAt: 1704672000000,
    },
    {
      id: articleIds[3],
      title: 'Asynchronous Programming in JavaScript',
      content:
        'Promises, async/await, callbacks - exploring all ways to work with asynchronous code...',
      status: ArticleStatus.PUBLISHED,
      authorId: userIds[2],
      categoryId: categoryIds[0],
      tags: ['javascript', 'async', 'promises'],
      createdAt: 1704844800000,
      updatedAt: 1704931200000,
    },
    {
      id: articleIds[4],
      title: 'Microservices Architecture',
      content:
        'Pros and cons of microservices architecture, patterns and antipatterns...',
      status: ArticleStatus.ARCHIVED,
      authorId: userIds[3],
      categoryId: categoryIds[7],
      tags: ['microservices', 'architecture', 'system-design'],
      createdAt: 1705104000000,
      updatedAt: 1705190400000,
    },
    {
      id: articleIds[5],
      title: 'React Performance Optimization',
      content:
        'Tips and techniques for improving React application performance...',
      status: ArticleStatus.DRAFT,
      authorId: userIds[0],
      categoryId: categoryIds[1],
      tags: ['react', 'performance', 'optimization'],
      createdAt: 1705363200000,
      updatedAt: 1705363200000,
    },
    {
      id: articleIds[6],
      title: 'Docker for Beginners',
      content:
        'Step-by-step guide to containerizing applications with Docker...',
      status: ArticleStatus.PUBLISHED,
      authorId: userIds[4],
      categoryId: categoryIds[3],
      tags: ['docker', 'devops', 'containers'],
      createdAt: 1705622400000,
      updatedAt: 1705708800000,
    },
    {
      id: articleIds[7],
      title: 'Testing NestJS Applications',
      content:
        'Unit tests, e2e tests, and integration testing in the NestJS ecosystem...',
      status: ArticleStatus.DRAFT,
      authorId: userIds[5],
      categoryId: categoryIds[6],
      tags: ['nestjs', 'testing', 'jest'],
      createdAt: 1705881600000,
      updatedAt: 1705968000000,
    },
  ],
  categories: [
    {
      id: categoryIds[0],
      name: 'Programming',
      description:
        'Articles about software development, programming languages, and coding best practices',
    },
    {
      id: categoryIds[1],
      name: 'Frontend',
      description:
        'Web development, React, Vue, Angular, and modern frontend technologies',
    },
    {
      id: categoryIds[2],
      name: 'Backend',
      description:
        'Server-side development, APIs, databases, and backend architecture',
    },
    {
      id: categoryIds[3],
      name: 'DevOps',
      description:
        'CI/CD, Docker, Kubernetes, cloud computing, and infrastructure automation',
    },
    {
      id: categoryIds[4],
      name: 'Database',
      description:
        'SQL, NoSQL, data modeling, optimization, and database management',
    },
    {
      id: categoryIds[5],
      name: 'Security',
      description:
        'Cybersecurity, authentication, encryption, and secure coding practices',
    },
    {
      id: categoryIds[6],
      name: 'Testing',
      description:
        'Unit testing, integration testing, E2E testing, and quality assurance',
    },
    {
      id: categoryIds[7],
      name: 'Architecture',
      description:
        'System design, microservices, design patterns, and software architecture',
    },
  ],
};
