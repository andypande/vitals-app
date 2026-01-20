// Type definitions for clientDataUtils.js

export interface Client {
  id: string;
  name: string;
  age: number;
  dateOfBirth: string;
  segment: string;
  aum: number;
  advisor: string;
  joinDate: string;
  stateCode?: string;
  state?: string;
  email?: string;
}

export interface Advisor {
  id: string;
  name: string;
}

export interface ClientData {
  clients: Client[];
  advisors: Advisor[];
}

export function getAllClients(): Client[];
export function getAllAdvisors(): Advisor[];
export function calculateAge(dateOfBirth: string): number;
export function calculateTenure(joinDate: string): number;
export function calculateNextBirthday(dateOfBirth: string): Date;
export function calculateNextAnniversary(joinDate: string): Date;
export function calculateDaysUntil(targetDate: string | Date): number;
export function formatDateForDisplay(date: string | Date): string;
export function generateAgeDemographicsReport(): any;
export function generateClientDistributionByStateReport(): any;
export function generateClientAnniversaryData(): any;
export function generateClientBirthdayReport(): any;
export function generateBookDevelopmentBySegmentReport(): any;
export function generateClientSegmentationDashboard(): any;
export function generateClientInceptionData(): any;
