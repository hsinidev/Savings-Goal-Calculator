
import React, { useState, ReactNode } from 'react';

// Modal component defined within ThemeLayout to keep it self-contained
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-gray-900 p-4 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">&times;</button>
        </div>
        <div className="p-6 text-gray-300">
          {children}
        </div>
      </div>
    </div>
  );
};

// Main ThemeLayout component
interface ThemeLayoutProps {
  children: ReactNode;
}

type ModalType = 'about' | 'contact' | 'guide' | 'privacy' | 'tos' | 'dmca' | null;

const ThemeLayout: React.FC<ThemeLayoutProps> = ({ children }) => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const getModalContent = (modal: ModalType) => {
    switch (modal) {
      case 'about':
        return { title: 'About Us', content: <p>This Savings Goal Calculator helps you visualize your financial future. By providing your goal, current savings, monthly contributions, and estimated interest rate, we project the timeline to achieve your dreams. Our mission is to provide accessible and powerful financial tools.</p> };
      case 'contact':
        return { title: 'Contact Us', content: <p>For inquiries, please reach out to us at <a href="mailto:hsini.web@gmail.com" className="text-blue-400 hover:underline">hsini.web@gmail.com</a> or visit our website at <a href="https://doodax.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">doodax.com</a>.</p> };
      case 'guide':
        return { title: 'User Guide', content: <div><h3 className="font-bold text-lg mb-2">How to Use the Calculator:</h3><ol className="list-decimal list-inside space-y-2"><li><strong>Goal Amount:</strong> Enter the total amount you want to save.</li><li><strong>Initial Savings:</strong> Enter the amount you already have saved.</li><li><strong>Monthly Contribution:</strong> Enter how much you plan to save each month.</li><li><strong>Annual Interest Rate (%):</strong> Enter your estimated annual return on investment.</li><li>Click <strong>Calculate</strong> to see how long it will take to reach your goal, along with a detailed projection.</li></ol></div> };
      case 'privacy':
        return { title: 'Privacy Policy', content: <p>We respect your privacy. This application is a client-side tool, meaning all calculations are performed on your device. We do not collect, store, or transmit any of your financial data. Your information never leaves your browser.</p> };
      case 'tos':
        return { title: 'Terms of Service', content: <p>This tool is provided for informational purposes only and does not constitute financial advice. The projections are based on the data you provide and do not guarantee future results. Please consult with a qualified financial advisor for personalized advice.</p> };
      case 'dmca':
        return { title: 'DMCA Policy', content: <p>All content on this website is original. If you believe any content infringes upon your copyright, please contact us at hsini.web@gmail.com with a valid DMCA notice, and we will address the issue promptly.</p> };
      default:
        return { title: '', content: null };
    }
  };
  
  const modalData = getModalContent(activeModal);
  const navLinks = ['About', 'Contact', 'Guide', 'Privacy Policy', 'Terms of Service', 'DMCA'];
  const linkKeys: ModalType[] = ['about', 'contact', 'guide', 'privacy', 'tos', 'dmca'];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-black bg-opacity-30 backdrop-blur-sm sticky top-0 z-40">
        <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white tracking-wider">Savings Goal Calculator</h1>
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link, index) => (
               <button key={link} onClick={() => setActiveModal(linkKeys[index])} className="text-gray-300 hover:text-white transition-colors">
                 {link}
               </button>
            ))}
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-black bg-opacity-50 py-6">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p className="mb-2">
            <a href="mailto:hsini.web@gmail.com">hsini.web@gmail.com</a> | <a href="https://doodax.com" target="_blank" rel="noopener noreferrer">doodax.com</a>
          </p>
          <p>
            Powered by <a href="https://github.com/hsinidev" target="_blank" rel="noopener noreferrer" className="font-bold" style={{color: '#FFD700'}}>HSINI MOHAMED</a>
          </p>
        </div>
      </footer>

      <Modal isOpen={!!activeModal} onClose={() => setActiveModal(null)} title={modalData.title}>
        {modalData.content}
      </Modal>
    </div>
  );
};

export default ThemeLayout;
