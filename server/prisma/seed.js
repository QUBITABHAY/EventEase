import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

// ------------------ DATA ------------------ //

const usersData = [
    {
        firstName: "Alice",
        lastName: "Johnson",
        email: "alice@example.com",
        phone: "9876543210",
        password: "hashed_password_1",
        provider: "LOCAL",
        providerId: null,
        profilePicture: null,
        otp: null,
        otpExpiry: null,
        role: "USER",
        isProfileComplete: true,
    },
    {
        firstName: "Bob",
        lastName: "Smith",
        email: "bob@example.com",
        phone: "9123456780",
        password: "hashed_password_2",
        provider: "GOOGLE",
        providerId: "google_123",
        profilePicture: "https://picsum.photos/200",
        otp: null,
        otpExpiry: null,
        role: "ORGANIZER",
        isProfileComplete: true,
    },
    {
        firstName: "Charlie",
        lastName: "Lee",
        email: "charlie@example.com",
        phone: "9000012345",
        password: "hashed_password_3",
        provider: "LOCAL",
        providerId: null,
        profilePicture: null,
        otp: null,
        otpExpiry: null,
        role: "BOTH",
        isProfileComplete: false,
    },
    {
        firstName: "Diana",
        lastName: "Evans",
        email: "diana@example.com",
        phone: "9012345678",
        password: "hashed_password_4",
        provider: "GOOGLE",
        providerId: "google_456",
        profilePicture: "https://picsum.photos/201",
        otp: null,
        otpExpiry: null,
        role: "USER",
        isProfileComplete: true,
    },
    {
        firstName: "Ethan",
        lastName: "Williams",
        email: "ethan@example.com",
        phone: "9023456789",
        password: "hashed_password_5",
        provider: "LOCAL",
        providerId: null,
        profilePicture: null,
        otp: null,
        otpExpiry: null,
        role: "ORGANIZER",
        isProfileComplete: false,
    }
];

const eventsData = [
    {
        title: "Tech Summit 2025",
        description: "Annual technology conference with keynote speakers and workshops.",
        longDescription: "A large event covering AI, blockchain, cloud computing, and emerging technologies. Networking opportunities and hands-on workshops included.",
        category: "Technology",
        date: new Date("2025-10-12"),
        startTime: new Date("2025-10-12T09:00:00"),
        endTime: new Date("2025-10-12T17:00:00"),
        venue: "City Convention Center",
        posterUrl: "https://picsum.photos/seed/tech1/600/400",
        price: 49.99,
        prizePool: 1000,
        prizeDescription: "Best innovative tech project award",
        capacity: 200,
    },
    {
        title: "AI & Machine Learning Expo",
        description: "Explore AI trends and ML applications.",
        longDescription: "Workshops, panel discussions, and exhibitions focused on artificial intelligence, machine learning, and deep learning applications across industries.",
        category: "Technology",
        date: new Date("2025-08-21"),
        startTime: new Date("2025-08-21T10:00:00"),
        endTime: new Date("2025-08-21T18:00:00"),
        venue: "Open Air Tech Arena",
        posterUrl: "https://picsum.photos/seed/tech2/600/400",
        price: 39.99,
        prizePool: 800,
        prizeDescription: "Top AI project recognition",
        capacity: 300,
    },
    {
        title: "Startup Pitch Night",
        description: "Pitch your tech startup ideas to investors.",
        longDescription: "Entrepreneurs present their tech ideas to a panel of investors. Feedback, mentoring, and networking opportunities included.",
        category: "Technology",
        date: new Date("2025-11-05"),
        startTime: new Date("2025-11-05T19:00:00"),
        endTime: new Date("2025-11-05T22:00:00"),
        venue: "Downtown Innovation Hub",
        posterUrl: "https://picsum.photos/seed/tech3/600/400",
        price: 15.0,
        prizePool: 500,
        prizeDescription: "Best startup prize",
        capacity: 150,
    },
    {
        title: "Hackathon 2025",
        description: "24-hour coding competition for tech enthusiasts.",
        longDescription: "Teams compete to solve real-world tech challenges using innovative solutions. Mentorship and prizes for winners.",
        category: "Technology",
        date: new Date("2025-09-15"),
        startTime: new Date("2025-09-15T09:00:00"),
        endTime: new Date("2025-09-16T09:00:00"),
        venue: "Tech Innovation Lab",
        posterUrl: "https://picsum.photos/seed/tech4/600/400",
        price: 0,
        prizePool: 2000,
        prizeDescription: "Top 3 teams prize pool",
        capacity: 100,
    },
    {
        title: "Cloud & DevOps Conference",
        description: "Workshops and talks on cloud computing and DevOps practices.",
        longDescription: "Industry experts share knowledge on cloud infrastructure, CI/CD pipelines, and modern DevOps practices. Networking with tech professionals.",
        category: "Technology",
        date: new Date("2025-12-01"),
        startTime: new Date("2025-12-01T09:00:00"),
        endTime: new Date("2025-12-01T17:00:00"),
        venue: "City Tech Center",
        posterUrl: "https://picsum.photos/seed/tech5/600/400",
        price: 25.0,
        prizePool: 1000,
        prizeDescription: "Best DevOps demo",
        capacity: 250,
    }
];

const reviewsData = [
    {
        rating: 5,
        feedback: "Amazing event! Learned a lot.",
    },
    {
        rating: 4,
        feedback: "Great conference but food could be better.",
    },
    {
        rating: 4,
        feedback: "Loved the AI & ML sessions.",
    },
    {
        rating: 5,
        feedback: "Perfect for networking with investors.",
    },
    {
        rating: 5,
        feedback: "Great insights into DevOps and cloud practices!",
    }
];

// ------------------ SEED FUNCTION ------------------ //

async function main() {
    console.log("Seeding Users...");
    const createdUsers = [];
    for (const u of usersData) {
        const user = await prisma.user.upsert({
            where: { email: u.email },
            update: {},
            create: u,
        });
        createdUsers.push(user);
    }


    console.log("Seeding Events...");
    const createdEvents = [];

    // Map events to actual organizer IDs dynamically
    const organizerMap = [createdUsers[1].id, createdUsers[2].id, createdUsers[4].id, createdUsers[3].id, createdUsers[1].id];

    for (let i = 0; i < eventsData.length; i++) {
        const event = await prisma.event.create({
            data: { ...eventsData[i], organizerId: organizerMap[i] },
        });
        createdEvents.push(event);
    }

    console.log("Seeding Reviews...");

    // Map reviews to actual user IDs and event IDs
    const reviewMappings = [
        { userIndex: 0, eventIndex: 0 },
        { userIndex: 1, eventIndex: 0 },
        { userIndex: 0, eventIndex: 1 },
        { userIndex: 3, eventIndex: 2 },
        { userIndex: 4, eventIndex: 4 },
    ];

    for (let i = 0; i < reviewsData.length; i++) {
        await prisma.review.create({
            data: {
                ...reviewsData[i],
                userId: createdUsers[reviewMappings[i].userIndex].id,
                eventId: createdEvents[reviewMappings[i].eventIndex].id,
            },
        });
    }

    console.log("Seeding completed!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
