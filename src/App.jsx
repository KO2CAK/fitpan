import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/organisms/Navbar'
import Footer from './components/organisms/Footer'
import FloatingWhatsAppButton from './components/atoms/FloatingWhatsAppButton'

import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import DistributorPage from './pages/DistributorPage'
import InspirationPage from './pages/InspirationPage'
import InspirationDetailPage from './pages/InspirationDetailPage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background-light flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/distributor" element={<DistributorPage />} />
            <Route path="/inspiration" element={<InspirationPage />} />
            <Route path="/inspiration/:id" element={<InspirationDetailPage />} />
          </Routes>
        </main>
        <Footer />
        <FloatingWhatsAppButton />
      </div>
    </BrowserRouter>
  )
}
