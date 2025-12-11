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
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center p-4 backdrop-blur-sm animate-fade-in">
      <div className="bg-gray-900 border border-gray-700 rounded-xl shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col">
        <div className="bg-gray-800 p-5 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white tracking-wide">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl transition-colors focus:outline-none">&times;</button>
        </div>
        <div className="p-8 text-gray-300 overflow-y-auto leading-relaxed text-justify">
          {children}
        </div>
        <div className="bg-gray-800 p-4 border-t border-gray-700 text-right">
             <button onClick={onClose} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">Close</button>
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
        return { 
            title: 'About Us', 
            content: (
                <div className="space-y-4">
                    <p className="text-lg">Welcome to the <strong>Savings Goal Calculator</strong>, a premier financial planning tool designed to empower individuals on their journey to financial independence. Developed by <strong>HSINI MOHAMED</strong>, this application represents a fusion of modern web technology and rigorous financial mathematics.</p>
                    <p>Our mission is simple yet profound: to democratize access to high-quality financial forecasting tools. In an era where economic landscapes are constantly shifting, having a clear vision of your financial future is not just a luxury—it's a necessity. We believe that everyone, regardless of their financial background, deserves the ability to plan effectively for their dreams, whether that's buying a home, securing a comfortable retirement, or building a robust emergency fund.</p>
                    <p>This calculator allows users to visualize the impact of compound interest, regular contributions, and time. By processing all data client-side, we ensure an experience that is not only instant and responsive but also prioritizes user privacy above all else.</p>
                    <p>Thank you for trusting us with your planning needs. We are committed to continuous improvement and providing you with the best user experience possible.</p>
                </div>
            )
        };
      case 'contact':
        return { 
            title: 'Contact Us', 
            content: (
                <div className="space-y-6">
                    <p className="text-lg">We value your feedback, questions, and suggestions. Our team is dedicated to providing you with support and ensuring that your experience with our Savings Goal Calculator is seamless.</p>
                    
                    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                        <h3 className="text-xl font-bold text-white mb-4">Get in Touch</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <span className="text-indigo-400 font-bold w-24">Email:</span>
                                <a href="mailto:hsini.web@gmail.com" className="text-white hover:text-indigo-400 transition-colors">hsini.web@gmail.com</a>
                            </li>
                            <li className="flex items-start">
                                <span className="text-indigo-400 font-bold w-24">Website:</span>
                                <a href="https://doodax.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-indigo-400 transition-colors">doodax.com</a>
                            </li>
                             <li className="flex items-start">
                                <span className="text-indigo-400 font-bold w-24">Developer:</span>
                                <a href="https://github.com/hsinidev" target="_blank" rel="noopener noreferrer" className="text-white hover:text-indigo-400 transition-colors">HSINI MOHAMED</a>
                            </li>
                        </ul>
                    </div>
                    
                    <p>For technical support, partnership inquiries, or media requests, please use the email address provided above. We strive to respond to all inquiries within 24-48 hours.</p>
                </div>
            )
        };
      case 'guide':
        return { 
            title: 'User Guide', 
            content: (
                <div className="space-y-4">
                    <p className="mb-4">Mastering the Savings Goal Calculator is the first step towards mastering your finances. Follow this comprehensive guide to get the most accurate projections.</p>
                    
                    <div className="space-y-6">
                        <div className="bg-gray-800 p-4 rounded-lg">
                            <h3 className="font-bold text-lg text-white mb-2">1. Goal Amount</h3>
                            <p>Enter the total sum you aim to accumulate. This could be the price of a house, a car, or your retirement target number. Be realistic but ambitious.</p>
                        </div>
                        
                        <div className="bg-gray-800 p-4 rounded-lg">
                            <h3 className="font-bold text-lg text-white mb-2">2. Initial Savings</h3>
                            <p>Input the amount of money you currently have saved towards this goal. If you are starting from zero, simply enter "0". This forms the principal for compound interest calculations.</p>
                        </div>
                        
                        <div className="bg-gray-800 p-4 rounded-lg">
                            <h3 className="font-bold text-lg text-white mb-2">3. Monthly Contribution</h3>
                            <p>This is the amount you plan to add to your savings every single month. Consistency is key here. Even small increases in this number can drastically reduce your timeline.</p>
                        </div>
                        
                        <div className="bg-gray-800 p-4 rounded-lg">
                            <h3 className="font-bold text-lg text-white mb-2">4. Annual Interest Rate (%)</h3>
                            <p>Enter your expected annual return on investment. For a standard savings account, this might be 0.5% - 5%. For stock market investments, historical averages often range from 7% to 10%, though this involves risk.</p>
                        </div>
                        
                        <div className="bg-gray-800 p-4 rounded-lg border border-indigo-500/30">
                            <h3 className="font-bold text-lg text-indigo-400 mb-2">Interpreting Results</h3>
                            <p>Once you click "Calculate", the tool will provide a breakdown of years and months required. It also generates a year-by-year table showing how your money grows, separating your contributions from the interest earned.</p>
                        </div>
                    </div>
                </div>
            )
        };
      case 'privacy':
        return { 
            title: 'Privacy Policy', 
            content: (
                <div className="space-y-4">
                    <p className="text-sm text-gray-400">Last Updated: October 26, 2023</p>
                    
                    <h3 className="text-xl font-bold text-white mt-4">1. Introduction</h3>
                    <p>At <strong>Savings Goal Calculator</strong> (accessible via doodax.com), your privacy is our top priority. This Privacy Policy outlines the types of information we do not collect and how we safeguard your digital experience.</p>
                    
                    <h3 className="text-xl font-bold text-white mt-4">2. Data Collection and Usage</h3>
                    <p>We are proud to operate a <strong>Client-Side Application</strong>. This means that all calculations, data entries (such as savings goals, amounts, and interest rates), and processing occur locally on your device's browser.</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>We <strong>do not</strong> transmit your financial data to any external server.</li>
                        <li>We <strong>do not</strong> store your personal information in any database.</li>
                        <li>We <strong>do not</strong> use cookies to track your personal financial inputs.</li>
                    </ul>
                    
                    <h3 className="text-xl font-bold text-white mt-4">3. Third-Party Links</h3>
                    <p>Our website may contain links to other websites (e.g., GitHub, Social Media). If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.</p>
                    
                    <h3 className="text-xl font-bold text-white mt-4">4. Changes to This Privacy Policy</h3>
                    <p>We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
                    
                    <h3 className="text-xl font-bold text-white mt-4">5. Contact Us</h3>
                    <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:hsini.web@gmail.com" className="text-indigo-400">hsini.web@gmail.com</a>.</p>
                </div>
            )
        };
      case 'tos':
        return { 
            title: 'Terms of Service', 
            content: (
                <div className="space-y-4">
                     <p className="text-sm text-gray-400">Last Updated: October 26, 2023</p>
                     
                    <h3 className="text-xl font-bold text-white mt-4">1. Acceptance of Terms</h3>
                    <p>By accessing and using the Savings Goal Calculator website (doodax.com), you accept and agree to be bound by the terms and provision of this agreement.</p>
                    
                    <h3 className="text-xl font-bold text-white mt-4">2. Disclaimer of Financial Advice</h3>
                    <p className="uppercase font-bold text-red-400">IMPORTANT:</p>
                    <p>The content and tools provided on this website are for informational and educational purposes only. They do not constitute professional financial advice, investment advice, or a recommendation to buy or sell any financial instrument.</p>
                    <p>Calculations are estimates based on the information you provide and hypothetical interest rates. Actual results may vary. You should consult with a qualified financial advisor or other professional before making any financial decisions.</p>
                    
                    <h3 className="text-xl font-bold text-white mt-4">3. Use of License</h3>
                    <p>Permission is granted to temporarily download one copy of the materials (information or software) on Savings Goal Calculator's website for personal, non-commercial transitory viewing only.</p>
                    
                    <h3 className="text-xl font-bold text-white mt-4">4. Limitations</h3>
                    <p>In no event shall Savings Goal Calculator or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.</p>
                    
                    <h3 className="text-xl font-bold text-white mt-4">5. Governing Law</h3>
                    <p>These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which the site operator resides and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>
                </div>
            )
        };
      case 'dmca':
        return { 
            title: 'DMCA Policy', 
            content: (
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white mt-4">Digital Millennium Copyright Act Notice</h3>
                    <p>We respect the intellectual property rights of others. It is our policy to respond to any claim that Content posted on the Service infringes on the copyright or other intellectual property rights of any person or entity.</p>
                    
                    <p>If you are a copyright owner, or authorized on behalf of one, and you believe that the copyrighted work has been copied in a way that constitutes copyright infringement, please submit your claim via email to <a href="mailto:hsini.web@gmail.com" className="text-indigo-400">hsini.web@gmail.com</a>, with the subject line: "Copyright Infringement" and include in your claim a detailed description of the alleged infringement.</p>
                    
                    <h3 className="text-xl font-bold text-white mt-4">Counter-Notice</h3>
                    <p>If you believe your content was removed by mistake, you may send a counter-notice to our designated agent at the email address listed above. Your counter-notice must include your contact information, a description of the content that was removed, and a statement under penalty of perjury that you have a good faith belief the material was removed by mistake.</p>
                </div>
            )
        };
      default:
        return { title: '', content: null };
    }
  };
  
  const modalData = getModalContent(activeModal);
  const navLinks = ['About', 'Contact', 'Guide', 'Privacy Policy', 'Terms of Service', 'DMCA'];
  const linkKeys: ModalType[] = ['about', 'contact', 'guide', 'privacy', 'tos', 'dmca'];

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-100">
      <header className="bg-gray-900 bg-opacity-70 backdrop-blur-md sticky top-0 z-40 border-b border-gray-800 shadow-lg">
        <nav className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
             <div className="bg-indigo-600 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
             </div>
             <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 tracking-wider">Savings Goal Calculator</h1>
          </div>
          <div className="flex flex-wrap justify-center gap-2 md:gap-6">
            {navLinks.map((link, index) => (
               <button 
                  key={link} 
                  onClick={() => setActiveModal(linkKeys[index])} 
                  className="text-sm font-medium text-gray-300 hover:text-white transition-all hover:scale-105 px-2 py-1 rounded hover:bg-white/5"
                >
                 {link}
               </button>
            ))}
          </div>
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 relative z-10">
        {children}
      </main>

      <footer className="bg-gray-900 bg-opacity-80 backdrop-blur-md py-8 border-t border-gray-800 mt-12 relative z-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left text-gray-400 text-sm">
             <p className="mb-2 font-semibold text-gray-300">Quick Links</p>
             <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <a href="mailto:hsini.web@gmail.com" className="hover:text-indigo-400 transition-colors">hsini.web@gmail.com</a>
                <span>|</span>
                <a href="https://doodax.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">doodax.com</a>
             </div>
          </div>
          
          <div className="text-center md:text-right">
             <p className="text-gray-400 text-sm mb-1">
               &copy; {new Date().getFullYear()} Savings Goal Calculator. All rights reserved.
             </p>
             <p className="text-sm text-gray-400">
                Powered by <a href="https://github.com/hsinidev" target="_blank" rel="noopener noreferrer" className="font-bold hover:underline transition-all" style={{color: '#FFD700'}}>HSINI MOHAMED</a>
             </p>
          </div>
        </div>
      </footer>

      <Modal isOpen={!!activeModal} onClose={() => setActiveModal(null)} title={modalData.title}>
        {modalData.content}
      </Modal>
    </div>
  );
};

export default ThemeLayout;