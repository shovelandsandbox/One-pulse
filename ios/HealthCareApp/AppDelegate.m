/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
#import <UMReactNativeAdapter/UMReactNativeEventEmitter.h>
#import <UMReactNativeAdapter/UMReactNativeAdapter.h>
#import <React/RCTBridgeDelegate.h>
#import "AppDelegate.h"
#import "RNInitializeBabylon.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <FBSDKCoreKit/FBSDKCoreKit.h>
#import <GoogleMaps/GoogleMaps.h>
#import <React/RCTLinkingManager.h>
// #import "RNFirebaseNotifications.h"
// #import "RNFirebaseMessaging.h"
#import "RNPruCommonModule.h"
#import <UserNotifications/UserNotifications.h>
#import "HealthCareApp-Swift.h"
#import <AVFoundation/AVFoundation.h>
#import "Orientation.h"
// #import "RNFirebaseLinks.h"
#import <UMCore/UMModuleRegistry.h>
#import <UMReactNativeAdapter/UMNativeModulesProxy.h>
#import <UMReactNativeAdapter/UMModuleRegistryAdapter.h>

// @import Firebase;


@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleRegistryAdapter = [[UMModuleRegistryAdapter alloc] initWithModuleRegistryProvider:[[UMModuleRegistryProvider alloc] init]];
  [[AVAudioSession sharedInstance] setCategory:AVAudioSessionCategoryPlayback error:nil];
  [[AVAudioSession sharedInstance] setActive: YES error: nil];
  [[UIApplication sharedApplication] beginReceivingRemoteControlEvents];
  
  [GMSServices provideAPIKey:@"AIzaSyBN7511_6iwTgoGJ0L16_uqrR550BJX8-U"];
  
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"HealthCareApp"
                                            initialProperties:nil];
  
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  if (@available(iOS 13, *)) {
    self.window.overrideUserInterfaceStyle = UIUserInterfaceStyleLight;
  }
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  RNInitializeBabylon *initBabylon = [[RNInitializeBabylon alloc]init];
  [initBabylon initialiseBabylon];
  // [FIRApp configure];
  NSString *bundleIdentifier = [[NSBundle mainBundle] bundleIdentifier];
  // [FIROptions defaultOptions].deepLinkURLScheme = bundleIdentifier;
  // [RNFirebaseNotifications configure];
  // Setup Notifications
  if ([UNUserNotificationCenter class] != nil) {
    // iOS 10 or later
    // For iOS 10 display notification (sent via APNS)
    [UNUserNotificationCenter currentNotificationCenter].delegate = self;
    UNAuthorizationOptions authOptions = UNAuthorizationOptionAlert |
    UNAuthorizationOptionSound | UNAuthorizationOptionBadge;
    // [FIRMessaging messaging].delegate = self;
    //    [[UNUserNotificationCenter currentNotificationCenter]
    //     requestAuthorizationWithOptions:authOptions
    //     completionHandler:^(BOOL granted, NSError * _Nullable error) {
    //       if (error) { NSLog(@"%@", error); }
    //     }];
  } else {
    // iOS 10 notifications aren't available; fall back to iOS 8-9 notifications.
    UIUserNotificationType allNotificationTypes =
    (UIUserNotificationTypeSound | UIUserNotificationTypeAlert | UIUserNotificationTypeBadge);
    UIUserNotificationSettings *settings =
    [UIUserNotificationSettings settingsForTypes:allNotificationTypes categories:nil];
    [application registerUserNotificationSettings:settings];
  }
  [application registerForRemoteNotifications];
  
  [UNUserNotificationCenter currentNotificationCenter].delegate = self;
  
  if (![[NSUserDefaults standardUserDefaults] boolForKey:@"HasLaunchedOnce"])
  {
    NSArray *secItemClasses = @[(__bridge id)kSecClassGenericPassword,
                                (__bridge id)kSecClassInternetPassword,
                                (__bridge id)kSecClassCertificate,
                                (__bridge id)kSecClassKey,
                                (__bridge id)kSecClassIdentity];
    for (id secItemClass in secItemClasses) {
      NSDictionary *spec = @{(__bridge id)kSecClass: secItemClass};
      SecItemDelete((__bridge CFDictionaryRef)spec);
    }
    [[NSUserDefaults standardUserDefaults] setBool:YES forKey:@"HasLaunchedOnce"];
  }
  
  [[FBSDKApplicationDelegate sharedInstance] application:application
                           didFinishLaunchingWithOptions:launchOptions];
  
  return YES;
}

