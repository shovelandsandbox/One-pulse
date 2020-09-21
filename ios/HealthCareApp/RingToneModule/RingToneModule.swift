//
//  RingToneModule.swift
//  HealthCareApp
//
//  Created by Vivek Singh on 26/04/20.
//  Copyright © 2020 Vivek Singh. All rights reserved.
//

import Foundation

@objc(RingToneModule) class RingToneModule:NSObject{
  
  public static let shared = RingToneModule()
  
  @objc func playRingTone()->Void {
    let url = URL(fileURLWithPath: "/Library/Ringtones/Opening.m4r")
    RingtonePlayer.shared.playSound(url)
  }
  
  @objc func stopRingTone()->Void {
    RingtonePlayer.shared.stopSound()
  }
  
  @objc(isRingtonePlaying:rejecter:)
  func isRingtonePlaying(_ resolve: RCTPromiseResolveBlock, rejecter reject:RCTPromiseRejectBlock) -> Void {
    resolve(RingtonePlayer.shared.isPlaying)
  }
}
