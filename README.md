# 🚀 Virtual Character Chat

Virtual Character Chat is an AI-based chat application that allows users to create personalized virtual characters and interact with them using text-to-speech (TTS) capabilities. The project includes both frontend and backend components, utilizing Firebase for authentication, MongoDB for data storage, and Gemini API for intelligent responses. Additionally, images are generated using DALL·E.

---

## 🎨 Screenshots
If your project has a UI, add some screenshots here to enhance readability! 📷

---

## 📂 Project Structure
```
VIRTUAL_CHARACTER_CHAT
├── client/            # Frontend React Application
│   ├── src/
│   │   ├── components/    # Component Library
│   │   ├── config/        # Firebase Configuration
│   │   ├── content/       # State Management (React Context)
│   │   ├── utils/         # Utility Functions
│   │   ├── index.js       # Entry Point
│   │   ├── index.css      # Global Styles
│   ├── package.json       # Frontend Dependencies
│   ├── yarn.lock          # Dependency Lock File
│   ├── .gitignore         # Git Ignore File
│   ├── .env               # Frontend Environment Variables
│
├── server/            # Backend Express API
│   ├── config/        # Configuration (Firebase Admin)
│   │   ├── serviceAccountKey.json  # Firebase Service Account Credentials
│   ├── models/        # MongoDB Models
│   ├── routes/        # API Routes
│   ├── app.js         # Server Entry Point
│   ├── package.json   # Backend Dependencies
│   ├── yarn.lock      # Dependency Lock File
│   ├── .env           # Backend Environment Variables
│
└── README.md          # Project Documentation
```

---

## 🌟 Features
✅ **Virtual Character Creation**: Users can customize character appearance, background story, and voice  
✅ **AI Chat Interaction**: Integrated with Gemini API for natural conversations  
✅ **Text-to-Speech (TTS)**: High-quality voice synthesis  
✅ **User Authentication**: Firebase Auth for user management  
✅ **Real-time Database**: MongoDB for data storage  
✅ **Modern UI**: Built with React and Tailwind CSS  
✅ **AI-Generated Images**: Character images created using DALL·E  

---

## 🛠️ Tech Stack
### Frontend
- **React 19** - UI framework
- **React Router** - Client-side routing
- **Framer Motion** - Animations
- **Tailwind CSS** - Styling framework
- **Axios** - API handling
- **Firebase** - Authentication and storage

### Backend
- **Express.js** - Web framework
- **MongoDB (Mongoose)** - Database storage
- **Firebase Admin SDK** - Backend Firebase management
- **Gemini API** - AI-generated responses
- **DALL·E** - AI-generated character images
- **CORS & dotenv** - Cross-origin handling and environment configuration

---

## 🚀 Getting Started

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/your-repo/virtual-character-chat.git
cd virtual-character-chat
```

### **2️⃣ Install Dependencies**
#### 📦 Frontend
```bash
cd client
yarn install
```
#### 🔧 Backend
```bash
cd ../server
yarn install
```

### **3️⃣ Configure Environment Variables**
Create `.env` files in both `server/` and `client/` directories with the following content:

#### **Frontend (`client/.env`)**
```env
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
```

#### **Backend (`server/.env`)**
```env
DB_STRING=mongodb+srv://your_mongo_uri
ELEVENLABS_API_KEY=your_elevenlabs_api_key
OPENAI_API_KEY=your_openai_api_key
```

### **4️⃣ Firebase Service Account Setup**
The `serviceAccountKey.json` file contains the Firebase service account credentials, which allow the backend to authenticate and interact with Firebase services securely. Ensure that this file is stored in `server/config/` and that your `.env` file points to its correct location.

Example content of `serviceAccountKey.json` (values are placeholders):
```json
{
    "type": "service_account",
    "project_id": "your_project_id",
    "private_key_id": "your_private_key_id",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEv...\n-----END PRIVATE KEY-----\n",
    "client_email": "your_client_email",
    "client_id": "your_client_id",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "your_client_x509_cert_url"
}
```

---

### **5️⃣ Start the Application**
#### 🌐 Start Frontend
```bash
cd client
yarn start
```
#### 🖥️ Start Backend
```bash
cd server
yarn node app.js
```

---

## 🤝 Contribution Guide
1. **Fork** this repository
2. **Create** a new branch (`git checkout -b feature-branch`)
3. **Commit** your changes (`git commit -m "Add new feature"`)
4. **Push** to your branch (`git push origin feature-branch`)
5. **Submit a Pull Request** 🚀

---

## 📜 License
This project is licensed under the **MIT License**. See [LICENSE](LICENSE) for details.