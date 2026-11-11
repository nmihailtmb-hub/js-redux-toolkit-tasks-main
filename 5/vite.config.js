import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const blogPosts = {
  users: [
    { id: 'user1', username: 'user1', name: 'User 1' },
    { id: 'user2', username: 'user2', name: 'User 2' },
    { id: 'user3', username: 'user3', name: 'User 3' },
  ],
  posts: [
    {
      id: 'post1',
      author: 'user1',
      body: 'Первый пост',
      comments: ['comment1', 'comment2'],
    },
    {
      id: 'post2',
      author: 'user2',
      body: 'Второй пост',
      comments: ['comment3'],
    },
  ],
  comments: [
    {
      id: 'comment1',
      author: 'user2',
      text: 'Первый комментарий',
    },
    {
      id: 'comment2',
      author: 'user3',
      text: 'Второй комментарий',
    },
    {
      id: 'comment3',
      author: 'user3',
      text: 'Первый комментарий',
    },
  ],
};

function mockApiPlugin() {
  return {
    name: 'mock-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const { pathname } = new URL(req.url, 'http://localhost');

        if (pathname === '/api/data' && req.method === 'GET') {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(blogPosts));
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), mockApiPlugin()],
  server: {
    open: true,
    host: 'localhost',
    port: 8080,
  },
});
