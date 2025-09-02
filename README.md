# 🏠 EstateHub - Real Estate Management System

![EstateHub Logo](https://img.shields.io/badge/EstateHub-Real%20Estate%20Management-blue?style=for-the-badge&logo=home&logoColor=white)

A comprehensive, modern real estate management platform built with cutting-edge technologies for seamless property management, listing, and administration.

[![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![NestJS](https://img.shields.io/badge/NestJS-11.0-E0234E?style=flat-square&logo=nestjs)](https://nestjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-47A248?style=flat-square&logo=mongodb)](https://www.mongodb.com/)

---

## 🌟 Features

### 🏡 **Property Management**

- **Comprehensive Property Listings** - Add, edit, and manage property details with rich media support
- **Advanced Property Search** - Multi-criteria filtering by location, price, type, and status
- **Property Details Pages** - Detailed property views with image galleries and specifications
- **Property Status Management** - Track properties as "For Sale", "For Rent", "Sold", etc.

### 👨‍💼 **Admin Dashboard**

- **Admin Mode Toggle** - Seamless switch between user and admin interfaces
- **Property CRUD Operations** - Full create, read, update, delete functionality
- **Property Table Management** - Sortable, filterable property data tables

### 🎨 **User Experience**

- **Modern UI/UX** - Clean, intuitive interface with gradient designs
- **Interactive Components** - Smooth animations and hover effects
- **Search & Filter System** - Real-time property filtering with multiple criteria

### 🔧 **Technical Features**

- **State Management** - Redux Toolkit for efficient state handling
- **Form Validation** - React Hook Form with Zod schema validation
- **Type Safety** - Full TypeScript implementation
- **Component Library** - Reusable UI components
- **API Integration** - RESTful API with NestJS backend
- **Database** - MongoDB with Mongoose ODM
- **File Upload** - Cloudinary integration for image management

---

## 🛠️ Tech Stack

### **Frontend**

| Technology          | Version | Purpose                              |
| ------------------- | ------- | ------------------------------------ |
| **Next.js**         | 15.5.2  | React framework with App Router      |
| **React**           | 19.1.0  | UI library                           |
| **TypeScript**      | 5.0+    | Type safety and developer experience |
| **Tailwind CSS**    | 4.0     | Utility-first CSS framework          |
| **Redux Toolkit**   | 2.8.2   | State management                     |
| **React Hook Form** | 7.62.0  | Form handling and validation         |
| **Zod**             | 4.1.5   | Schema validation                    |
| **Lucide React**    | 0.542.0 | Modern icon library                  |

### **Backend**

| Technology          | Version | Purpose                     |
| ------------------- | ------- | --------------------------- |
| **NestJS**          | 11.0.1  | Node.js framework           |
| **MongoDB**         | 8.18.0  | NoSQL database              |
| **Mongoose**        | 8.18.0  | MongoDB object modeling     |
| **Cloudinary**      | 2.7.0   | Image upload and management |
| **Class Validator** | 0.14.2  | Request validation          |
| **Multer**          | 2.0.2   | File upload handling        |

## 🚀 Getting Started

### **Prerequisites**

- Node.js 18.0 or higher
- npm or yarn package manager
- MongoDB database (local or cloud)
- Git

### **Installation**

1. **Clone the repository**

   ```bash
   git clone https://github.com/YOUR_USERNAME/estatehub.git
   cd estatehub
   ```

2. **Setup Frontend**

   ```bash
   cd frontend
   npm install
   ```

3. **Setup Backend**

   ```bash
   cd ../backend
   npm install
   ```

4. **Environment Configuration**

   **Frontend** (`frontend/.env.local`):

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

   **Backend** (`backend/.env`):

   ```env
   PORT=3001
   MONGODB_URI=mongodb://localhost:27017/estatehub
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

5. **Start Development Servers**

   **Backend** (Terminal 1):

   ```bash
   cd backend
   npm run start:dev
   ```

   **Frontend** (Terminal 2):

   ```bash
   cd frontend
   npm run dev
   ```

6. **Access the Application**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:3001](http://localhost:3001)

---

## 📁 Project Structure

```
estatehub/
├── 📁 frontend/                    # Next.js Frontend Application
│   ├── 📁 src/
│   │   ├── 📁 app/                # Next.js App Router
│   │   │   ├── 📁 admin/          # Admin dashboard pages
│   │   │   │   ├── page.tsx       # Admin home
│   │   │   │   └── 📁 properties/ # Property management
│   │   │   ├── 📁 property/       # Property detail pages
│   │   │   ├── globals.css        # Global styles
│   │   │   ├── layout.tsx         # Root layout
│   │   │   └── page.tsx           # Home page
│   │   ├── 📁 components/         # Reusable UI Components
│   │   │   ├── 📁 admin/          # Admin-specific components
│   │   │   │   ├── property-form.tsx
│   │   │   │   └── property-table.tsx
│   │   │   ├── 📁 layout/         # Layout components
│   │   │   │   ├── header.tsx     # Navigation header
│   │   │   │   └── hero-section.tsx
│   │   │   ├── 📁 property/       # Property components
│   │   │   │   ├── property-card.tsx
│   │   │   │   ├── property-grid.tsx
│   │   │   │   ├── property-list-section.tsx
│   │   │   │   └── search-filters.tsx
│   │   │   └── 📁 ui/             # Base UI components
│   │   ├── 📁 lib/                # Utility functions
│   │   ├── 📁 store/              # Redux store
│   │   │   ├── 📁 api/            # RTK Query APIs
│   │   │   ├── 📁 slices/         # Redux slices
│   │   │   ├── hooks.ts           # Typed hooks
│   │   │   └── index.ts           # Store configuration
│   │   └── 📁 types/              # TypeScript type definitions
│   ├── 📁 public/                 # Static assets
│   ├── package.json               # Frontend dependencies
│   ├── tailwind.config.js         # Tailwind configuration
│   └── tsconfig.json              # TypeScript configuration
├── 📁 backend/                     # NestJS Backend Application
│   ├── 📁 src/                    # Source code
│   │   ├── 📁 modules/            # Feature modules
│   │   ├── 📁 common/             # Shared utilities
│   │   ├── app.module.ts          # Root module
│   │   └── main.ts                # Application entry point
│   ├── 📁 test/                   # Test files
│   ├── package.json               # Backend dependencies
│   └── tsconfig.json              # TypeScript configuration
├── .gitignore                     # Git ignore rules
└── README.md                      # Project documentation
```

---

## 🎯 Key Components

### **Frontend Components**

#### **Layout Components**

- **`Header`** - Navigation with admin mode toggle
- **`HeroSection`** - Landing page hero with search

#### **Property Components**

- **`PropertyCard`** - Individual property display card
- **`PropertyGrid`** - Grid layout for property listings
- **`PropertyListSection`** - Main property listing container
- **`SearchFilters`** - Advanced search and filtering interface

#### **Admin Components**

- **`PropertyForm`** - Create/edit property form
- **`PropertyTable`** - Admin property management table

### **Backend Modules**

- **Property Module** - Property CRUD operations
- **Upload Module** - File upload handling
- **Common Module** - Shared utilities and guards

---

## 🔧 Available Scripts

### **Frontend Scripts**

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### **Backend Scripts**

```bash
npm run start:dev    # Start development server with hot reload
npm run build        # Build for production
npm run start:prod   # Start production server
npm run test         # Run tests
npm run test:cov     # Run tests with coverage
npm run lint         # Run ESLint with auto-fix
```

---

## 🎨 UI/UX Features

### **Design System**

- **Color Palette**: Blue to purple gradients with accent colors
- **Typography**: Modern, readable font hierarchy
- **Spacing**: Consistent spacing using Tailwind's spacing scale
- **Animations**: Smooth hover effects and transitions
- **Icons**: Lucide React icon library for consistency

---

## 🔐 Security Features

- **Input Validation**: Zod schema validation on frontend and backend
- **Type Safety**: Full TypeScript implementation
- **Secure File Upload**: Cloudinary integration with validation
- **Environment Variables**: Secure configuration management

---

## 🚀 Deployment

### **Frontend Deployment (Netlify)**

1. Push your frontend code to a GitHub repository.
2. Go to [Netlify](https://netlify.com) and create a new site.
3. Connect your GitHub repository to Netlify.
4. Configure build settings:
   - **Build Command**: `npm run build` (or your project’s build command)
   - **Publish Directory**: `dist` or `.next` (depending on your framework)
5. Add required **environment variables** in  
   **Site Settings → Build & Deploy → Environment**.
6. Save & Deploy. Netlify will automatically deploy on every push to your main branch.

---

### **Backend Deployment (Render.com)**

1. Push your backend code to a GitHub repository.
2. Go to [Render](https://render.com) and create a new **Web Service**.
3. Connect your GitHub repository to Render.
4. Add required **environment variables** in the Render dashboard.
5. Connect your app to **MongoDB Atlas** (or your production DB).
6. Render will build and deploy automatically on push to your main branch.

---

### **Environment Variables for Production**

```env
# Frontend
NEXT_PUBLIC_API_URL=https://your-api-domain.com
NEXT_PUBLIC_APP_URL=https://your-app-domain.com

# Backend
PORT=3001
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/estatehub
CLOUDINARY_CLOUD_NAME=your_production_cloud_name
CLOUDINARY_API_KEY=your_production_api_key
CLOUDINARY_API_SECRET=your_production_api_secret
```

---

## 📝 API Documentation

### **Property Endpoints**

```
GET    /api/properties          # Get all properties
GET    /api/properties/:id      # Get property by ID
POST   /api/properties          # Create new property
PUT    /api/properties/:id      # Update property
DELETE /api/properties/:id      # Delete property
```

### **Upload Endpoints**

```
POST   /api/upload/image        # Upload property image
DELETE /api/upload/image/:id    # Delete property image
```

---

## 🗺️ Roadmap

- [ ] **User Authentication** - Login/register functionality
- [ ] **Property Favorites** - Save favorite properties
- [ ] **Property Comparison** - Compare multiple properties
- [ ] **Map Integration** - Google Maps property locations
- [ ] **Email Notifications** - Property alerts and updates
- [ ] **Advanced Analytics** - Property market insights
- [ ] **Mobile App** - React Native mobile application

---

## 👥 Authors

- \*_Praveen Kariyawasam_ - [LinkedIn](https://www.linkedin.com/in/chanmithk)

---
