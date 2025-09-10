# 🎉 EventEase

EventEase is a **MERN-based event management and recommendation platform** designed to make college fests, hackathons, and workshops more **seamless, smart, and engaging**.  
It not only helps organizers create and manage events but also provides students with **AI-based event recommendations** tailored to their interests.

---

## 🚀 Features

### 🔍 AI-Powered Event Recommendations
- Suggests events to students based on:
  - Past registrations
  - Interests stored in MongoDB
  - Ratings and reviews
- Example: A student who attends more hackathons will see **tech/coding events** recommended.

### 🛠️ Event Creation & Management
- Organizers can:
  - Create event pages with banners, schedules, and descriptions
  - Manage registrations and attendees
  - Track analytics through a live dashboard

### 🎟️ Smart Ticketing
- Attendees receive **digital tickets with unique QR codes**.
- QR codes ensure **secure and smooth check-in**.

### 🖼️ Vision-Based Features
- **Face-recognition check-ins** alongside QR scanning
- **Crowd counting with computer vision** to monitor attendance in real time

### 📜 Verified Digital Certificates
- Automatically generated after events
- Embedded QR codes ensure **authenticity and verification**

### ⭐ Attendee Engagement
- Rate and review events after participation
- Personalized recommendations improve over time

### 📊 Organizer Dashboard
- Monitor live registrations
- Analyze feedback with charts and ratings
- Gain insights for better future events

---

## 🏗️ Tech Stack

- **Frontend:** React.js  
- **Backend:** Node.js + Express.js  
- **Database:** MongoDB  
- **Authentication:** JWT (JSON Web Tokens)  
- **Computer Vision:** OpenCV / Face Recognition APIs  
- **Ticketing & QR:** QR code generator + scanner libraries  

---

## 🎯 Vision

EventEase is **more than just a ticketing system**.  
It’s a complete **event lifecycle manager** that bridges the gap between organizers and students by offering:
- **Interactive event discovery**
- **Smart and secure participation**
- **Post-event insights for organizers**

Comparable to tools like **Luma**, but **customized for student communities, colleges, and startups**.

---

## 👨‍💻 Team Members

- **Aditya Prakash** – [Aditya.Prakash@adypu.edu.in](mailto:Aditya.Prakash@adypu.edu.in)  
- **Abhay Pratap Yadav** – [Abhaypratap.Yadav@adypu.edu.in](mailto:Abhaypratap.Yadav@adypu.edu.in)  
- **Saubhagya Anubhav** – [Saubhagya.Anubhav@adypu.edu.in](mailto:Saubhagya.Anubhav@adypu.edu.in)  
- **Yashveer Singh** – [yashveer.singh@adypu.edu.in](mailto:yashveer.singh@adypu.edu.in)  

---

## 📌 Future Enhancements
- Advanced recommendation system with **collaborative filtering + ML models**
- Integration with **payment gateways** for paid events
- Mobile app version (React Native)
- Community pages for clubs, colleges, and startups

---

## 🏁 Getting Started

### Prerequisites
- Node.js & npm installed
- MongoDB running locally or on the cloud (MongoDB Atlas)

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/EventEase.git

# Navigate to project directory
cd EventEase

# Install dependencies
npm install

# Start the development server
npm run dev
