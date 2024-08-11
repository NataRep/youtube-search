import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;
  let localStorageMock: {
    getItem: jest.Mock<string | null, [string]>;
    setItem: jest.Mock<void, [string, string]>;
    removeItem: jest.Mock<void, [string]>;
    clear: jest.Mock<void, []>;
  };

  beforeEach(() => {
    // Создаем частичный мок для localStorage
    localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    };

    // Подменяем глобальный localStorage на наш мок
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });

    service = new LocalStorageService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getToken', () => {
    it('should return token from localStorage', () => {
      const token = 'mock-token';
      localStorageMock.getItem.mockReturnValue(token);

      const result = service.getToken();

      expect(result).toBe(token);
      expect(localStorageMock.getItem).toHaveBeenCalledWith(
        'youtube-app-token'
      );
    });

    it('should return null if token is not present', () => {
      localStorageMock.getItem.mockReturnValue(null);

      const result = service.getToken();

      expect(result).toBeNull();
    });
  });

  describe('setToken', () => {
    it('should set token in localStorage', () => {
      const token = 'new-token';

      service.setToken(token);

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'youtube-app-token',
        token
      );
    });
  });

  describe('getUsername', () => {
    it('should return username from localStorage', () => {
      const username = 'mock-username';
      localStorageMock.getItem.mockReturnValue(username);

      const result = service.getUsername();

      expect(result).toBe(username);
      expect(localStorageMock.getItem).toHaveBeenCalledWith(
        'youtube-app-username'
      );
    });

    it('should return null if username is not present', () => {
      localStorageMock.getItem.mockReturnValue(null);

      const result = service.getUsername();

      expect(result).toBeNull();
    });
  });

  describe('setUsername', () => {
    it('should set username in localStorage', () => {
      const username = 'new-username';

      service.setUsername(username);

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'youtube-app-username',
        username
      );
    });
  });

  describe('removeToken', () => {
    it('should remove token from localStorage', () => {
      service.removeToken();

      expect(localStorageMock.removeItem).toHaveBeenCalledWith(
        'youtube-app-token'
      );
    });
  });

  describe('removeUsername', () => {
    it('should remove username from localStorage', () => {
      service.removeUsername();

      expect(localStorageMock.removeItem).toHaveBeenCalledWith(
        'youtube-app-username'
      );
    });
  });

  describe('updateUserStatus', () => {
    it('should update user status with current date', () => {
      const now = new Date().toISOString();
      const dateSpy = jest
        .spyOn(Date.prototype, 'toISOString')
        .mockReturnValue(now);

      service.updateUserStatus();

      expect(localStorageMock.setItem).toHaveBeenCalledWith('auth-update', now);

      dateSpy.mockRestore();
    });
  });
});
