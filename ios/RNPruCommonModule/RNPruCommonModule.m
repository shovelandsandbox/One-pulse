//
//  RNPruCommonModule.m
//  HealthCareApp
//
//  Created by Maddala Rakesh on 27/12/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "RNPruCommonModule.h"
#import <React/RCTLog.h>
#import<CoreTelephony/CTCarrier.h>
#import <CoreTelephony/CTTelephonyNetworkInfo.h>

@implementation RNPruCommonModule

static NSString *_referralCode;
static NSString *_deepLinkID;
static NSString *_campaignID;

RCT_EXPORT_MODULE(RNPruCommonBridge);

RCT_EXPORT_METHOD(execute:(NSString *) methodtype:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  if([methodtype isEqualToString:@"getCountryInformation"])
  {
    CTTelephonyNetworkInfo *network_Info = [CTTelephonyNetworkInfo new];
    CTCarrier *carrier = network_Info.subscriberCellularProvider;
    
    NSLog(@"country code is: %@", carrier.mobileCountryCode);
    
    //will return the actual country code
    NSLog(@"ISO country code is: %@", carrier.isoCountryCode);
    
    NSLocale *currentLocale = [NSLocale currentLocale];  // get the current locale.
    NSString *countryCode = [currentLocale objectForKey:NSLocaleCountryCode]; // get country code, e.g. ES (Spain), FR (France), etc.
    NSLog(@"Locale country is %@", countryCode);
    
    NSTimeZone* currentTimeZone = [NSTimeZone localTimeZone];
    NSLog(@"Current Timezone of the device is: %@", currentTimeZone.name);
    NSString* simCountryCode = @"";
    if(carrier.isoCountryCode != nil) {
      simCountryCode = [carrier.isoCountryCode uppercaseString];
    }
    NSString* mobileCountryCode = @"";
    if(carrier.mobileCountryCode !=  nil) {
      mobileCountryCode = [carrier.mobileCountryCode uppercaseString];
    }
    NSLog(@" uppercased sim country code = %@", simCountryCode);
    NSLog(@" uppercased mobile network country code = %@", mobileCountryCode);
    NSDictionary *countryInfoDictionary = @{
        @"networkCountry" : mobileCountryCode,
        @"simCountry" : simCountryCode,
        @"localeCountry" : countryCode ? countryCode : @"",
        @"timeZone" : currentTimeZone.name
    };
    resolve(countryInfoDictionary);
  } if([methodtype isEqualToString:@"getReferrerUid"]) {
    resolve(_referralCode);
  } else if([methodtype isEqualToString:@"getDeepLinkID"]) {
    resolve(_deepLinkID);
  } else if([methodtype isEqualToString:@"getCampaignId"]){
    resolve(_campaignID);
  }else{
    // reject(@"Invalid method called");
  }
}

+ (void)setReferralCode:(NSString *)tempReferralCode{
  _referralCode = tempReferralCode;
}

+ (NSString*)referralCode {
  return _referralCode;
}

+ (void)setDeepLinkID:(NSString *)tempDeepLink{
  _deepLinkID = tempDeepLink;
}

+ (void)setCampaignID:(NSString *)tempCampaignCode{
  _campaignID = tempCampaignCode;
}

@end
