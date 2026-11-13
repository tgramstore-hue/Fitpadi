import './globals.css';
import { AppProvider } from '../context/AppContext.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import CookieBanner from '../components/CookieBanner.jsx';
import Toast from '../components/Toast.jsx';
import ExerciseModal from '../components/ExerciseModal.jsx';

export const metadata = {
  title: 'FitPadi - Move Better. Live Healthier.',
  description: 'FitPadi is a free health, fitness and wellness web app with daily missions, programmes, health education and community challenges.',
  icons: {
    icon: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 64 64%22%3E%3Crect width=%2264%22 height=%2264%22 rx=%2216%22 fill=%22%2316A34A%22/%3E%3Cpath d=%22M18 46C16 28 28 14 48 12C50 32 38 46 18 46Z%22 fill=%22%23fff%22/%3E%3Cpath d=%22M20 44L40 24%22 stroke=%22%2316A34A%22 stroke-width=%223%22 stroke-linecap=%22round%22/%3E%3C/svg%3E'
  }
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <AppProvider>
          <Header />
          <main id="app">
            {children}
          </main>
          <Footer />
          <CookieBanner />
          <Toast />
          <ExerciseModal />
        </AppProvider>
      </body>
    </html>
  );
}

