package com.inapprating

import android.app.Activity
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.google.android.play.core.review.ReviewManagerFactory

class InAppRatingModule(reactContext: ReactApplicationContext) :
  NativeInAppRatingSpec(reactContext) {

  override fun requestReview(promise: Promise) {
    val activity: Activity? = currentActivity
    if (activity == null) {
      promise.reject(
        E_ACTIVITY_NOT_FOUND,
        "No current activity. Cannot launch the review flow."
      )
      return
    }

    val reviewManager = ReviewManagerFactory.create(activity)
    val requestFlow = reviewManager.requestReviewFlow()

    requestFlow.addOnCompleteListener { task ->
      if (!task.isSuccessful) {
        val exception = task.exception
        promise.reject(
          E_REQUEST_REVIEW_FLOW_FAILED,
          "Failed to request the review flow: ${exception?.message ?: "Unknown error"}",
          exception
        )
        return@addOnCompleteListener
      }

      val reviewInfo = task.result
      val launchFlow = reviewManager.launchReviewFlow(activity, reviewInfo)

      launchFlow.addOnCompleteListener { launchTask ->
        if (launchTask.isSuccessful) {
          // Note: A successful result does NOT guarantee the review dialog was shown.
          // Google Play controls whether the dialog appears.
          promise.resolve(
            "Review flow launched successfully. Note: the actual dialog visibility is controlled by Google Play."
          )
        } else {
          val launchException = launchTask.exception
          promise.reject(
            E_LAUNCH_REVIEW_FLOW_FAILED,
            "Failed to launch the review flow: ${launchException?.message ?: "Unknown error"}",
            launchException
          )
        }
      }
    }
  }

  companion object {
    const val NAME = NativeInAppRatingSpec.NAME
    private const val E_ACTIVITY_NOT_FOUND = "E_ACTIVITY_NOT_FOUND"
    private const val E_REQUEST_REVIEW_FLOW_FAILED = "E_REQUEST_REVIEW_FLOW_FAILED"
    private const val E_LAUNCH_REVIEW_FLOW_FAILED = "E_LAUNCH_REVIEW_FLOW_FAILED"
  }
}
