import InAppRating from './NativeInAppRating';

/**
 * Requests the native in-app review/rating prompt.
 *
 * On **Android**, this uses the Google Play In-App Review API.
 * On **iOS**, this uses Apple's StoreKit (`AppStore.requestReview(in:)` on iOS 16+, with fallback on earlier versions).
 *
 * **Important:** A successful promise resolution does **not** guarantee that
 * the review dialog was shown to the user. Both Google Play and Apple control
 * whether and when the dialog actually appears.
 *
 * @returns A promise that resolves with a status message string on success.
 * @throws An error if the review flow could not be initiated.
 *
 * @example
 * ```ts
 * import { requestReview } from 'react-native-in-app-store-review';
 *
 * const handleRating = async () => {
 *   try {
 *     const result = await requestReview();
 *     console.log('Review request completed:', result);
 *   } catch (error) {
 *     console.error('Review request failed:', error);
 *   }
 * };
 * ```
 */
export function requestReview(): Promise<string> {
  return InAppRating.requestReview();
}
