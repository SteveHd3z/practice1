import { promises as fs } from 'fs';

const data = await fs.readFile('./archivo.txt', 'utf-8');
console.log(data);
