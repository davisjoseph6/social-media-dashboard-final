# Social Media Dashboard

![Social Media Dashboard on Amazon Web Services](https://github.com/user-attachments/assets/f361429f-be84-4636-a26b-7fda57580558)!


Welcome to the **Social Media Dashboard** repository. This project is a fully integrated social media platform that combines user profile management, real-time messaging, post creation and interaction, analytics, chatbot functionality, and more, all deployed using AWS services.

## About the Developer

Hello! I'm [Davis Joseph](https://www.linkedin.com/in/davisjoseph767/), a dedicated software engineer and cloud enthusiast with a passion for creating innovative solutions. Connect with me on [Twitter](https://x.com/davisjoseph76) for updates on my latest projects and follow my [Portfolio Project repository](https://github.com/yourportfolio) for more of my work.

## Access the Site

You can access the live site [here](https://main.d3v06jwbcel14r.amplifyapp.com/).

## Project Description

The **Social Media Dashboard** is designed to provide a comprehensive social media experience with functionalities similar to popular platforms. The project leverages AWS for serverless deployment, ensuring scalability, reliability, and cost-effectiveness.

### Overview
![Overview](https://github.com/user-attachments/assets/bd7a6f7d-f10a-43dd-8e4f-613efb81a76b)!

### Flowchart
![Flowchart](https://github.com/user-attachments/assets/9653485a-cf44-4286-a8b1-c280ef713768)!

### Technologies and AWS Services Used
![Technologies Used](https://github.com/user-attachments/assets/cee31ef9-54f7-419e-a747-6057a8befafb)!

### AWS Services
![AWS Services](https://github.com/user-attachments/assets/3746ab14-71da-4328-b212-e2f1c5809734)!

### Story of Development

The development journey of the Social Media Dashboard began with a simple idea: to integrate various social media functionalities into a single cohesive platform. Starting from user authentication and profile management, the project expanded to include real-time messaging, post creation, and analytics. The integration of AWS services like DynamoDB, Cognito, Lambda, and QuickSight allowed for seamless scalability and performance optimization. This project is a testament to the power of cloud services in modern application development.

### Implemented Features

- **User Profile Management**: Create and update user profiles with secure storage using AWS DynamoDB.
- **Real-Time Messaging**: Send and receive messages in real-time using AWS IoT and DynamoDB.
- **Post Creation and Interaction**: Create, like, and delete posts with real-time updates and interaction tracking.
- **Analytics Dashboard**: View user and system analytics using embedded Amazon QuickSight dashboards.
- **Chatbot Integration**: Interact with an AI-powered chatbot using Amazon Lex for enhanced user experience.
- **Serverless Architecture**: Deployed using AWS Lambda, API Gateway, and other serverless technologies for high availability and scalability.

### Features to be Implemented

- **Advanced Analytics**: More detailed user behavior analysis and system performance metrics.
- **Enhanced Chatbot**: Additional conversational capabilities and improved response accuracy.
- **Notification System**: Real-time notifications for user interactions and system alerts.
- **Mobile Application**: Development of a companion mobile app for better accessibility.

### Challenges Faced

One of the most significant challenges was managing the integration of multiple AWS services and ensuring seamless communication between them. Debugging serverless applications, especially those involving multiple asynchronous processes, required careful monitoring and logging. Optimizing the performance of DynamoDB queries and managing the security configurations for various AWS services were also challenging but ultimately rewarding tasks.

### Project Completion Time

The project was completed in 38 days from beginning to end.

## Repository Structure

The repository is organized into several services, each responsible for different functionalities of the platform:

- **UserProfileService**
  - Handles user profile creation and management.
  - Uses AWS DynamoDB for data storage.
  - Contains serverless configurations for deployment.

- **ChatbotService**
  - Integrates with Amazon Lex for chatbot interactions.
  - Provides a conversational interface for users.

- **MessagingService**
  - Manages real-time messaging between users.
  - Utilizes AWS IoT and DynamoDB for message storage and retrieval.

- **NewPostsService**
  - Allows users to create, like, and delete posts.
  - Tracks user interactions and posts analytics.

- **AnalyticsService**
  - Provides analytics data and visualization using Amazon QuickSight.
  - Summarizes and stores analytics data in DynamoDB.

- **Social Media Dashboard React Application**
  - Frontend application built with React.
  - Integrates with backend services for user authentication, posting, messaging, and analytics.

Each service folder contains the respective code, configuration files, and resources necessary for deployment and operation.

---

Thank you for exploring the **Social Media Dashboard** repository. Contributions, suggestions, and feedback are highly appreciated. Let's build something amazing together!
