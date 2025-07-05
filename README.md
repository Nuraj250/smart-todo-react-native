# 🧠 Smart To-Do App

A beautifully designed cross-platform to-do list app built with **React Native + Expo**.  
Features dark/light mode, smooth animations, offline persistence, and task editing.


---

## 🚀 Features

- ✅ Add / Edit / Delete tasks
- ✅ Mark tasks as completed
- ✅ Save tasks locally using AsyncStorage
- ✅ Mobile-ready dark/light mode toggle
- ✅ Reusable components and modal popups
- ✅ Modern UI with soft animations and icons

---

## 🛠️ Tech Stack

- **React Native** (with Expo)
- **AsyncStorage** for persistent tasks
- **React Navigation** (native-stack)
- **UUID (mobile safe)** via `react-native-uuid`
- **Dark Mode** with custom theme context
- Clean architecture, reusable components

---

## 📦 Folder Structure

```

client/
├── assets/
├── components/
│   ├── FloatingActionButton.tsx
│   ├── Header.tsx
│   ├── TaskItem.tsx
│   ├── TaskModal.tsx
│   └── ThemeToggle.tsx
├── context/
│   └── ThemeContext.tsx
├── screens/
│   └── HomeScreen.tsx
├── styles/
│   └── globalStyles.ts
├── utils/
│   ├── Colors.ts
│   └── storage.ts
├── App.tsx
├── app.json
├── babel.config.js
└── package.json

````

---

## 📲 Running the App

### 1️⃣ Prerequisites

- [Node.js](https://nodejs.org/) ≥ 16.x
- [Expo CLI](https://docs.expo.dev/get-started/installation/) installed globally
- 
  ```bash
  npm install -g expo-cli

* Android/iOS phone with **Expo Go** app
* OR Emulator (via Android Studio or Xcode)

---

### 2️⃣ Install dependencies

```bash
cd client
npm install
```

---

### 3️⃣ Start the development server

```bash
npx expo start
```

* A QR code will appear
* Scan it using **Expo Go** on your phone (on same Wi-Fi)
* Or press `a` to open in Android emulator
* Or press `w` to run in your web browser

---

## ⚠️ Common Issues

### ❌ `crypto.getRandomValues()` not supported

* Fix: Replace `uuid` with `react-native-uuid`
* Make sure to use:

  ```ts
  import uuid from 'react-native-uuid';
  uuid.v4().toString();
  ```

---

## 📸 Screenshots (optional)

*Add GIFs or screenshots of the app UI here*

---

## 🧠 Ideas for Future Features

* Due dates and reminders
* Priority levels
* Category filters
* Cloud sync (Firebase or Supabase)
* Push notifications

---

## 🙌 Author

**Nuraj Shaminda**
React Native & Full Stack Developer
📧 [nurajshaminda200@gmail.com](mailto:nurajshaminda200@gmail.com)

---

## 📄 License

MIT – Free to use and modify.
