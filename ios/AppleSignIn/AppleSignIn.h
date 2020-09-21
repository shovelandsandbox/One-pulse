//
//  AppleSignIn.h
//  HealthCareApp
//
//  Created by Vivek Singh on 23/04/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import <React/RCTBridgeModule.h>

@import AuthenticationServices;

@interface AppleSignIn : NSObject <RCTBridgeModule , ASAuthorizationControllerDelegate, ASAuthorizationControllerPresentationContextProviding>

// TODO use promise wrapper like in google sign in
@property (nonatomic, strong) RCTPromiseResolveBlock promiseResolve;
@property (nonatomic, strong) RCTPromiseRejectBlock promiseReject;


@end
