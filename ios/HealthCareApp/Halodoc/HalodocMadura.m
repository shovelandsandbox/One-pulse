//
//  HalodocMadura.m
//  HealthCareApp
//
//  Created by Vivek Kumar Singh on 16/01/20.
//  Copyright © 2020 Facebook. All rights reserved.
//
#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(HalodocMadura, NSObject)

RCT_EXTERN_METHOD(
                  execute: (NSString *)methodType
                  data:(NSDictionary *)data
                  promise: (RCTPromiseResolveBlock)promise
                  type:(NSString *) type
                  )
@end
