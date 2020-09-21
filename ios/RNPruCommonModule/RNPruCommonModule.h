//
//  RNPruCommonModule.h
//  HealthCareApp
//
//  Created by Maddala Rakesh on 27/12/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <React/RCTBridgeModule.h>

@interface RNPruCommonModule : NSObject <RCTBridgeModule>
@property (class, nonatomic, copy) NSString *referralCode;
+ (void)setReferralCode:(NSString *)newReferralCode;
+ (void)setDeepLinkID:(NSString *)newDeepLinkID;
+ (void)setCampaignID:(NSString *)newDeepLinkID;

@end
