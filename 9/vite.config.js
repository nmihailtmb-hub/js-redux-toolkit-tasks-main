import bodyParser from 'body-parser';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const jsonParser = bodyParser.json();

function mockApiPlugin() {
  return {
    name: 'mock-api',
    configureServer(server) {
      let tasks = [
        { name: 'test1', id: '1' },
        { name: 'test2', id: '2' },
      ];

      server.middlewares.use(jsonParser);
      server.middlewares.use((req, res, next) => {
        const { pathname } = new URL(req.url, 'http://localhost');

        if (pathname === '/api/tasks' && req.method === 'GET') {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ items: tasks }));
          return;
        }

        if (pathname === '/api/tasks' && req.method === 'POST') {
          const { name } = req.body;
          const id = (tasks.length + 1).toString();
          const newTask = { name, id };
          tasks.push(newTask);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(newTask));
          return;
        }

        const deleteMatch = pathname.match(/^\/api\/tasks\/(.+)$/);
        if (deleteMatch && req.method === 'DELETE') {
          const { 1: id } = deleteMatch;
          tasks = tasks.filter((task) => task.id !== id);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ message: `Task with id ${id} deleted` }));
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
