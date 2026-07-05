# Persona AI

Persona AI is a MERN stack chatbot application that lets users interact with AI personas inspired by the teaching styles of Hitesh Choudhary and Piyush Garg. The project uses Prompt Engineering with the OpenRouter API to generate responses while maintaining conversation history.

---

## Features

- User Authentication (Login & Register)
- Multiple AI Personas
- Real-time AI Chat
- Prompt Engineering
- Chat History Storage
- Context-Aware Conversations
- Responsive User Interface

---

## Tech Stack

### Frontend
- React
- Vite
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

### AI
- OpenRouter API
- GPT-4.1 Mini

---

## Project Structure

```
Persona_AI/
│
├── client/
├── server/
├── README.md
└── DOCUMENTATION.md
```

---

##  Installation

### Clone the repository

```bash
git clone https://github.com/Prachi-3101/Persona_AI.git
cd Persona_AI
```

### Install dependencies

#### Client

```bash
cd client
npm install
```

#### Server

```bash
cd server
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file inside the `server` folder.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENROUTER_API_KEY=your_openrouter_api_key
```

If required, create a `.env` file inside the `client` folder.

```env
VITE_API_URL=http://localhost:5000
```

---

## Run the Project

### Start Backend

```bash
cd server
npm start
```

### Start Frontend

```bash
cd client
npm run dev
```

Open your browser and visit:

```
http://localhost:5173
```

---

## Documentation

Detailed project documentation is available in the **DOCUMENTATION.md** file.

It includes:
- Persona creation process
- Prompt engineering strategy
- System architecture
- Sample conversations


---

## Author

**Prachi**

Built as a MERN Stack project to demonstrate Prompt Engineering, AI integration, and Context Management using OpenRouter.