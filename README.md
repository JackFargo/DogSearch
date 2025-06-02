# Dog Search 🐕

This repo is a submission for the Fetch Frontend Take-Home Exercise. I have built a modern web application for finding your perfect furry friend. Dog Search helps connect dog lovers with shelter dogs in need of a home.

## Live Demo

Visit the live application at: [https://JackFargo.github.io/DogSearch](https://JackFargo.github.io/DogSearch)

## Features

### Authentication

- Secure login system with name and email validation
- Session management using HttpOnly cookies
- Protected route implementation for authenticated content

### Search & Filtering

- Advanced breed filtering with searchable dropdown
- Age range selection with min/max constraints
- Location-based filtering (zip code, city, state)
- Multi-field sorting (breed, name, age) with direction control
- Paginated results with navigation controls
- Real-time results count and page tracking

### Match System

- Select favorite dogs from search results
- Generate a perfect match based on your preferences
- Comprehensive match information display

### Modern UI/UX

- Responsive design optimized for all screen sizes
- Dynamic dog card animations on the home screen
- Interactive hover effects and transitions
- Secret Dog Mode for enhanced user experience
- Intuitive navigation with clear visual hierarchy

## Technical Implementation

### Code Quality

- Modular component architecture
- Clean separation of concerns
- Consistent code style and formatting
- Comprehensive error handling
- Type-safe API integration

### Best Practices Used

- React hooks for state management
- Context API for global state
- Memoized callbacks for performance
- Responsive design principles
- Secure authentication handling
- Proper session management

### Completion of Minimum Requirements

- Complete authentication flow
- Breed filtering functionality
- Pagination implementation
- Sort functionality (breed, name, age)
- Match generation system
- All dog fields displayed

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/JackFargo/DogSearch.git
   cd DogSearch
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the local development server:

   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Technical Stack

- React.js - Modern frontend framework for building efficient interactive user interfaces
- React Router v6 - Client-side routing with protected route implementation
- React Bootstrap & CSS - Component library and custom styling for responsive design
- Fetch API - HTTP requests with credentials handling
- FontAwesome - Icon library for enhanced visual elements

## API Integration

The application implements the Fetch Frontend Take-Home Service API to create a seamless dog adoption experience. Key implementations include:

- Secure authentication flow with HttpOnly cookies
- Comprehensive search functionality with multiple filter options
- Efficient breed database integration
- Location-based search implementation
- Match generation system
- Paginated results with sorting capabilities

## Project Structure

```
src/
├── components/
│   ├── auth/ - Authentication components (Login/Logout)
│   ├── content/ - Main content components (Home, Search Screen, and 404)
│   └── struct/ - Application layout and routing components
├── context/ - React context providers (Authentication, and Secret Dog Mode context)
├── services/ - API integration and data fetching
└── figures/ - Application assets and images
```

## License

This project is licensed under the MIT License
