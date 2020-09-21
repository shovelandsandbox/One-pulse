//
//  RingToneModule.m
//  HealthCareApp
//
//  Created by Vivek Singh on 26/04/20.
//  Copyright © 2020 Vivek Singh. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(RingToneModule,NSObject)
RCT_EXTERN_METHOD(playRingTone)
RCT_EXTERN_METHOD(stopRingTone)
RCT_EXTERN_METHOD(isRingtonePlaying:
                  (RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  )
@end
