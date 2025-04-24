 Tech Stack Used:
 
1. **React.js** – Frontend development  
2. **Node.js** – Backend runtime environment  
3. **MongoDB** – NoSQL database  
4. **Express.js** – Server-side framework  
5. **Cron Jobs** – For scheduled automated tasks  
6. **Jitsi** – Integrated video conferencing feature  
7. **JWT (JSON Web Tokens)** – Authentication and protected route handling  
8. **Modular CSS** – Component-scoped styling with CSS Modules  
 


MAIN FEATURES:


1.A task assigner where admins can assign tasks to users(Multiple Users can be Assigned).
2.Deadlines can be set for each task.
3.Users can update task status to In Progress or Done.
4.If a deadline passes, the task is automatically marked as Not Done using node-cron.
5.Admins can create meetings and assign users to them.
6.Free video meetings are integrated using Jitsi Meet.
7.Users can request deadline extensions.
8.Admins can approve extension requests and set new deadlines.
9.Users receive notifications when a meeting is created and they are selected for it.
10.Meeting login details are also sent to their email.
11.The site uses protected routes — only authorized users can access certain endpoints. Users can't access admin routes, and admins can't access user dashboards.
12.Authentication is handled via cookies for login and logout.
13.The design is fully responsive across all screen sizes.
14.Both users and admins can switch between dark mode and light mode.

