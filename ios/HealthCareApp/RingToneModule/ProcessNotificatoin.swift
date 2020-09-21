//
//  ProcessNotificatoin.swift
//  HealthCareApp
//
//  Created by Vivek Singh on 29/04/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

import Foundation
@objc(ProcessNotification) class ProcessNotification:NSObject {
  
  public static let shared = ProcessNotification()
  
  @objc func remoteNotification(_ info:NSDictionary) {
    print("Notification Received In Swift = \(info)")
    if let data = info.value(forKey: "data") as? [String:Any],let platform = data["platform"] as? String,let action = data["action"] as? String{
      if(platform == "twilio" && action == "startRingtone"){
        RingToneModule.shared.playRingTone()
      }
    }else if let platform = info["platform"] as? String,let action = info["action"] as? String{
      if(platform == "twilio" && action == "startRingtone"){
        RingToneModule.shared.playRingTone()
      }
    }
  }
  
  
}
