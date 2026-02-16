# 💬 RealTime Chat App

A modern, full-stack real-time messaging application built with the MERN stack and Socket.io. Features instant message delivery, online status indicators, image sharing, and a beautiful responsive UI.

![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-20-green?style=for-the-badge&logo=node.js)
![Socket.io](https://img.shields.io/badge/Socket.io-4-black?style=for-the-badge&logo=socket.io)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### Real-Time Communication

- ⚡ **Instant messaging** - Messages delivered in real-time using WebSockets
- 🟢 **Online status indicators** - See who's online with green badges
- 📎 **Image sharing** - Send and receive images in conversations
- 🔔 **Real-time updates** - See new messages without refreshing

### User Experience

- 🎨 **Modern UI** - Beautiful interface with Tailwind CSS and DaisyUI
- 📱 **Responsive design** - Works seamlessly on desktop and mobile devices
- ⌨️ **Sound effects** - Optional keyboard typing sounds
- 🔄 **Auto-scroll** - Automatically scrolls to latest messages
- 💀 **Loading skeletons** - Smooth loading states for better UX

### Security & Authentication

- 🔐 **JWT authentication** - Secure login with JSON Web Tokens
- 🍪 **HTTP-only cookies** - Secure token storage
- 🔒 **Protected routes** - API endpoints protected with middleware
- 🛡️ **Arcjet security** - Bot protection and rate limiting
- 🔑 **Password hashing** - bcrypt for secure password storage

### User Management

- 👤 **User profiles** - Customizable profile pictures
- ☁️ **Cloudinary integration** - Image upload and storage
- 📧 **Welcome emails** - Automated welcome emails on signup
- 🟢 **Online tracking** - Real-time online/offline status

## 🚀 Tech Stack

### Frontend

- **React 19** - UI library with hooks and functional components
- **Vite 7** - Fast build tool and development server
- **React Router DOM 7** - Client-side routing
- **Tailwind CSS 4** - Utility-first CSS framework
- **DaisyUI 5** - Tailwind component library
- **Zustand 5** - Lightweight state management
- **Socket.io-client** - Real-time communication
- **Axios** - HTTP client
- **Lucide React** - Icon library
- **Radix UI** - Accessible UI primitives
- **React Hot Toast** - Toast notifications

### Backend

- **Node.js** - JavaScript runtime
- **Express.js 5** - Web framework
- **Socket.io 4** - WebSocket communication
- **MongoDB + Mongoose 9** - Database and ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Cloudinary** - Image storage
- **Resend** - Email service
- **Arcjet** - Security protection

## 📁 Project Structure

```
realtime-chat-app/
├── frontend/                    # React frontend
│   ├── src/
│   │   ├── components/          # UI components
│   │   ├── pages/               # Route pages
│   │   ├── store/               # Zustand stores
│   │   └── lib/                 # Utilities
│   └── package.json
│
├── backend/                     # Node.js backend
│   ├── src/
│   │   ├── controllers/         # Route handlers
│   │   ├── models/              # Mongoose schemas
│   │   ├── routes/              # API routes
│   │   ├── middleware/          # Express middleware
│   │   ├── lib/                 # Configurations
│   │   └── emails/              # Email templates
│   └── package.json
│
└── package.json                 # Root package.json
```

## 🛠️ Installation

### Prerequisites

- Node.js (v20 or higher)
- MongoDB Atlas account
- Cloudinary account
- Resend API key (for emails)

### 1. Clone the repository

```bash
git clone https://github.com/SanyamThakur07/realtime-chat-app.git
cd realtime-chat-app
```

### 2. Install dependencies

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend && npm install

# Install backend dependencies
cd ../backend && npm install
```

### 3. Set up environment variables

Create a `.env` file in the `backend` directory:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
RESEND_API_KEY=your_resend_api_key
CLIENT_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
ARCJET_KEY=your_arcjet_key
ARCJET_ENV=production
```

### 4. Run the application

```bash
# From the root directory
npm run dev
```

This will start both the frontend (Vite dev server) and backend (Node.js server).

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## 📝 API Endpoints

### Authentication

- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/check` - Check authentication status
- `PUT /api/auth/update-profile` - Update user profile

### Messages

- `GET /api/messages/contacts` - Get all contacts
- `GET /api/messages/chats` - Get chat partners
- `GET /api/messages/:id` - Get messages with specific user
- `POST /api/messages/send/:id` - Send message to user

## 🎯 Key Features Explained

### Real-Time Messaging

The app uses Socket.io for bidirectional real-time communication. When a user sends a message:

1. Message is saved to MongoDB
2. Socket.io emits the message to the receiver's socket ID
3. Receiver gets the message instantly without polling

### Online Status

- Socket connection establishes user's online status
- Green badge appears on user's avatar when online
- Status updates in real-time across all connected clients
- Chat header shows "Online" or "Offline" for selected user

### Optimistic UI Updates

Messages appear immediately in the UI before server confirmation, providing instant feedback. If the server request fails, the UI reverts to the previous state.

### Image Sharing

Images are uploaded to Cloudinary and the URL is stored in the message. This allows efficient image delivery and storage.

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **HTTP-only Cookies** - Prevents XSS attacks on auth tokens
- **Password Hashing** - bcrypt with salt rounds
- **CORS Configuration** - Secure cross-origin requests
- **Arcjet Protection** - Rate limiting and bot detection
- **Input Validation** - Server-side validation on all inputs

## 🚀 Deployment

### Frontend (Vercel/Netlify)

1. Build the frontend: `cd frontend && npm run build`
2. Deploy the `dist` folder to your hosting platform

### Backend (Railway/Render/Heroku)

1. Set all environment variables in your hosting platform
2. Deploy the backend directory
3. Ensure MongoDB Atlas allows connections from your server IP

### Important Notes

- Update `CLIENT_URL` in backend environment variables to your deployed frontend URL
- Update CORS origins in backend to allow your deployed frontend
- Use production-grade JWT secrets
- Enable MongoDB Atlas network access for your server

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Socket.io](https://socket.io/) for real-time communication
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [DaisyUI](https://daisyui.com/) for UI components
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for database hosting
- [Cloudinary](https://cloudinary.com/) for image management

---

⭐ Star this repo if you find it helpful!