- (NSArray<id<RCTBridgeModule>> *)extraModulesForBridge:(RCTBridge *)bridge
{
    NSArray<id<RCTBridgeModule>> *extraModules = [_moduleRegistryAdapter extraModulesForBridge:bridge];
    // If you'd like to export some custom RCTBridgeModules that are not Expo modules, add them here!
    return extraModules;
}
 

- (void)applicationDidBecomeActive:(UIApplication *)application {
  [FBSDKAppEvents activateApp];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
  
  BOOL dynamicLinkEvaluation = NO;
  
  // FIRDynamicLink *dynamicLink = [[FIRDynamicLinks dynamicLinks] dynamicLinkFromCustomSchemeURL:url];
  
  // if (dynamicLink) {
  //   if (dynamicLink.url) {
  //     // Handle the deep link. For example, show the deep-linked content,
  //     // apply a promotional offer to the user's account or show customized onboarding view.
  //     // ...
  //     NSLog(@"%@", dynamicLink.url);
  //     NSString* queryParameterString = dynamicLink.url.query;
  //     NSLog(@"%@", queryParameterString);
  //     NSString *referralCode = @"";
  //     NSString *deepLinkID = @"";
  //     NSString *campaignID = @"";
  //     NSArray *arrayOfComponents = [queryParameterString componentsSeparatedByString:@"="];
  //     if ([arrayOfComponents[0]  isEqual: @"invitedby"]) {
  //       referralCode = arrayOfComponents[1];
  //     } else if ([arrayOfComponents[0]  isEqual: @"deepLinkID"]) {
  //       deepLinkID = arrayOfComponents[1];
  //     } else if ([arrayOfComponents[0]  isEqual: @"campaign"]) {
  //       campaignID = arrayOfComponents[1];
  //     }
  //     [RNPruCommonModule setReferralCode:referralCode];
  //     [RNPruCommonModule setDeepLinkID:deepLinkID];
  //     [RNPruCommonModule setCampaignID:campaignID];
  //   } else {
  //     // Dynamic link has empty deep link. This situation will happens if
  //     // Firebase Dynamic Links iOS SDK tried to retrieve pending dynamic link,
  //     // but pending link is not available for this device/App combination.
  //     // At this point you may display default onboarding view.
  //     NSLog(@"Hit the else block of the dynamic link parsing");
  //   }
  //   dynamicLinkEvaluation = YES;
  // }
  // return dynamicLink || [[FBSDKApplicationDelegate sharedInstance] application:application
  //                                                                      openURL:url
  //                                                            sourceApplication:sourceApplication
  //                                                                   annotation:annotation
  return [[FBSDKApplicationDelegate sharedInstance] application:application
                                                                        openURL:url
                                                              sourceApplication:sourceApplication
                                                                      annotation:annotation
                         ];

}
- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  BOOL handled = [self application:application
                   openURL:url
         sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey]
                annotation:options[UIApplicationOpenURLOptionsAnnotationKey]];

  if ([[FBSDKApplicationDelegate sharedInstance] application:application openURL:url options:options]) {
    return YES;
  }
  
  if ([RCTLinkingManager application:application openURL:url options:options]) {
    return YES;
  }
  
  // if([[RNFirebaseLinks instance] application:application openURL:url options:options]) {
  //   return YES;
  // }
  
  return handled;
}

- (BOOL)application:(UIApplication *)application
continueUserActivity:(nonnull NSUserActivity *)userActivity
 restorationHandler:
