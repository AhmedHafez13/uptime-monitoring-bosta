import { UserDocument } from '@app/api/users/user.model';
import { NextFunction, Request, Response } from 'express';

// Define a type for the mock request
export type MockRequest = Request & {
  body: {
    username: string;
    email: string;
    password: string;
  };
};

export const mockRequest: MockRequest = {
  body: {
    username: 'testuser',
    email: 'test@example.com',
    password: 'testpassword',
  },
} as Request;

export const mockResponse: Response = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as any;

export const mockUser: UserDocument = {
  _id: 'user_id',
  comparePassword: jest.fn().mockResolvedValue(true),
} as any;

jest.mock('passport', () => ({
  authenticate: jest.fn(),
}));

export const mockNext: NextFunction = jest.fn() as NextFunction;

// Mock the EmailService module
jest.mock('../../../core/services/email.service', () => ({
  sendVerificationEmail: jest.fn(),
}));
