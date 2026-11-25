import StoreKit
import UIKit

@objc public final class InAppRatingHelper: NSObject {

  /// Requests the native App Store review prompt using the modern StoreKit API.
  /// - Parameters:
  ///   - resolve: Promise resolve callback
  ///   - reject: Promise reject callback
  @objc public static func requestReview(
    resolve: @escaping (Any?) -> Void,
    reject: @escaping (String, String, NSError?) -> Void
  ) {
    DispatchQueue.main.async {
      guard let activeScene = UIApplication.shared.connectedScenes
        .first(where: { $0.activationState == .foregroundActive }) as? UIWindowScene
      else {
        reject(
          "E_NO_ACTIVE_SCENE",
          "No active window scene found. Cannot request review.",
          nil
        )
        return
      }

      if #available(iOS 16.0, *) {
        // Modern StoreKit API (non-deprecated)
        AppStore.requestReview(in: activeScene)
      } else if #available(iOS 14.0, *) {
        // Fallback for iOS 14–15
        SKStoreReviewController.requestReview(in: activeScene)
      }

      // Note: A successful call does NOT guarantee the review dialog was shown.
      // Apple controls whether and when the prompt appears.
      resolve("Review request submitted successfully. Note: the actual dialog visibility is controlled by Apple.")
    }
  }
}
