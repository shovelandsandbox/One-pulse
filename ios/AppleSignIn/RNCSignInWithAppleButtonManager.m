//
//  RNCSignInWithAppleButtonManager.m
//  HealthCareApp
//
//  Created by Vivek Singh on 23/04/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import <React/RCTViewManager.h>
#import <React/RCTUtils.h>
#import "RNCSignInWithAppleButton.h"
@import AuthenticationServices;

@interface RNCSignInWithAppleButtonManager : RCTViewManager
@end

@implementation RNCSignInWithAppleButtonManager

RCT_EXPORT_MODULE(RNCSignInWithAppleButtonManager)

- (UIView *)view
{
  return [[RNCSignInWithAppleButton alloc] initWithAuthorizationButtonType:ASAuthorizationAppleIDButtonTypeDefault authorizationButtonStyle:ASAuthorizationAppleIDButtonStyleBlack];
}

RCT_EXPORT_VIEW_PROPERTY(onPress, RCTBubblingEventBlock)
//RCT_EXPORT_VIEW_PROPERTY(cornerRadius, CGFloat)

@end
