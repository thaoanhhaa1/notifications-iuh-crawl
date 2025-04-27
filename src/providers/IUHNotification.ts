import * as cheerio from 'cheerio';
import { formatDate } from '../utils';

// const data = fs.readFileSync(
//     'C:/code/crawl-notification-iuh/source/iuh.html',
//     'utf8',
// );

export interface INotification {
    title: string;
    link: string;
}

function IUHInformation() {
    const crawl = async (url: string, dateParam?: string) => {
        const response = await fetch(url);
        const data = await response.text();

        const $ = cheerio.load(data);

        const items = $('.article-list > .content');
        const notifications: INotification[] = [];

        items.each((index, element) => {
            const date = $(element).find('.content-date').text();

            const now = new Date();
            now.setHours(now.getHours() + 7);

            const formattedDate = formatDate(now, 'DD-MM-YYYY');

            if (date !== (dateParam || formattedDate)) {
                return;
            }

            const title = $(element).find('.c-i-title').text();
            const link = $(element).find('.c-i-title').attr('href') || '';

            notifications.push({
                title: title.replace(/\s+/g, ' ').trim(),
                link: `https://iuh.edu.vn${link}`,
            });
        });

        return notifications;
    };

    return { crawl };
}

export default IUHInformation;
