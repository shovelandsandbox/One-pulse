//
//  EventEmitter.swift
//  HealthCareApp
//
//  Created by Vivek Singh on 24/06/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

import Foundation
class EventEmitter{
  public static let shared = EventEmitter()
  var emitter : DeviceEventEmitter!
  lazy var allEvents: [String] = {
    var allEventNames: [String] = []
    allEventNames.append("binahMetricsUpdate")
    allEventNames.append("binahStartProcessing")
    allEventNames.append("binahStopProcessing")
    return allEventNames
  }()
  
  private init() {}
  func send(_ name:String,_ props:Any?) {
    if(emitter != nil){
      emitter.sendEvent(withName: name, body: props)
    }else{
      print("Event emitter is nill")
    }
  }
}
