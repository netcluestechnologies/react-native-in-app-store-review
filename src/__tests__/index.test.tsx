import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { requestReview } from '../index';

const mockRequestReview = jest.fn<() => Promise<string>>();

jest.mock('../NativeInAppRating', () => ({
  __esModule: true,
  default: {
    requestReview: () => mockRequestReview(),
  },
}));

describe('react-native-in-app-store-review', () => {
  beforeEach(() => {
    mockRequestReview.mockReset();
  });

  it('exports requestReview function', () => {
    expect(typeof requestReview).toBe('function');
  });

  it('requestReview calls the native module and resolves', async () => {
    mockRequestReview.mockResolvedValue('Review flow launched successfully.');

    const result = await requestReview();

    expect(mockRequestReview).toHaveBeenCalledTimes(1);
    expect(result).toBe('Review flow launched successfully.');
  });

  it('requestReview rejects when native module throws', async () => {
    mockRequestReview.mockRejectedValue(new Error('No current activity'));

    await expect(requestReview()).rejects.toThrow('No current activity');
    expect(mockRequestReview).toHaveBeenCalledTimes(1);
  });

  it('requestReview is called with no arguments', async () => {
    mockRequestReview.mockResolvedValue('Success');

    await requestReview();

    expect(mockRequestReview).toHaveBeenCalledWith();
  });
});
