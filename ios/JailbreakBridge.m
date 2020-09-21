//
//  JailbreakBridge.m
//  HealthCareApp
//
//  Created by VineethMulloly on 24/10/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "JailbreakBridge.h"
#import "HealthCareApp-Swift.h"
@implementation JailbreakBridge

RCT_EXPORT_MODULE(JailbreakBridge)
RCT_EXPORT_METHOD(checkjailBroken:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject){
  
//  BOOL isJailBreak = false;
//
//  NSArray *paths = @[@"/bin/bash",
//                     @"/usr/sbin/sshd",
//                     @"/etc/apt",
//                     @"/private/var/lib/apt/",
//                     @"/Applications/Cydia.app",
//                     ];
//
//  for (NSString *path in paths) {
//    if ([self fileExistsAtPath:path]) {
//    isJailBreak = true;
//    }
//  }
//  resolve([NSNumber numberWithBool:isJailBreak]);
  BOOL isJailBreak = false;
  JailBrokenTest *jailBreakTest = [[JailBrokenTest alloc] init];
   isJailBreak = [jailBreakTest completeTest];
  resolve([NSNumber numberWithBool:isJailBreak]);
  
}


- (BOOL)fileExistsAtPath:(NSString *)path {
  FILE *pFile;
  pFile = fopen([path cStringUsingEncoding:[NSString defaultCStringEncoding]], "r");
  if (pFile == NULL) {
    return NO;
  }
  else
    fclose(pFile);
  return YES;
}
@end
