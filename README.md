# Dog Search

A modern web application for finding your perfect furry friend. Dog Search helps connect dog lovers with shelter dogs in need of a home.

## Features

### Authentication

- Secure login system using name and email
- Session management with secure cookie handling
- Protected routes for authenticated users

### Advanced Dog Search

- Filter dogs by breed with real-time search
- Age range filtering
- Sort results by breed, name, or age
- Pagination support
- Results count display

### Match System

- Select favorite dogs from search results
- Generate a perfect match based on your preferences
- Detailed match information display

### Modern UI/UX

- Responsive design using React Bootstrap
- Beautiful animations and transitions
- Interactive dog cards with hover effects
- Secret Dog Mode for a fun browsing experience

## Technical Implementation

### Code Quality

- Modular component architecture
- Clean separation of concerns
- Consistent code style and formatting
- Comprehensive error handling
- Type-safe API integration

### Best Practices

- React hooks for state management
- Context API for global state
- Memoized callbacks for performance
- Responsive design principles
- Secure authentication handling
- Proper session management

### Minimum Requirements Fulfillment

- Complete authentication flow
- Breed filtering functionality
- Pagination implementation
- Sort functionality (breed, name, age)
- Match generation system
- All dog fields displayed

### Usability/UX Features

- Intuitive navigation
- Clear visual feedback
- Loading states
- Error messages
- Responsive layout
- Accessible design

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:

   ```bash
   git clone [your-repository-url]
   cd DogSearch
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Technical Stack

- React.js - Frontend framework
- React Router - Navigation and routing
- React Bootstrap - UI components and styling
- Fetch API - Backend communication
- FontAwesome - Icons

## API Integration

The application integrates with the Fetch Frontend Take-Home Service API, providing:

- User authentication
- Dog search and filtering
- Breed information
- Match generation
- Location data

## Project Structure

```
src/
├── components/
│   ├── auth/ - Authentication components
│   ├── content/ - Main content components
│   └── struct/ - Layout and structure components
├── context/ - React context providers
├── services/ - API integration
└── figures/ - Static assets
```

## Features in Detail

### Authentication

- Secure login using name and email
- Session management with HttpOnly cookies
- Protected routes for authenticated content

### Search Functionality

- Breed filtering with search
- Age range selection
- Multiple sort options
- Pagination with next/previous navigation
- Results count display

### Match System

- Select favorite dogs from search results
- Generate a match using the Fetch API
- Display detailed match information

### UI Features

- Responsive design for all screen sizes
- Animated dog cards
- Interactive hover effects
- Secret Dog Mode for enhanced browsing experience
- Clean and intuitive navigation

## License

This project is licensed under the MIT License

## Acknowledgments

- Fetch Frontend Take-Home Service for providing the API
- React Bootstrap for the UI components
- All the shelter dogs waiting for their forever homes
