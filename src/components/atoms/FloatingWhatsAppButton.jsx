import { Mail, MessageCircle } from 'lucide-react'

// Floating WhatsApp Button Component - Atom
export default function FloatingWhatsAppButton() {
  const whatsappPhone = import.meta.env.VITE_WHATSAPP_PHONE || '628983487706'
  const whatsappUrl = `https://wa.me/${whatsappPhone.replace(/\D/g, '')}?text=Halo%20Fitpan!%20Saya%20ingin%20pesan%20produk%20Anda.`

  return (
    <>
      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fab bg-green-500 hover:bg-green-600"
        title="Chat via WhatsApp"
      >
        <MessageCircle size={24} />
      </a>

      {/* Email Button (Optional) */}
      <a
        href="mailto:hello@fitpan.id"
        className="fixed bottom-24 right-6 w-14 h-14 rounded-full bg-accent-500 text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
        title="Email Fitpan"
      >
        <Mail size={24} />
      </a>
    </>
  )
}
