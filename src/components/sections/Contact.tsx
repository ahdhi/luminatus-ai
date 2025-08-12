// src/components/sections/Contact.tsx
export default function Contact() {
  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 xl:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">Get In Touch</h2>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-base sm:text-lg text-gray-400 mb-8">
            Ready to transform your business with AI? Let&apos;s discuss how Luminatus can help you achieve your goals.
          </p>
          <div className="space-y-4">
            <a 
              href="mailto:hello@luminatus.ai" 
              className="inline-block px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-lg hover:scale-105 transition-transform duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}