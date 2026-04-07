import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const BusPage = lazy(() => import('./pages/BusPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));

const RouteFallback = () => (
  <div className='w-full lg:px-28 md:px-16 sm:px-7 px-4 py-10'>
    <div className='w-full h-40 rounded-lg bg-neutral-100 dark:bg-neutral-900 animate-pulse' />
  </div>
);

function App() {

  return (
    <>
      <Router>
        <div className='w-full min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-800 dark:text-neutral-300 flex flex-col'>
          {/* Navbar */}
          <Navbar />

          {/* Home Content */}
          <main className='pt-[8ch] flex-1'>
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/about' element={<AboutPage />} />
                <Route path='/bus' element={<BusPage />} />
                <Route path='/services' element={<ServicesPage />} />
              </Routes>
            </Suspense>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </Router>
    </>
  )
}

export default App
