import { Request, Response, NextFunction } from 'express';

// Define a type for the mock request
export type MockRequest = Request & {
  body: {
    username: string;
    email?: string;
    password?: string;
  };
}

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
} as unknown as Response;

export const mockNext: NextFunction = jest.fn() as NextFunction;
