import cron from "node-cron";
import Task from "../models/taskModel.js";

cron.schedule("* * * * *",async () => {
   console.log("Checking For Expired Tasks");
   try {
     const now = new Date();
     const expiredTasks = await Task.find({ deadline:{ $lt:now },status:{ $ne:"Not Done"}});
     if(expiredTasks.length > 0){
        await Task.updateMany(
          { deadline:{$lt:now}, status: {$ne: "Not Done"} },
          { status:"Not Done"}
        );
        console.log(`Updated ${expiredTasks.length} tasks to "Not Done"`);
     }
   } catch (error) {
     console.error("Error updating expired tasks:", error);
   }
});