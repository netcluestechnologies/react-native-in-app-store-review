package com.inapprating

import com.facebook.react.bridge.ReactApplicationContext

class InAppRatingModule(reactContext: ReactApplicationContext) :
  NativeInAppRatingSpec(reactContext) {

  override fun multiply(a: Double, b: Double): Double {
    return a * b
  }

  companion object {
    const val NAME = NativeInAppRatingSpec.NAME
  }
}
