//
//  RingtonePlayer.swift
//  HealthCareApp
//
//  Created by Vivek Singh on 26/04/20.
//  Copyright © 2020 Vivek Singh. All rights reserved.
//

import Foundation
import AVFoundation

class RingtonePlayer:NSObject,AVAudioPlayerDelegate{
  public static let shared = RingtonePlayer()
  var audioPlayer: AVAudioPlayer = AVAudioPlayer()
  var isPlaying = false
  
  func playSound(_ fileURL:URL){
      audioPlayer.stop()
    do {
      try AVAudioSession.sharedInstance().setCategory(AVAudioSessionCategoryPlayback, with: .mixWithOthers)
      try AVAudioSession.sharedInstance().setActive(true)
      audioPlayer = try AVAudioPlayer(contentsOf: fileURL)
      audioPlayer.delegate = self
      audioPlayer.numberOfLoops = 4
      audioPlayer.play()
      
      isPlaying = true
    } catch {
      debugPrint("\(error)")
      isPlaying = false
    }
  }
  
  func stopSound(){
    audioPlayer.stop()
    isPlaying = false
  }
  
  func audioPlayerDecodeErrorDidOccur(_ player: AVAudioPlayer, error: Error?) {
    
  }
  
  func audioPlayerDidFinishPlaying(_ player: AVAudioPlayer, successfully flag: Bool) {
    print("Ringtone played successfully")
  }
  
  
  
  
}
