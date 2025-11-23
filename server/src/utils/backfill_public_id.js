import prisma from '../DB/db.config';
import { randomUUID } from 'crypto';

async function main() {
    const events = await prisma.event.findMany({
        where: {
            publicId: null,
        },
    });

    console.log(`Found ${events.length} events to update.`);

    for (const event of events) {
        await prisma.event.update({
            where: { id: event.id },
            data: { publicId: randomUUID() },
        });
        console.log(`Updated event ${event.id}`);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