USER PAGE:
1. ![image](https://github.com/user-attachments/assets/e539a01f-941b-44bb-ad8c-14788713dcfd)

This is the main home page of the site.
You can run the frontend using npm run dev and the backend using nodemon. From here, users can log in, register, and reset their password.

2.![image](https://github.com/user-attachments/assets/87672630-7e8e-4a06-bdd3-ea6d67405041)

This is the admin page. It has separate endpoints for users and admins.
Protected routes are implemented using backend middleware, so only authorized users can access their respective endpoints.

3.![image](https://github.com/user-attachments/assets/c3c37179-2a3b-4c88-88ae-ec232cb8c162)
This is the main user dashboard page.
Here, users can view all the tasks assigned to them — including pending tasks, completed tasks, and tasks that were not completed on time.
I’m using Notistack Snackbar for showing real-time notifications and alerts (like task status updates and error messages).

4.![image](https://github.com/user-attachments/assets/ddc18c13-59df-4787-9f6f-43a069d49158)
  ![image](https://github.com/user-attachments/assets/2b92bc61-0c06-4028-a125-6fbb90c34136)
This is how the task cards appear on the dashboard.
For tasks with a long description, there is a "View More" option that navigates to a separate page showing full task details.

5.![image](https://github.com/user-attachments/assets/dfb5a1e5-937a-4628-884d-dc8a04d1761e)

⚡The spark icon represents notifications.
If a user has an upcoming meeting, a notification will appear here indicating that they've been assigned to it.

6.![image](https://github.com/user-attachments/assets/42f2831b-d603-4370-b098-4c4807a57c4c)

Users can request a new deadline for a task from here by providing a valid reason for the extension.

7.![image](https://github.com/user-attachments/assets/f4170631-b85f-4a6c-9045-a015fbc68fce)
 ![image](https://github.com/user-attachments/assets/86a73df6-4008-47b3-b3d1-7d5c199c1a6a)
This is how they can change task status here

8.![image](https://github.com/user-attachments/assets/e7fdb3e9-4ae8-41bc-83d4-28bc55034343)

Light Mode Theme

ADMIN PAGE:

1.![image](https://github.com/user-attachments/assets/347f1927-9ea4-41f4-8a40-067bd00539d3)
![image](https://github.com/user-attachments/assets/f777df30-4ed3-4370-82c8-4e757cd71167)

Admins can only be created by the system administration through the command line, typically by a backend engineer.
There is no public registration route for admins to ensure security and controlled access.

2.![image](https://github.com/user-attachments/assets/c771c233-00cf-4b2c-80d7-dc2a461e65d8)

This is the admin dashboard page.
Here, the admin can create tasks, view all registered users, schedule meetings, approve deadline extension requests, and manage other admin functionalities.
I’ve also added a counter animation to display task statistics — such as total tasks, tasks in progress, and completed tasks — in a visually appealing way.

3.![image](https://github.com/user-attachments/assets/e4f618c6-0d70-41c7-a0d6-b51fb88c5e22)
This is the page where the admin can approve deadline extension requests.
If any user has requested an extension, the admin can view it here and set a new deadline accordingly.

4.![image](https://github.com/user-attachments/assets/b509f9e3-df5a-4376-8552-521fea268fb1)
![image](https://github.com/user-attachments/assets/90291396-2d8c-4d68-8a7b-d870f271043c)

This is the page where the admin can view all registered users.
An input field is provided to search users by name or email for quick access and filtering.

5.![image](https://github.com/user-attachments/assets/154dc99d-3630-417e-b64b-d178f249f36b)
![image](https://github.com/user-attachments/assets/3a956884-2fe1-48ed-addf-0fc318299976)
![image](https://github.com/user-attachments/assets/55d3cb71-baf7-4d76-8890-efc0bd02a339)

This is the page where the admin can create and assign tasks to users.
Admins can also search for users by name or email before assigning the task.

6.![image](https://github.com/user-attachments/assets/2a38042b-94cb-42c6-964e-546cc729b962)
This is the page where an admin can view all the tasks they have assigned.
Since there can be multiple admins, each admin only sees the tasks assigned by them.
Admins also have the option to delete any of their assigned tasks from here.

7.![image](https://github.com/user-attachments/assets/25c7a357-3944-4d2e-8022-2d9d8cdb6a36)

This is the page where the admin can view all tasks in the system.
Each task displays details such as which admin assigned it, the user it was assigned to, the deadline, and other relevant information.
Task statuses are color-coded for clarity:
In Progress – Blue
Completed – Green
Not Done – Red
Pending – Yellow

8.![image](https://github.com/user-attachments/assets/07596f8b-40c7-481a-be58-b6eb0fc5f823)
Admin Side
![image](https://github.com/user-attachments/assets/183874f3-913b-4c42-84c5-23ad9e7c7107)
User Side
![image](https://github.com/user-attachments/assets/ac5c673d-3e24-4224-956f-85d19e2b7ebc)
Admin Side
![image](https://github.com/user-attachments/assets/3d6beb26-7aea-4202-a0f3-32cf3536ad16)
User Side
This is the Meeting tab where the admin can see all the meetings that have been assigned.Also can cancel a meeting.

The meeting workflow goes like this:

1.The admin creates a meeting by selecting users, setting a topic, and providing a scheduled time.
2.Selected users receive a notification on their dashboard and an email with the meeting details (room ID and password).
3.The admin must first open the Jitsi link, log in, and set the meeting password manually on Jitsi (since Jitsi is free and works this way).
4.Once everything is set, the admin clicks the "Start" button in the dashboard to mark the meeting as live.
5.When the meeting is live, users will see it as active and can join using the provided link and password.

![image](https://github.com/user-attachments/assets/4cc6151b-89b8-4392-99ea-a2f21cdea795)
![image](https://github.com/user-attachments/assets/c0abc176-005b-430f-9810-77219a9f685e)
This is the page where the admin can create a new meeting.
Admins can assign multiple users to the meeting, search for users by name or email using the input field.

![image](https://github.com/user-attachments/assets/1b5442a0-5bcd-4614-b3e8-ef8ac465f7e0)
Light Mode

RESPONSIVE TEST:

ADMIN PAGE:
![image](https://github.com/user-attachments/assets/0d728a51-ed33-478d-b9da-f49ceb2b7005)

![image](https://github.com/user-attachments/assets/b1dec4a3-727c-4036-bdd6-21de471b69a3)
![image](https://github.com/user-attachments/assets/2b773a85-869f-4869-9f21-106cc0d2b821)
![image](https://github.com/user-attachments/assets/ddae6772-2d10-4f81-81ec-60c7335e5de4)
![image](https://github.com/user-attachments/assets/e777c24d-e335-4c2d-8e7f-9f7335ced0c2)
![image](https://github.com/user-attachments/assets/12307386-34e3-446f-9e9a-e69b536250a5)

USER PAGE:

![image](https://github.com/user-attachments/assets/5165b7a3-264f-493c-bc01-e25e97728c9b)
![image](https://github.com/user-attachments/assets/a28dc81f-3cb8-4db2-b571-6aed086d51a2)
![image](https://github.com/user-attachments/assets/da2e2beb-e001-4b5a-aad7-b2feb59e2e90)


























 




  






