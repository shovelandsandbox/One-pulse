//
//  HalodocMadura.swift
//  HealthCareApp
//
//  Created by Vivek Kumar Singh on 16/01/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

import Foundation
import madura
import PromiseKit
import UtilityKit
@objc(HalodocMadura) class HalodocMadura:NSObject {
  
  var promise : RCTPromiseRejectBlock?
  @objc func execute(_ methodType:String,data:NSDictionary,promise:@escaping RCTPromiseResolveBlock,type:String) {
    //    self.promise = promise
    DispatchQueue.main.async {
      switch(methodType){
      case Constants.INIT_MADURA:
        MaduraRN.shared.initMadura(data,promise)
      case Constants.SETUP_CALL_SERVICE:
        MaduraRN.shared.setupMaduraCallService(promise, data)
      case Constants.SETUP_CALL_DETAILS:
        MaduraRN.shared.setupCallRequest(data,promise)
      case Constants.JOIN_CALL:
        MaduraRN.shared.joinCall(data,promise)
      case Constants.LEAVE_CALL:
        MaduraRN.shared.leaveCall(promise)
      case Constants.TOGGLE_SPEAKER:
        MaduraRN.shared.toggleSpeaker(promise)
      case Constants.SWITCH_CAMERA:
        MaduraRN.shared.switchCamera(promise)
      case Constants.TOGGLE_MIC:
        MaduraRN.shared.toggleMic(promise)
      case Constants.DESTROY_MADURA:
        MaduraRN.shared.destroyMaduraSetup(promise)
      default:
        promise([Constants.METHOD_TYPE_ERROR, Constants.METHOD_TYPE_ERROR_MESSAGE])
      }
    }
  }
}

