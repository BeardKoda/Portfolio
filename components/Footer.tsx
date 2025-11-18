export default function Footer() {
  return (
    <footer className="bg-charcoal border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-heading font-bold text-blue-accent mb-4">
              Beardkoda
            </h3>
            <p className="text-white/70 font-body text-sm">
              Engineering clean systems with precision.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 font-body text-sm text-white/70">
              <li>
                <a href="#about" className="hover:text-blue-accent transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-blue-accent transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-blue-accent transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 font-body text-sm text-white/70">
              <li>
                <a href="https://github.com" className="hover:text-blue-accent transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" className="hover:text-blue-accent transition-colors">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="mailto:contact@beardkoda.com" className="hover:text-blue-accent transition-colors">
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-white/50 font-body text-sm">
          <p>&copy; {new Date().getFullYear()} Beardkoda. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

