MAIN FEATURES:

1. A task assigner where admins can assign tasks to users.
2. Deadlines can be set for each task.
3. Users can update task status to In Progress or Done.
4. If a deadline passes, the task is automatically marked as Not Done using node-cron.
5. Admins can create meetings and assign users to them.
6. Free video meetings are integrated using Jitsi Meet.
7. Users can request deadline extensions.
8. Admins can approve extension requests and set new deadlines.
9. Users receive notifications when a meeting is created and they are selected for it.
10. Meeting login details are also sent to their email.
11. The site uses protected routes — only authorized users can access certain endpoints.
    Users can't access admin routes, and admins can't access user dashboards.
12. Authentication is handled via cookies for login and logout.
13. The design is fully responsive across all screen sizes.
14. Both users and admins can switch between dark mode and light mode.

![image](https://github.com/user-attachments/assets/8fb9c256-8bd9-41f9-94ba-fdc4248d89e5)

This is the main home page of the site.  
You can run the frontend using `npm run dev` and the backend using `nodemon`.
From here, users can log in, register, and reset their password.

![image](https://github.com/user-attachments/assets/447557cb-35f4-4e95-8828-5823000cd991)
This is the admin page. It has separate endpoints for users and admins.  
Protected routes are implemented using backend middleware, so only authorized users can access their respective endpoints.

![image](https://github.com/user-attachments/assets/aaae5470-c371-458d-8f4d-4f10bd35f9c3)
This is the main user dashboard page.  
Here, users can view all the tasks assigned to them — including pending tasks, completed tasks, and tasks that were not completed on time.  
I’m using Notistack Snackbar for showing real-time notifications and alerts (like task status updates and error messages).

![image](https://github.com/user-attachments/assets/6ca1fd40-43fe-4f32-aaa8-8ef35d6e706a)
![image](https://github.com/user-attachments/assets/298a3748-adf8-4cea-b436-136527de3fc3)

This is how the task cards appear on the dashboard.  
For tasks with a long description, there is a "View More" option that navigates to a separate page showing full task details.

![image](https://github.com/user-attachments/assets/947c4e35-b6cc-4491-bfca-03810fa866bd)

⚡The spark icon represents notifications.  
If a user has an upcoming meeting, a notification will appear here indicating that they've been assigned to it.






