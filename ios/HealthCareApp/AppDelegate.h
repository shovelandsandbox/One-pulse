/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>
#import "RNPruCommonModule.h"
#import <UserNotifications/UserNotifications.h>
// #import <FirebaseMessaging/FirebaseMessaging.h>
#import <UMReactNativeAdapter/UMModuleRegistryAdapter.h>
//#import "HealthCareApp-Swift.h"
@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate,UNUserNotificationCenterDelegate>
@property (nonatomic, strong) UIWindow *window;
@property (nonatomic, strong) UMModuleRegistryAdapter *moduleRegistryAdapter;
//@property(nonatomic,strong) BabylonAuth *bAuth;
@end
