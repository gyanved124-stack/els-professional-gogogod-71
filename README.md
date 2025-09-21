# 🚀 Full-Stack Starter Kit

A complete full-stack application starter kit with React frontend, Node.js backend, and automated CI/CD pipeline.

## ✨ Features

### Frontend (React + Vite)
- ⚛️ React 18 with modern hooks
- ⚡ Vite for fast development
- 🎨 Beautiful gradient UI design
- 🔐 Authentication with JWT
- 📱 Responsive design
- ✅ Unit testing with Vitest
- 🎭 Component testing with React Testing Library

### Backend (Node.js + Express)
- 🚀 Express.js REST API
- 🔒 JWT authentication
- 🛡️ Security middleware (Helmet, CORS)
- ✅ Unit testing with Jest
- 📊 Dashboard API endpoints
- 🏥 Health check endpoints

### DevOps & CI/CD
- 🔄 GitHub Actions workflows
- 🧪 Automated testing
- 📦 Automated releases
- 🚀 Deployment pipelines
- 📋 Release drafting

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm
- Git

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd <project-name>
```

2. Install all dependencies:
```bash
npm run install:all
```

3. Start development servers:
```bash
npm run dev
```

This will start:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 🔐 Demo Login Credentials

| Username | Password | Role |
|----------|----------|------|
| admin | password123 | Administrator |
| user | userpass | Regular User |

## 📁 Project Structure

```
├── .github/                 # GitHub Actions workflows
│   ├── workflows/
│   └── release-drafter.yml
├── client/                  # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
├── server/                  # Node.js backend
│   ├── src/
│   └── package.json
├── .env                     # Environment variables
└── package.json            # Root package.json
```

## 🧪 Testing

### Run all tests:
```bash
npm test
```

### Frontend tests only:
```bash
npm run client:test
```

### Backend tests only:
```bash
npm run server:test
```

### Test coverage:
```bash
cd client && npm run test:coverage
cd server && npm run test:coverage
```

## 🏗️ Building

### Build frontend:
```bash
npm run client:build
```

### Build backend:
```bash
npm run server:build
```

## 🔄 CI/CD Pipeline

The project includes automated GitHub Actions workflows:

1. **CI Pipeline** (`ci.yml`) - Runs on every push/PR
   - Frontend and backend testing
   - Code linting
   - Build verification
   - Security scanning

2. **CD Pipeline** (`cd.yml`) - Manual deployment
   - Staging and production environments
   - Health checks
   - Rollback capabilities

3. **Release Management** (`release.yml`) - Automated releases
   - Version tagging
   - Release notes generation
   - Asset publishing

## 🚀 Deployment

### Manual Deployment
Go to Actions tab → Continuous Deployment → Run workflow

### Automatic Deployment
Push to main branch → CI runs → CD triggers automatically

## 📊 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/activity` - Get user activity

### Health
- `GET /api/health` - Server health check

## 🛠️ Development

### Adding New Features
1. Create feature branch: `git checkout -b feature/new-feature`
2. Make changes
3. Add tests
4. Submit PR

### Environment Variables

#### Client (.env)
```bash
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=Starter Kit App
```

#### Server (.env)
```bash
NODE_ENV=development
PORT=5000
JWT_SECRET=your-secret-key
```

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start both client and server |
| `npm run client:dev` | Start frontend only |
| `npm run server:dev` | Start backend only |
| `npm test` | Run all tests |
| `npm run client:build` | Build frontend |
| `npm run server:build` | Build backend |
| `npm run install:all` | Install all dependencies |

## 🔧 Customization

### Adding Database
1. Install your preferred database driver
2. Update server configuration
3. Add database models
4. Update authentication logic

### Styling
- Modify `client/src/App.css` for global styles
- Add component-specific styles
- Consider adding a UI library (Material-UI, Chakra UI, etc.)

### Authentication
- Currently uses in-memory user storage
- Replace with database integration
- Add password reset, registration, etc.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
1. Check the documentation
2. Look at existing issues
3. Create a new issue with detailed description

---

Made with ❤️ using React, Node.js, and GitHub Actions
