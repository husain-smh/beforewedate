import { randomBytes } from 'crypto';

export function generateToken(): string {
  return randomBytes(16).toString('hex');
}

export function validateName(name: string): { valid: boolean; error?: string } {
  if (!name || name.trim().length === 0) {
    return { valid: false, error: 'Name is required' };
  }
  if (name.length > 40) {
    return { valid: false, error: 'Name must be 40 characters or less' };
  }
  return { valid: true };
}

export function validatePerspective(perspective: string): { valid: boolean; error?: string } {
  if (!perspective || perspective.trim().length === 0) {
    return { valid: false, error: 'Answer is required' };
  }
  if (perspective.length > 5000) {
    return { valid: false, error: 'Answer must be 5000 characters or less' };
  }
  return { valid: true };
}

export function getShareUrl(token: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  return `${baseUrl}/s/${token}`;
}

