//
//  RNCSignInWithAppleButton.h
//  HealthCareApp
//
//  Created by Vivek Singh on 23/04/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import <React/RCTComponent.h>
@import AuthenticationServices;

API_AVAILABLE(ios(13.0))
@interface RNCSignInWithAppleButton : ASAuthorizationAppleIDButton

@property (nonatomic, copy) RCTBubblingEventBlock onPress;

@end
