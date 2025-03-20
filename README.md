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

## Technologies Used

- **React**: For building the user interface.
- **TypeScript**: For type safety and better development experience.
- **ElevenLabs**: For AI-powered conversation capabilities.
- **Supabase**: As the database solution.
- **Vercel**: For deployment and hosting.

## Additional Setup Instructions

- Ensure you have Node.js and npm installed on your machine.
- If you encounter any issues with dependencies, try deleting the `node_modules` folder and `package-lock.json` file, then run `npm install` again.

## Demo

Check out the live demo of the project at: [Ai-Conversation Demo](https://ai-conversation-git-dev-nader-waleds-projects.vercel.app/)