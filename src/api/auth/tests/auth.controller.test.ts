import jwt from 'jsonwebtoken';
import { mockRequest, mockResponse, mockUser } from './auth.controller.mocks';
import AuthController from '../auth.controller';
import UserModel from '../../users/user.model';
import EmailService from '../../../core/services/email.service';
import { jwtConfig } from '../../../core/config/jwtConfig';
import passport from 'passport';

describe('AuthController', () => {
  describe('signup', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test('should return a successful response on user signup', async () => {
      UserModel.prototype.save = jest.fn();

      // Mock jwt.sign function
      const mockJwtSign = jest.fn(() => 'mockToken');
      jwt.sign = mockJwtSign;

      // Call the function
      await AuthController.signup(mockRequest, mockResponse);

      // Assertions
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'User registered successfully',
        verificationToken: 'mockToken', // Mocked jwt.sign return value
      });
      expect(UserModel.prototype.save).toHaveBeenCalled();
      expect(EmailService.sendVerificationEmail).toHaveBeenCalledWith(
        mockRequest.body.email,
        'mockToken' // Mocked jwt.sign return value
      );
    });

    test('should handle database error during user creation', async () => {
      // Mock save to throw an error
      UserModel.prototype.save = jest
        .fn()
        .mockRejectedValue(new Error('Database error'));

      // Call the function
      await AuthController.signup(mockRequest, mockResponse);

      // Assertions
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: expect.any(String),
      });
      expect(jwt.sign).not.toHaveBeenCalled();
      expect(EmailService.sendVerificationEmail).not.toHaveBeenCalled();
    });

    test('should handle validation error', async () => {
      // Mock save function
      UserModel.prototype.save = jest.fn();

      // Set up mock validation error
      const mockValidationError = { errors: 'any' };
      UserModel.prototype.validateSync = jest
        .fn()
        .mockReturnValue(mockValidationError);

      // Call the function
      await AuthController.signup(mockRequest, mockResponse);

      // Assertions
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        errors: expect.arrayContaining([expect.any(Object)]),
      });
      expect(UserModel.prototype.save).not.toHaveBeenCalled();
      expect(jwt.sign).not.toHaveBeenCalled();
      expect(EmailService.sendVerificationEmail).not.toHaveBeenCalled();
    });
  });

  describe('login', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test('should call passport.authenticate with the correct arguments', async () => {
      // Mock the authenticateCallback function
      const authenticateCallback = jest.fn().mockReturnValue(() => {});
      AuthController.authenticateCallback = authenticateCallback;

      // Call the login function
      await AuthController.login(mockRequest, mockResponse);

      // Expectations
      expect(passport.authenticate).toHaveBeenCalledWith(
        'local',
        { session: false },
        expect.any(Function)
      );
      expect(authenticateCallback).toHaveBeenCalledWith(
        mockRequest,
        mockResponse
      );
    });

    test('should handle errors during login', async () => {
      // Mock the authenticateCallback function to throw an error
      AuthController.authenticateCallback = jest.fn().mockImplementation(() => {
        throw new Error('An error occurred');
      });

      // Call the login function
      await AuthController.login(mockRequest, mockResponse);

      // Expectations
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'An error occurred during login',
      });
    });

    test('should return user and token', async () => {
      // Mock jwt.sign() function
      const mockSign = jest
        .spyOn(jwt, 'sign')
        .mockImplementation(() => 'mock_token');

      // Call the function
      await AuthController.handleAuthentication(
        mockUser,
        'password',
        mockResponse
      );

      // Assertions
      expect(mockUser.comparePassword).toHaveBeenCalledWith('password');
      expect(mockResponse.status).not.toHaveBeenCalled(); // Ensure status() is not called
      expect(mockResponse.json).toHaveBeenCalledWith({
        user: mockUser,
        token: 'mock_token',
      });
      expect(mockSign).toHaveBeenCalledWith(
        { sub: mockUser._id },
        jwtConfig.secretKey,
        { expiresIn: jwtConfig.authTokenExpiration }
      );

      // Restore the mock
      mockSign.mockRestore();
    });

    test('should return 401 if password is invalid', async () => {
      // Mock user.comparePassword() to return false
      mockUser.comparePassword = jest.fn().mockResolvedValue(false);

      // Call the function
      await AuthController.handleAuthentication(
        mockUser,
        'password',
        mockResponse
      );

      // Assertions
      expect(mockUser.comparePassword).toHaveBeenCalledWith('password');
      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Invalid email or password',
      });
    });

    test('should return 500 if an error occurs', async () => {
      // Mock user.comparePassword() to throw an error
      mockUser.comparePassword = jest
        .fn()
        .mockRejectedValue(new Error('Some error'));

      // Call the function
      await AuthController.handleAuthentication(
        mockUser,
        'password',
        mockResponse
      );

      // Assertions
      expect(mockUser.comparePassword).toHaveBeenCalledWith('password');
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'An error occurred during login',
      });
    });
  });
});