#if defined(__IPHONE_12_0) && (__IPHONE_OS_VERSION_MAX_ALLOWED >= __IPHONE_12_0)
(nonnull void (^)(NSArray<id<UIUserActivityRestoring>> *_Nullable))restorationHandler {
#else
  (nonnull void (^)(NSArray *_Nullable))restorationHandler {
#endif  // __IPHONE_12_0
    // BOOL handled = [[FIRDynamicLinks dynamicLinks] handleUniversalLink:userActivity.webpageURL
    //                                                         completion:^(FIRDynamicLink * _Nullable dynamicLink,
    //                                                                      NSError * _Nullable error) {
    //     if (dynamicLink) {
    //       if (dynamicLink.url) {
    //         // Handle the deep link. For example, show the deep-linked content,
    //         // apply a promotional offer to the user's account or show customized onboarding view.
    //         // ...
    //         NSLog(@"%@", dynamicLink.url);
    //         NSString* queryParameterString = dynamicLink.url.query;
    //         NSLog(@"%@", queryParameterString);
    //         NSString *referralCode = @"";
    //         NSString *deepLinkID = @"";
    //         NSString *campaignID = @"";
    //         NSArray *arrayOfComponents = [queryParameterString componentsSeparatedByString:@"="];
    //         if ([arrayOfComponents[0]  isEqual: @"invitedby"]) {
    //           referralCode = arrayOfComponents[1];
    //         } else if ([arrayOfComponents[0]  isEqual: @"deepLinkID"]) {
    //           deepLinkID = arrayOfComponents[1];
    //         } else if ([arrayOfComponents[0]  isEqual: @"campaign"]) {
    //           campaignID = arrayOfComponents[1];
    //         }
    //         [RNPruCommonModule setReferralCode:referralCode];
    //         [RNPruCommonModule setDeepLinkID:deepLinkID];
    //         [RNPruCommonModule setCampaignID:campaignID];
    //       } else {
    //         // Dynamic link has empty deep link. This situation will happens if
    //         // Firebase Dynamic Links iOS SDK tried to retrieve pending dynamic link,
    //         // but pending link is not available for this device/App combination.
    //         // At this point you may display default onboarding view.
    //         NSLog(@"Hit the else block of the dynamic link parsing");
    //       }
    //     }
      
      // }];
      // BOOL rnFirebaseHandler = [[RNFirebaseLinks instance] application:application continueUserActivity:userActivity restorationHandler:restorationHandler];
      BOOL rctHandler = [RCTLinkingManager application:application
                                  continueUserActivity:userActivity
                                    restorationHandler:restorationHandler];
      // return handled || rctHandler || rnFirebaseHandler;
      return rctHandler;
    }
                    
  
//     -(void) application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void
//                                                                                                                                  (^)(UIBackgroundFetchResult))completionHandler
//   {
    
// //    [[NotificationHandler shared]remoteNotification:userInfo];
    
//     // iOS 10 will handle notifications through other methods
//     NSLog( @"HANDLE PUSH, didReceiveRemoteNotification: %@", userInfo );
    
//     // custom code to handle notification content
    
//     if( [UIApplication sharedApplication].applicationState == UIApplicationStateInactive )
//     {
//       NSLog( @"INACTIVE" );
      
//       ProcessNotification *notificationProcessor = [[ProcessNotification alloc] init];
//       [notificationProcessor remoteNotification:userInfo];
// //      completionHandler( UIBackgroundFetchResultNewData );
//     }
//     else if( [UIApplication sharedApplication].applicationState == UIApplicationStateBackground )
//     {
//       NSLog( @"BACKGROUND" );
//       ProcessNotification *notificationProcessor = [[ProcessNotification alloc] init];
//       [notificationProcessor remoteNotification:userInfo];
// //      completionHandler( UIBackgroundFetchResultNewData );
//     }
//     else
//     {
// //      ProcessNotification *notificationProcessor = [[ProcessNotification alloc] init];
// //      [notificationProcessor remoteNotification:userInfo];
//       NSLog( @"FOREGROUND" );
// //      completionHandler( UIBackgroundFetchResultNewData );
//     }
    
  //  [[RNFirebaseNotifications instance] didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
    
  // }
   - (void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions))completionHandler{
    NSLog(@"Presenting Notification");
  }
  - (UIInterfaceOrientationMask)application:(UIApplication *)application supportedInterfaceOrientationsForWindow:(UIWindow *)window {
    return [Orientation getOrientation];
  }
  
  @end
