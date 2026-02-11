// Shared TypeScript type definitions for the resume website

// Page identification enum
export enum PageId {
    About = 'about',
    Experience = 'experience',
    Projects = 'projects',
    Skills = 'skills',
    Contact = 'contact'
}

// Navigation configuration
export interface NavigationConfig {
    currentPage: PageId;
    enableSmoothTransitions: boolean;
}

// Experience entry structure
export interface ExperienceEntry {
    id: string;
    title: string;
    company: string;
    startDate: string;
    endDate: string | 'Present';
    description: string;
    accomplishments: string[];
}

// Project entry structure
export interface ProjectEntry {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    liveUrl?: string;
    repoUrl?: string;
    imageUrl?: string;
}

// Skill category structure
export interface SkillCategory {
    id: string;
    name: string;
    skills: string[];
}

// Contact link structure
export interface ContactLink {
    platform: string;
    url: string;
    icon: string;
    label: string;
}

// Visitor analytics structure
export interface VisitorAnalytics {
    pageViews: Record<PageId, number>;
    lastVisit: string;
    totalVisits: number;
}

// Contact form data structure
export interface ContactFormData {
    name: string;
    email: string;
    message: string;
    timestamp: string;
}

// Storage manager interface
export interface StorageManager {
    save<T>(key: string, data: T): boolean;
    load<T>(key: string): T | null;
    clear(key: string): void;
    isAvailable(): boolean;
}
