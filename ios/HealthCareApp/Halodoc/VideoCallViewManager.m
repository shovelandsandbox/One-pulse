//
//  VideoCallViewManager.m
//  HealthCareApp
//
//  Created by Vivek Kumar on 14/02/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "HealthCareApp-Swift.h"

@interface VideoCallViewManager: RCTViewManager
@end

@implementation VideoCallViewManager
RCT_EXPORT_MODULE(VideoCallView)
RCT_EXPORT_VIEW_PROPERTY(viewType, NSString)
- (UIView *) view {
  VideoCallView *view = [[VideoCallView alloc] init];
  return view;
}


@end
