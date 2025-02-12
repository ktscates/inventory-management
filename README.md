# Inventory Management System

## Overview

The **Inventory Management System** is designed to help efficiently track and manage inventory, including items like **laptops, furniture, and cleaning materials**. The system features **role-based access control (RBAC)** to ensure secure and organized inventory management.

## Features

- **User Authentication & Role Management**
  - Users must log in to access the system.
  - Only **Super Admins** and **Inventory Managers** can create users.
  - Roles: `Super Admin`, `Inventory Manager`, and `Program Manager`.
- **Pagination**
  - Users list are paginated for better usability.

## Tech Stack

### Frontend

- **Next.js (React Framework)**
- **TypeScript**
- **Tailwind CSS** (for styling)

### Backend

- **Firebase Firestore** (for database & authentication)

## Installation & Setup

### Clone the Repository

```sh
git clone https://github.com/ktscates/inventory-management.git
cd inventory-management
```

### Install Dependencies

```sh
npm install
```

### Environment Variables

Create a `.env.local` file and configure Firebase:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

### Running the Project

```sh
npm run dev
```

This will start the development server at `http://localhost:3000`.

## Usage

### User Roles & Access

- **Super Admin**: Full access to all features.
- **Inventory Manager**: Manages inventory and users (except Super Admins).
- **Program Manager**: Can view and request items but cannot manage inventory.

### Managing Users

- Click **Create User** to add a new user.
- Edit user details by clicking **Edit**.
- Delete users by clicking **Delete** (except Super Admins).

## License

This project is licensed under the **MIT License**.

---

🚀 **Happy Coding!**
