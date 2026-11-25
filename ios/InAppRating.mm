#import "InAppRating.h"

// Import the Swift-generated header for access to InAppRatingHelper
#if __has_include("InAppRating-Swift.h")
  #import "InAppRating-Swift.h"
#elif __has_include(<InAppRating/InAppRating-Swift.h>)
  #import <InAppRating/InAppRating-Swift.h>
#else
  // When built as part of the app target (non-framework), Xcode may use the
  // product module name. React Native pods typically produce this header.
  #import "react_native_in_app_rating-Swift.h"
#endif

@implementation InAppRating

RCT_EXPORT_MODULE()

- (void)requestReview:(RCTPromiseResolveBlock)resolve
               reject:(RCTPromiseRejectBlock)reject
{
  [InAppRatingHelper requestReviewWithResolve:resolve reject:reject];
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
  return std::make_shared<facebook::react::NativeInAppRatingSpecJSI>(params);
}

+ (NSString *)moduleName
{
  return @"InAppRating";
}

@end
