//
//  DeviceEventEmitter.m
//  HealthCareApp
//
//  Created by Vivek Kumar Singh on 20/01/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"
#import "React/RCTEventEmitter.h"
@interface RCT_EXTERN_MODULE(DeviceEventEmitter, RCTEventEmitter)
RCT_EXTERN_METHOD(supportedEvents)
@end

