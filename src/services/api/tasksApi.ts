import { API_URL } from '../../utils/constants';

export interface Task {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const meaningfulTasks = [
  'Finalize Q4 report and submit to management',
  'Prepare presentation for the upcoming client meeting',
  'Schedule a team-building activity for next month',
  'Review and approve budget proposals for the new fiscal year',
  'Onboard the new software engineer and assign initial tasks',
  'Develop a marketing strategy for the new product launch',
  'Conduct performance reviews for all team members',
  'Update the company website with the latest product information',
  'Organize a training session on the new project management tool',
  'Resolve critical bugs reported in the production environment',
  'Plan the agenda for the weekly all-hands meeting',
  'Research and evaluate potential vendors for the new CRM system',
  "Create a content calendar for the company's social media channels",
  'Design new user interface mockups for the mobile application',
  'Test and deploy the latest version of the backend service',
  'Write documentation for the new API endpoints',
  'Analyze customer feedback and create an action plan',
  'Coordinate with the legal team to update the terms of service',
  'Set up a new continuous integration and deployment pipeline',
  'Monitor server performance and optimize resource utilization',
  'Create a new design for the main landing page',
  'Fix the login issue on the mobile app',
  'Implement the new payment gateway',
  'Refactor the user authentication module',
  'Write unit tests for the new features',
];

const generateMockTasks = (count: number): Task[] => {
  const tasks: Task[] = [];
  for (let i = 1; i <= count; i++) {
    tasks.push({
      userId: 1,
      id: i,
      title: meaningfulTasks[i % meaningfulTasks.length],
      completed: Math.random() > 0.5,
    });
  }
  return tasks;
};

const allTasks = generateMockTasks(100);

export const fetchTasks = async (
  page: number,
  limit: number = 10,
): Promise<Task[]> => {
  console.log(`Fetching page ${page} with limit ${limit}`);
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedTasks = allTasks.slice(start, end);
  // Simulate network delay
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(paginatedTasks);
    }, 500);
  });
};
