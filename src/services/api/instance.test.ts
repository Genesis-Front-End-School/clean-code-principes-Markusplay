import axiosInstance from './instance';

describe('axiosInstance', () => {
  it('should have the correct base URL', () => {
    expect(axiosInstance.defaults.baseURL).toBe('https://api.wisey.app/api/v1');
  });

  it('should have the correct headers', () => {
    const headers = axiosInstance.defaults.headers;
    expect(headers['Content-Type']).toBe('application/json');
    expect(headers.Authorization).toBe(
      `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    );
  });
});
