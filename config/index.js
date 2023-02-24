const dev = process.env.NODE_ENV !== 'production';

export const server = dev ? 'http://localhost:3000' : 'https://solimax.vercel.app'

export const solimaxApi = "https://jsonplaceholder.typicode.com/todos"