import React, { useState, useEffect } from 'react';
import { Category, BookingState } from './types';
import { CategorySelector } from './components/CategorySelector';
import { DateTimeSelector } from './components/DateTimeSelector';
import { MessageReview } from './components/MessageReview';
import { StepIndicator } from './components/StepIndicator';
import { Bitcoin, ShieldCheck, ChevronRight, ChevronLeft } from 'lucide-react';

const App: React.FC = () => {
  const [step, setStep] = useState(1);
  const [booking, setBooking] = useState<BookingState>({
    category: null,
    date: null,
    time: null
  });

  const handleCategorySelect = (category: Category) => {
    setBooking(prev => ({ ...prev, category }));
    // Auto advance after short delay for smooth UX
    setTimeout(() => setStep(2), 300);
  };

  const handleDateSelect = (date: Date) => {
    setBooking(prev => ({ ...prev, date, time: null })); // Reset time if date changes
  };

  const handleTimeSelect = (time: string) => {
    setBooking(prev => ({ ...prev, time }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleReset = () => {
    setBooking({ category: null, date: null, time: null });
    setStep(1);
  };

  // Validation to enable Next button
  const isStep1Valid = !!booking.category;
  const isStep2Valid = !!booking.date && !!booking.time;

  return (
    <div className="min-h-screen bg-bitcoin text-black flex flex-col font-sans selection:bg-black selection:text-white">
      
      {/* Header */}
      <header className="border-b-4 border-black/10 bg-white/10 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-white border-2 border-black p-1.5 rounded-lg text-bitcoin shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <Bitcoin size={24} strokeWidth={3} />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white drop-shadow-sm">
              Bit<span className="text-black">Call</span>
            </h1>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-black border-2 border-black bg-white px-3 py-1.5 rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <ShieldCheck size={16} className="text-bitcoin" />
            <span>Official Booking Tool</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-8 sm:py-12">
        
        <StepIndicator currentStep={step} totalSteps={3} />

        <div className="mt-8">
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-black text-white mb-2 drop-shadow-sm">What's the topic?</h2>
                <p className="text-black font-semibold text-lg opacity-80">Select a category to get started.</p>
              </div>
              <CategorySelector selected={booking.category} onSelect={handleCategorySelect} />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-black text-white mb-2 drop-shadow-sm">When are you free?</h2>
                <p className="text-black font-semibold text-lg opacity-80">Choose a convenient date and time slot.</p>
              </div>
              <DateTimeSelector 
                date={booking.date} 
                time={booking.time} 
                onDateSelect={handleDateSelect} 
                onTimeSelect={handleTimeSelect} 
              />
              
              <div className="flex justify-between pt-8">
                <button 
                  onClick={handleBack}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-white hover:text-black transition-colors"
                >
                  <ChevronLeft size={24} strokeWidth={3} /> Back
                </button>
                <button 
                  onClick={handleNext}
                  disabled={!isStep2Valid}
                  className={`flex items-center gap-2 px-8 py-3 rounded-xl font-black border-2 border-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none ${
                    isStep2Valid 
                      ? "bg-white text-black hover:bg-gray-100" 
                      : "bg-gray-400 text-gray-600 border-gray-600 cursor-not-allowed shadow-none"
                  }`}
                >
                  Confirm Slot <ChevronRight size={24} strokeWidth={3} />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-black text-white mb-2 drop-shadow-sm">Review & Send</h2>
                <p className="text-black font-semibold text-lg opacity-80">Your message is ready. Choose a platform to book.</p>
              </div>
              <MessageReview booking={booking} onReset={handleReset} />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 mt-auto">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-black/60 font-semibold text-sm">
            &copy; {new Date().getFullYear()} BitCall. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;