import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import IUHInformation from './providers/IUHNotification';

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors());
app.use(express.json());

const notification = IUHInformation();

app.get('/', (_req: Request, res: Response) => {
    res.send('Hello, Express with TypeScript!');
});

app.get('/notifications', async (_req: Request, res: Response) => {
    res.json(await notification.crawl('https://iuh.edu.vn/vi/thong-bao-fi20'));
});

app.get('/notifications/:date', async (req: Request, res: Response) => {
    const date = req.params.date;

    res.json(
        await notification.crawl('https://iuh.edu.vn/vi/thong-bao-fi20', date),
    );
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
