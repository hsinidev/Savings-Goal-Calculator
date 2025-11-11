import React from 'react';
import ThemeLayout from './components/ThemeLayout';
import SavingsCalculatorTool from './components/SavingsCalculatorTool';
import SeoArticle from './utils/SeoArticle';

const App: React.FC = () => {
  return (
    <ThemeLayout>
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="space-y-16 md:space-y-24">
          <SavingsCalculatorTool />
          <SeoArticle />
        </div>
      </div>
    </ThemeLayout>
  );
};

export default App;
