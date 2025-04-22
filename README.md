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

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

USERPAGE:

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
![image](https://github.com/user-attachments/assets/ef799312-59fb-41f6-b7d1-95232f7964e4)
![image](https://github.com/user-attachments/assets/9f466708-a5b3-481f-af04-18f279bb786a)

⚡The spark icon represents notifications.  
If a user has an upcoming meeting, a notification will appear here indicating that they've been assigned to it.

![image](https://github.com/user-attachments/assets/ed36a4f7-e53b-41bc-a869-b759dab2e155)
Users can request a new deadline for a task from here by providing a valid reason for the extension.

![image](https://github.com/user-attachments/assets/be0fe089-f9a7-4be2-ac7f-2c07ca5eadb4)
![image](https://github.com/user-attachments/assets/6d208fd1-d64d-42ee-8d55-6afb8dcd8e5c)
This is how they can change task status here

![image](https://github.com/user-attachments/assets/d926188a-e45a-4863-8685-fc9762ba7fba)
Light Mode Theme

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

ADMIN PAGE:

![image](https://github.com/user-attachments/assets/5905a04b-700f-4947-bce7-deaa6f021a90)

Admins can only be created by the system administration through the command line, typically by a backend engineer.  
There is no public registration route for admins to ensure security and controlled access.

![image](https://github.com/user-attachments/assets/9632bb4e-1f55-49a1-bb17-778d154e60cb)

This is the admin dashboard page.  
Here, the admin can create tasks, view all registered users, schedule meetings, approve deadline extension requests, and manage other admin functionalities.  
I’ve also added a counter animation to display task statistics — such as total tasks, tasks in progress, and completed tasks — in a visually appealing way.

![image](https://github.com/user-attachments/assets/86bd6ec7-ed4c-4ba0-a15a-c47088cea157)
This is the page where the admin can approve deadline extension requests.  
If any user has requested an extension, the admin can view it here and set a new deadline accordingly.

![image](https://github.com/user-attachments/assets/ba8d1c3a-f61c-465a-a841-e976d6f201d5)
![image](https://github.com/user-attachments/assets/86076fe8-4ccd-486f-b817-30ad8c6a5232)

This is the page where the admin can view all registered users.  
An input field is provided to search users by name or email for quick access and filtering.

![image](https://github.com/user-attachments/assets/1f774b6b-fb3d-4d3e-9a99-616150cd3299)
![image](https://github.com/user-attachments/assets/d775ad76-df1f-4488-9cc3-d836c84683d4)

This is the page where the admin can create and assign tasks to users.  
Admins can also search for users by name or email before assigning the task.

![image](https://github.com/user-attachments/assets/948a0e0f-6752-481b-9710-20f01d17da43)

This is the page where an admin can view all the tasks they have assigned.  
Since there can be multiple admins, each admin only sees the tasks assigned by them.  
Admins also have the option to delete any of their assigned tasks from here.

![image](https://github.com/user-attachments/assets/e27cc8e3-c779-48d1-8a0f-e5fe0f454193)
![image](https://github.com/user-attachments/assets/42b8eed9-dfae-4eb5-b99d-559cc317c385)

This is the page where the admin can view all tasks in the system.  
Each task displays details such as which admin assigned it, the user it was assigned to, the deadline, and other relevant information.  
Task statuses are color-coded for clarity:  
 In Progress – Blue  
 Completed – Green  
 Not Done – Red  
 Pending – Yellow

![image](https://github.com/user-attachments/assets/591ccff4-e50d-4d77-891e-0a22104fe9dd)Admin Side
![image](https://github.com/user-attachments/assets/638e0461-007a-418f-b105-dc58a6e4ac7b)User Side
![image](https://github.com/user-attachments/assets/559a2651-56a7-4416-b1e9-714ec3d3bc1f)Admin Side
![image](https://github.com/user-attachments/assets/c098eff5-755b-45e9-be49-266f8d92450a)User Side

This is the Meeting tab where the admin can see all the meetings that have been assigned.Also can cancel a meeting.  

 The meeting workflow goes like this:
1. The admin creates a meeting by selecting users, setting a topic, and providing a scheduled time.
2. Selected users receive a notification on their dashboard and an email with the meeting details (room ID and password).
3. The admin must first open the Jitsi link, log in, and set the meeting password manually on Jitsi (since Jitsi is free and works this way).
4. Once everything is set, the admin clicks the "Start" button in the dashboard to mark the meeting as live.
5. When the meeting is live, users will see it as active and can join using the provided link and password.

![image](https://github.com/user-attachments/assets/0c50da42-5717-4124-b2c7-9e9682e4e8ec)
![image](https://github.com/user-attachments/assets/b9c81a4c-5fd7-4707-9423-c35450a22c16)

This is the page where the admin can create a new meeting.  
Admins can assign multiple users to the meeting, search for users by name or email using the input field.

![image](https://github.com/user-attachments/assets/cb295976-efce-4416-8d84-679f50961255)
Light Mode


----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

RESPONSIVE TEST:

ADMIN PAGE:

![image](https://github.com/user-attachments/assets/38008e77-0b7c-4fce-8509-3a46a6591c5e)
![image](https://github.com/user-attachments/assets/0a63d62c-21b5-4967-9f81-c7284b17ac2d)
![image](https://github.com/user-attachments/assets/f8d6a919-9f85-41a3-acb5-5fcdf4500b63)
![image](https://github.com/user-attachments/assets/cb1bc515-3446-4dfc-ae20-14f49acecef5)
![image](https://github.com/user-attachments/assets/93efb1b9-c468-4c42-9154-ab0b1bd29ee2)
![image](https://github.com/user-attachments/assets/80a102e9-72af-4ce7-8e40-7910294ec8ec)
![image](https://github.com/user-attachments/assets/092ff732-3503-41d9-beed-1df7c48fe55d)
![image](https://github.com/user-attachments/assets/7483f558-9040-46ac-ac8d-3c4d65b2f926)
![image](https://github.com/user-attachments/assets/5595c858-6ed7-4888-be24-81e45b7c220f)

USER PAGE:

![image](https://github.com/user-attachments/assets/3371eea0-1bb9-4ee9-85e9-157bf2b06256)
![image](https://github.com/user-attachments/assets/02604ed5-7223-4e25-a32b-ff75292d5e1d)
![image](https://github.com/user-attachments/assets/8d7f776e-fa2e-432f-98cf-b8e44ed4a186)




































