# Doctor App

Doctor App is a React-based web application designed for doctors to manage their patients, appointments, chats, calls, and settings in one clean interface.

---

##  Application Structure

The Doctor App is organized into several key parts:

- **Pages**: Individual views corresponding to different routes:
  - `Login` — user authentication page.
  - `Appointments` — doctors can view appointments and patient's infos.
  - `My Patients` — list and details of patients fetched from the API.
  - `Chats` — real-time messaging interface (in progress).
  - `Calls` — video or audio call functionality (in progress).
  - `Settings` — user and app preferences (in progress).

- **Components**:
  - `Navbar` — the navigation bar shown to authenticated users.
  - `PrivateRoute` — wrapper component protecting private pages from unauthorized access.


---

## Login Credentials

To log in and explore the application, you can use the following test credentials:

- **Username:** `test`
- **Password:** `test`

---

## Tech Stack

- **Frontend:** React, React Router v6
- **UI Framework:** Material UI (MUI) components
- **Authentication & State:** React Context (`auth.context`)

---

The application utilizes the freely available API https://randomuser.me to fetch and display patient information dynamically.

Material UI (MUI) components have been implemented on the Login and My Patients pages to provide a consistent and responsive user interface.

---

## 📦 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Katt-Lac/doctor-app.git
cd doctor-app
npm install
npm start
