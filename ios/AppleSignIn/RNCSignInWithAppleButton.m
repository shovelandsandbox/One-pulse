//
//  RNCSignInWithAppleButton.m
//  HealthCareApp
//
//  Created by Vivek Singh on 23/04/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import "RNCSignInWithAppleButton.h"

@implementation RNCSignInWithAppleButton

-(instancetype)initWithAuthorizationButtonType:(ASAuthorizationAppleIDButtonType)type authorizationButtonStyle:(ASAuthorizationAppleIDButtonStyle)style  API_AVAILABLE(ios(13.0)){
  RNCSignInWithAppleButton* btn = [super initWithAuthorizationButtonType:ASAuthorizationAppleIDButtonTypeContinue authorizationButtonStyle:ASAuthorizationAppleIDButtonStyleBlack];
  btn.cornerRadius = 22;
  [btn addTarget:self
          action:@selector(onDidPress)
forControlEvents:UIControlEventTouchUpInside];
  return btn;
}

-(void)onDidPress {
  _onPress(nil);
}

@end
