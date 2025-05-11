import { addPost } from "../db/db_services/posts";
import { getAllUserIds } from "../db/db_services/user";

const titlesByCategory = {
  Tech: [
    "Top 10 JavaScript Tricks",
    "The Rise of AI Tools",
    "Best VSCode Extensions",
  ],
  Health: [
    "5 Habits for Mental Health",
    "Healthy Eating on a Budget",
    "Meditation Tips",
  ],
  Education: [
    "Study Hacks for Students",
    "Why Lifelong Learning Matters",
    "Learning in the Digital Age",
  ],
  Travel: [
    "Hidden Gems of India",
    "Solo Travel Tips",
    "Budget Travel Guide 2025",
  ],
  Food: [
    "Quick Vegan Recipes",
    "Street Foods Around the World",
    "Healthy Desserts You’ll Love",
  ],
  Finance: [
    "How to Save in Your 20s",
    "Best Budgeting Apps",
    "Basics of Stock Market",
  ],
  Fitness: [
    "10-Minute Workouts",
    "Fitness Myths Busted",
    "Home Workout Routine",
  ],
  Lifestyle: [
    "Digital Minimalism",
    "Morning Routines that Work",
    "How to Stay Organized",
  ],
} as const;

type Category = keyof typeof titlesByCategory;

const getRandomItem = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

const insertPosts = async () => {
  try {
    const users = await getAllUserIds(); // returns [{ id: "uuid1" }, { id: "uuid2" }, ...]

    for (const user of users) {
      const postCount = Math.floor(Math.random() * 3) + 1;

      for (let i = 0; i < postCount; i++) {
        const category = getRandomItem(
          Object.keys(titlesByCategory) as Category[]
        );
        const title = getRandomItem([...titlesByCategory[category]]);

        await addPost(title, user.id);
        console.log(`Post "${title}" added for user ${user.id}`);
      }
    }
  } catch (error) {
    console.error("Error inserting posts:", error);
  }
};

insertPosts();
