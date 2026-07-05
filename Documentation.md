# Persona AI Documentation

## Introduction

Persona AI is a full-stack MERN application that allows users to interact with user inspired by teaching and conversation style of Hitesh Choudhary and Piyush Garg. The application uses Prompt engineering with the OpenRouter API to simulate different personas.

---

## How I created the Personas

I first started by watching Hitesh sir and Piyush sir's live sessions on YouTube.
I make the transcript of the video and observed things like:
- How they explain concepts
- Their tone of speaking
- The words they usually use
- Their way of motivating students
I also read their Tweets for more details of their conversation style.

After collecting data, I wrote detailed prompts for each person.

The prompts are stored inside:
server/prompts/personas.js

Whenever the user selects a persona, the corresponding prompts is sent to the AI.

## Prompt Engineering

I have used prompt engineering here instead of training a new model.

When a user sends a message, backend first loads the selected persona's prompt.

Then it send the system prompt, previous chat history, current user message to OpenRouter API.

The AI reads all the information before generating a response.

So the flow is like this:

User Message
↓
Load Persona Prompt
↓
Load Previous Messages
↓
Send everything to OpenRouter
↓
Receive AI Response
↓
Save Response in Database

This helps AI answer in the selected persona's style.

## How chat history works

I wanted the AI to remember what the user talked about earlier.

So every message is stored in MongoDB.

Each message has "role" and "content".

When the user sends another message:
 - previous messages are fetched
 - new message is added.
 - everything is sent to OpenRouter.

Because of this the model continue the conversation instead of forgeting the information sent previously by the user.

## Why I used Prompt Engineering

I chose prompt engineering because it is simple to implement, No model training is required, I can easily add more personas later, It reduces development time.

Because of it whenever I need to add another persona, I only have to write another prompt.

## Technologies Used

Frontend:
 - React
 - Vite
 - CSS

Backend: 
 - Node.js
 -Express.js
 -MongoDB
 -JWT Authentication

AI:
 - OpenRouter API
 - GPT-4.1 Mini

## Sample convo 1

Hitesh:

Haan ji, swagat hai! Kaise ho? Kya chal raha hai aaj? Kuch seekhne ya discuss karne ka mood hai? 😌

Me:
Give react defination in short

Hitesh: 

React ek JavaScript library hai jo user interfaces banane ke liye use hoti hai. Simple language mein, React helps you build web pages with reusable components, taaki code clean aur maintain karna aasan ho jaye.

Think of it like LEGO blocks — each block (component) can be built once and used many times. That is the whole idea! 🚀

Aapko React ke baare mein aur detail chahiye toh batao, step-by-step samjhata hoon.

## Sample convo 2

Me:

Why should I learn Docker?

Piyush:

Docker helps you run your application the same way on every computer by packaging everything inside a container.

## Conclusion

Through this project, I learned how Large Language Models work with prompts, how prompt engineering can change the behavior of an AI, and how storing conversation history makes the chatbot feel more natural. I also gained experience working with the MERN stack and integrating an external AI API.