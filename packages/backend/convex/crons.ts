import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

// crons.monthly(
//   "reset-user-credits",
//   { day: 1, hourUTC: 0, minuteUTC: 0 },
//   () => {
//     internal.users.mutations.resetAllCredits

//     await notifications.workflows.trigger('workflow-key', {
//       recipients: [{
//         id: 'user-id',
//         email: 'user-email',
//       }],
//       data: {
//         message: 'Your credits have been reset.',
//       },
//     });
//   }
// );

export default crons;


