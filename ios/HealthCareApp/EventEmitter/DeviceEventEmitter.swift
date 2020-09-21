//
//  DeviceEventEmitter.swift
//  HealthCareApp
//
//  Created by Vivek Singh on 24/06/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

import Foundation
@objc(DeviceEventEmitter) class DeviceEventEmitter:RCTEventEmitter{
        
    override init() {
        super.init()
        EventEmitter.shared.emitter = self
    }
    
    override func supportedEvents() -> [String]! {
        EventEmitter.shared.emitter = self
       return EventEmitter.shared.allEvents
    }
    
    override static func requiresMainQueueSetup() -> Bool {
       return false
    }
    
}
