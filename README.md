# 📅 Advanced Daily To-Do App

A beautiful, feature-rich daily task management application built with vanilla JavaScript, HTML, and CSS. This app helps you organize your tasks with date and time tracking, filtering capabilities, and visual progress tracking.

## ✨ Features

### Core Functionality
- ✅ **Add Tasks** - Create tasks with name, description, time, and date
- ✏️ **Edit Tasks** - Update existing tasks easily
- 🗑️ **Delete Tasks** - Remove tasks with confirmation
- ✔️ **Toggle Status** - Mark tasks as completed or pending
- 💾 **Local Storage** - All tasks are automatically saved in browser localStorage

### Advanced Features
- 🔍 **Smart Filtering**:
  - View all tasks
  - Filter by today's tasks
  - Show only completed tasks
  - Show only pending tasks
  - **Date Search** - Search tasks by any specific date
- 📊 **Progress Chart** - Visual pie chart showing completed vs pending tasks
- 🔔 **Smart Alerts** - Get notified about pending tasks for today
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- 🎨 **Modern UI** - Beautiful gradient design with smooth animations

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server or installation required!

### Installation

1. Clone or download this repository
   ```bash
   git clone <repository-url>
   cd to-do-app
   ```

2. Open `index.html` in your web browser
   - Simply double-click the `index.html` file, or
   - Right-click and select "Open with" your preferred browser

That's it! The app is ready to use.

## 📖 Usage Guide

### Adding a Task
1. Enter the task name (required)
2. Optionally add a description
3. Set a time for the task (optional)
4. Select a date (defaults to today)
5. Click "Save Task"

### Managing Tasks
- **Toggle Status**: Click the ✔️ button to mark a task as completed or pending
- **Edit Task**: Click the ✏️ button to edit a task
- **Delete Task**: Click the 🗑️ button to delete a task (with confirmation)

### Filtering Tasks
- **All**: Shows all tasks
- **Today**: Shows only today's tasks
- **Completed**: Shows only completed tasks
- **Pending**: Shows only pending tasks
- **Date Search**: 
  - Select a date from the date picker
  - Tasks for that date will be displayed automatically
  - Click "Search Date" to manually search
  - Click "Clear" to reset and show all tasks

### Progress Tracking
- View your progress with the interactive pie chart at the bottom
- The chart shows the ratio of completed vs pending tasks

## 📁 Project Structure

```
to-do-app/
│
├── index.html      # Main HTML file
├── style.css       # Stylesheet with modern design
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## 🛠️ Technologies Used

- **HTML5** - Structure and semantic markup
- **CSS3** - Modern styling with gradients and animations
- **JavaScript (ES6+)** - Core functionality and interactivity
- **Chart.js** - Progress visualization (loaded via CDN)
- **LocalStorage API** - Data persistence

## 🎨 Features Breakdown

### Task Management
- Each task has a unique ID for reliable operations
- Tasks include: name, description, time, date, and status
- Form validation ensures task names are required

### Data Persistence
- All tasks are automatically saved to browser localStorage
- Data persists between browser sessions
- No backend server required

### User Experience
- Smooth animations and hover effects
- Responsive design for all screen sizes
- Intuitive interface with clear visual feedback
- Auto-scroll to form when editing tasks

## 🌐 Browser Compatibility

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Opera (latest)

## 📝 Notes

- The app uses browser localStorage, so data is stored locally on your device
- If you clear browser data, your tasks will be lost
- For sound alerts, you can optionally add a `bell.mp3` file in the project directory

## 🔮 Future Enhancements (Potential)

- Export/Import tasks (JSON)
- Task categories/tags
- Task priorities
- Due date reminders
- Dark mode toggle
- Task search by name
- Drag and drop reordering
- Task statistics and analytics

## 📄 License

This project is open source and available for personal and educational use.

## 👤 Author

Created as a daily task management solution.

---

**Enjoy organizing your tasks! 🎉**

