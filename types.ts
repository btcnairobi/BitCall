import React from 'react';

export enum Category {
  BitcoinEducation = "Bitcoin Education",
  BitcoinAdoption = "Bitcoin Adoption",
  BitcoinInnovation = "Bitcoin Innovation",
  BitcoinCircularEconomy = "Bitcoin Circular Economy",
  Merchants = "Merchants (Pay With Bitcoin)",
  BrandingLogos = "Branding & Logos",
  Entrepreneurship = "Entrepreneurship & Startups",
  AIProductivity = "AI Productivity",
  PersonalMentorship = "Personal Mentorship"
}

export interface BookingState {
  category: Category | null;
  date: Date | null;
  time: string | null;
}

export interface TimeSlot {
  label: string;
  value: string;
}

export interface SocialPlatform {
  name: string;
  icon: React.FC<any>;
  color: string;
  getLink: (message: string) => string;
}