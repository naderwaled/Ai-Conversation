# Ai-Conversation

## How to Run the Project Locally

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/ai-conversation.git
   cd ai-conversation
   ```

2. **Install Dependencies:**
   Navigate to the frontend directory and install the necessary packages.
   ```bash
   cd frontend
   npm install
   ```

3. **Set Up Environment Variables:**
   Create a `.env.local` file in the `frontend` directory and add the necessary environment variables. You can use the `frontend/.env.local` file as a reference.
   Ensure you include the following variable:
   ```env
   NEXT_PUBLIC_ELEVENLABS_AGENT_ID=your_agent_id_here
   ```

4. **Run the Development Server:**
   Start the development server.
   ```bash
   npm run dev
   ```

5. **Access the Application:**
   Open your browser and go to `http://localhost:3000` to view the application.
6. **Configure ElevenLabs Webhook**

    To integrate ElevenLabs with your Supabase function, follow these steps:

     **Set Up the Webhook URL:**
      - Navigate to the ElevenLabs dashboard and go to the "Webhooks" section.
      - Add a new webhook with the following URL:
        ```
        http://<your-supabase-url>/functions/v1/addConversationData
        ```
      - Replace `<your-supabase-url>` with your actual Supabase URL.


     **Configure the Webhook:**
     - In the ElevenLabs project settings, ensure that the webhook is set to trigger on the desired events, such as "Post-Call Webhook".
     - Copy Hmac Secret and paste it in the Supabase function, Replace the existing Hmac Secret.
    For more detailed instructions, refer to the [ElevenLabs Webhook Documentation](https://elevenlabs.io/docs/conversational-ai/workflows/post-call-webhooks).

7. **Set Up Supabase Database**
   **Create the `Call` Table:**
   - Open the Supabase dashboard and navigate to the SQL editor.
   - Run the following SQL command to create the `Call` table:

     ```sql
     CREATE TABLE Call (
       id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
       conversation_id TEXT,
       agent_id TEXT,
       transcript JSON,
       call_duration INTEGER
     );
     ```

   - This will set up the necessary table to store conversation data.
   - After Deploying the Supabase Function, Go to function Details and disable "Enforce JWT Verification"

## Technologies Used
- **React,Next.Js**: For building the user interface.
- **TypeScript**: For type safety and better development experience.
- **ElevenLabs**: For AI-powered conversation capabilities.
- **Supabase**: As the database solution.
- **Vercel**: For deployment and hosting.

## Additional Setup Instructions

- Ensure you have Node.js and npm installed on your machine.
- If you encounter any issues with dependencies, try deleting the `node_modules` folder and `package-lock.json` file, then run `npm install` again.

## Demo

Check out the live demo of the project at: [Ai-Conversation Demo](https://ai-conversation-git-dev-nader-waleds-projects.vercel.app/)


