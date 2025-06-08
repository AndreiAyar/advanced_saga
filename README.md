# Advanced Saga Chat Demo

This project is a demonstration chat application built for learning and experimenting with advanced concepts in React, Redux, Redux-Saga, and real-time communication using Socket.IO.

## Overview

The app allows multiple users to join a chat room, send messages, and see the list of online users in real time. It features:

- Real-time messaging using Socket.IO (Node.js backend + React frontend)
- User presence/online users list
- Fun features like "buzz" (shakes the chat window)
- Redux for state management
- Redux-Saga for handling side effects and async flows
- Styled-components for UI styling

## Stack

- **Frontend:** React, Redux, Redux-Saga, styled-components, socket.io-client
- **Backend:** Node.js, Express, Socket.IO

## Purpose

This project is intended as a learning/demo project to explore:

- Real-time web app patterns
- Advanced Redux and Redux-Saga usage
- Integration of React with real-time backends
- UI state management for chat applications

## Usage

1. Start the backend server:
   ```
   cd server
   npm install
   npm start
   ```

2. Start the frontend:
   ```
   cd client
   npm install
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser. You can open multiple tabs or windows to simulate multiple users.

## Notes

- Usernames are randomly generated for demo purposes.
- The project is not intended for production use.
- Feel free to experiment and modify for your own learning!

---
