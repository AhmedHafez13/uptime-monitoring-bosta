import {
  mockRequest,
  mockResponse,
  mockNext,
  MockRequest,
} from './auth.validation.mocks';
import AuthValidator from '../auth.validations';
import UserModel from '../../users/user.model';

describe('Signup Validator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should pass validation and email check', async () => {
    UserModel.findOne = jest.fn().mockResolvedValue(null);

    await AuthValidator.signup(mockRequest, mockResponse, mockNext);

    expect(mockRequest.body).toEqual(mockRequest.body); // The body should be unchanged
    expect(mockNext).toHaveBeenCalled();
  });

  test('should fail validation due to missing fields', async () => {
    const invalidRequest = {
      body: {
        username: 'testuser',
        // Missing email and password
      },
    } as MockRequest;

    await AuthValidator.signup(invalidRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: expect.any(String),
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  test('should fail validation due to invalid email', async () => {
    const invalidRequest = {
      body: {
        username: 'testuser',
        email: 'invalidemail', // Invalid email format
        password: 'testpassword',
      },
    } as MockRequest;

    await AuthValidator.signup(invalidRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: expect.any(String),
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  test('should fail validation due to email already in use', async () => {
    UserModel.findOne = jest.fn().mockResolvedValue({}); // Email already in use

    await AuthValidator.signup(mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: 'Email is already in use',
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  test('should handle internal errors during validation', async () => {
    const mockError = new Error('Database error');

    // Mock checkIfEmailExists to throw an error
    AuthValidator['checkIfEmailExists'] = jest
      .fn()
      .mockRejectedValue(mockError);

    await AuthValidator.signup(mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: expect.any(String),
    });
    expect(mockNext).not.toHaveBeenCalled();
  });
});
