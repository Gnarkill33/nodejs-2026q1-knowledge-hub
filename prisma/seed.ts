import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from 'src/generated/prisma/client';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
  const user1 = await prisma.user.upsert({
    where: { id: '00000000-0000-0000-0000-000000000001' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000001',
      login: 'John',
      password: 'password1',
      role: 'ADMIN',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { id: '00000000-0000-0000-0000-000000000002' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000002',
      login: 'Jane',
      password: 'password2',
      role: 'EDITOR',
    },
  });

  const cat1 = await prisma.category.upsert({
    where: { id: '00000000-0000-0000-0000-000000000101' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000101',
      name: 'Programming',
      description:
        'Articles about software development, programming languages, and coding best practices',
    },
  });

  const cat2 = await prisma.category.upsert({
    where: { id: '00000000-0000-0000-0000-000000000102' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000102',
      name: 'Frontend',
      description:
        'Web development, React, Vue, Angular, and modern frontend technologies',
    },
  });

  const cat3 = await prisma.category.upsert({
    where: { id: '00000000-0000-0000-0000-000000000103' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000103',
      name: 'DevOps',
      description:
        'CI/CD, Docker, Kubernetes, cloud computing, and infrastructure automation',
    },
  });

  const article1 = await prisma.article.upsert({
    where: { id: '00000000-0000-0000-0000-000000002001' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000002001',
      title: 'Introduction to TypeScript',
      content:
        'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript...',
      status: 'PUBLISHED',
      authorId: user1.id,
      categoryId: cat1.id,
      tags: {
        connectOrCreate: [
          { where: { name: 'typescript' }, create: { name: 'typescript' } },
          { where: { name: 'javascript' }, create: { name: 'javascript' } },
          { where: { name: 'programming' }, create: { name: 'programming' } },
        ],
      },
    },
  });

  const article2 = await prisma.article.upsert({
    where: { id: '00000000-0000-0000-0000-000000002002' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000002002',
      title: 'React Hooks Fundamentals',
      content:
        'React Hooks allow you to use state and other React features without writing classes...',
      status: 'PUBLISHED',
      authorId: user1.id,
      categoryId: cat2.id,
      tags: {
        connectOrCreate: [
          { where: { name: 'react' }, create: { name: 'react' } },
          { where: { name: 'hooks' }, create: { name: 'hooks' } },
          { where: { name: 'frontend' }, create: { name: 'frontend' } },
        ],
      },
    },
  });

  const article3 = await prisma.article.upsert({
    where: { id: '00000000-0000-0000-0000-000000002003' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000002003',
      title: 'Asynchronous Programming in JavaScript',
      content:
        'Promises, async/await, callbacks - exploring all ways to work with asynchronous code...',
      status: 'DRAFT',
      authorId: user2.id,
      categoryId: cat1.id,
      tags: {
        connectOrCreate: [
          { where: { name: 'javascript' }, create: { name: 'javascript' } },
          { where: { name: 'async' }, create: { name: 'async' } },
          { where: { name: 'promises' }, create: { name: 'promises' } },
        ],
      },
    },
  });

  const article4 = await prisma.article.upsert({
    where: { id: '00000000-0000-0000-0000-000000002004' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000002004',
      title: 'React Performance Optimization',
      content:
        'Tips and techniques for improving React application performance...',
      status: 'ARCHIVED',
      authorId: user2.id,
      categoryId: cat2.id,
      tags: {
        connectOrCreate: [
          { where: { name: 'react' }, create: { name: 'react' } },
          { where: { name: 'performance' }, create: { name: 'performance' } },
          { where: { name: 'optimization' }, create: { name: 'optimization' } },
        ],
      },
    },
  });

  const article5 = await prisma.article.upsert({
    where: { id: '00000000-0000-0000-0000-000000002005' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000002005',
      title: 'Docker for Beginners',
      content:
        'Step-by-step guide to containerizing applications with Docker...',
      status: 'PUBLISHED',
      authorId: user2.id,
      categoryId: cat3.id,
      tags: {
        connectOrCreate: [
          { where: { name: 'docker' }, create: { name: 'docker' } },
          { where: { name: 'devops' }, create: { name: 'devops' } },
          { where: { name: 'containers' }, create: { name: 'containers' } },
        ],
      },
    },
  });

  const comment1 = await prisma.comment.upsert({
    where: { id: '00000000-0000-0000-0000-000000001001' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000001001',
      content:
        'Great article! TypeScript really improves JavaScript development.',
      articleId: article1.id,
      authorId: user2.id,
    },
  });

  const comment2 = await prisma.comment.upsert({
    where: { id: '00000000-0000-0000-0000-000000001002' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000001002',
      content: 'Thanks for the detailed explanation of hooks!',
      articleId: article2.id,
      authorId: user2.id,
    },
  });

  const comment3 = await prisma.comment.upsert({
    where: { id: '00000000-0000-0000-0000-000000001003' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000001003',
      content: 'Async/await is so much better than callbacks!',
      articleId: article3.id,
      authorId: user1.id,
    },
  });

  console.log({
    user1,
    user2,
    cat1,
    cat2,
    cat3,
    article1,
    article2,
    article3,
    article4,
    article5,
    comment1,
    comment2,
    comment3,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
