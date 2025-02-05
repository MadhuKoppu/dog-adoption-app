# Dog Adoption App

A React-based web application that helps users browse and find dogs available for adoption. Users can search through available dogs, filter by breed, sort results, favorite potential matches, and generate compatible matches based on their preferences.

## Features

* User authentication (login/logout functionality)
* Browse available dogs for adoption
* Filter dogs by breed
* Sort dogs alphabetically
* Favorite multiple dogs
* Generate matches based on favorited dogs
* Responsive design for all screen sizes
* Protected routes for authenticated users
* Pagination for search results

## Technologies Used

* React 18
* React Router v6
* React Context for state management
* REST API integration
* Modern JavaScript (ES6+)

## Getting Started

### Prerequisites

* Node.js (v14 or higher)
* npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/dog-adoption-app.git
   ```

2. Navigate to the project directory:
   ```bash
   cd dog-adoption-app
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

The application will open in your default browser at `http://localhost:3000`.

## Project Structure

```
src/
├── api/           # API integration functions
├── components/    # Reusable UI components
├── contexts/      # React Context providers
├── pages/         # Page components
└── App.js         # Main application component
```

## API Integration

The application integrates with a REST API at `https://frontend-take-home-service.fetch.com` and includes the following endpoints:

* Authentication: `/auth/login`, `/auth/logout`
* Dogs: `/dogs/search`, `/dogs/breeds`, `/dogs`, `/dogs/match`

## Deployment

This application is deployed on Vercel and can be accessed at [Dog Adaption App](https://dog-adoption-app-eight.vercel.app).

### Deploying to Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy the application:
   ```bash
   vercel
   ```

For production deployment:
   ```bash
   vercel --prod
   ```

Configure environment variables in the Vercel dashboard if needed.

## Available Scripts

* `npm start`: Runs the app in development mode
* `npm test`: Launches the test runner
* `npm run build`: Builds the app for production
* `npm run eject`: Ejects from Create React App

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
