package com.prudential.pulse.nativemodule.prucommonmodule;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.app.PendingIntent;
import android.content.IntentSender;
import android.net.Uri;
import android.os.Build;
import android.telephony.TelephonyManager;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import android.os.Bundle;
import android.app.Activity;



import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.dynamiclinks.DynamicLink;
import com.google.firebase.dynamiclinks.FirebaseDynamicLinks;
import com.google.firebase.dynamiclinks.PendingDynamicLinkData;
import com.google.firebase.dynamiclinks.ShortDynamicLink;
import com.prudential.pulse.BuildConfig;
import com.prudential.pulse.nativemodule.Constants;
import com.google.android.gms.auth.api.Auth;
import com.google.android.gms.auth.api.credentials.Credential;
import com.google.android.gms.auth.api.credentials.CredentialPickerConfig;
import com.google.android.gms.auth.api.credentials.HintRequest;
import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.api.GoogleApiClient;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import java.net.MalformedURLException;
import android.net.Uri;
import java.util.TimeZone;
import static android.app.Activity.RESULT_OK;

public class RNPruCommonModule extends ReactContextBaseJavaModule implements GoogleApiClient.ConnectionCallbacks, GoogleApiClient.OnConnectionFailedListener {

    public static String referrerUid;
    public static String deepLinkID;
    public static String campaignId;
    private ReactApplicationContext currentReactContext;
    private Uri mInvitationUrl;
    private GoogleApiClient mCredentialsApiClient;
    public static final String TAG = RNPruCommonModule.class.getSimpleName();
    private static final int RC_HINT = 1008;
    private Promise mPickerPromise;
    private static final String E_ACTIVITY_DOES_NOT_EXIST = "E_ACTIVITY_DOES_NOT_EXIST";
     private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {

        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent intent) {
            if (requestCode == RC_HINT) {
                if (mPickerPromise != null) {
                    if (resultCode == RESULT_OK) {
                        Credential cred = intent.getParcelableExtra(Credential.EXTRA_KEY);
                        mPickerPromise.resolve(cred.getId());
                    }else {
                        mPickerPromise.reject("Error","No image data found");
                    }
                    mPickerPromise = null;
                }
            }
        }

    };


    public RNPruCommonModule(ReactApplicationContext reactContext) {
        super(reactContext);
        currentReactContext = reactContext;
        this.registerTimezoneListener();
        reactContext.addActivityEventListener(mActivityEventListener);
    }

    @Override
    public String getName() {
        return Constants.PRU_COMMON_BRIDGE;
    }


    @ReactMethod
    public void execute(String methodtype, Promise promise){
        Activity currentActivity = getCurrentActivity();
         if (currentActivity == null) {
            promise.reject(E_ACTIVITY_DOES_NOT_EXIST, "Activity doesn't exist");
            return;
        }
        mPickerPromise = promise;
        switch(methodtype){
            case Constants.GET_COUNTRY_INFO:
                getCountryInfo( promise);
                break;
            case Constants.GET_REFERRER_UID:
                promise.resolve(referrerUid);
                break;
            case Constants.CREATE_DYNAMIC_LINK:
                createDynamicLink(promise);
                break;
            case Constants.GET_DEEP_LINK_ID:
                 promise.resolve(deepLinkID);
                 break;
            case Constants.GET_CAMPAIGN_ID:
                 promise.resolve(campaignId);
                break;    
            case Constants.GET_SIM_NUMBER:
                getSimNumber();
                break;
            default:
                promise.reject(Constants.METHOD_TYPE_ERROR, Constants.METHOD_TYPE_ERROR_MESSAGE);
                break;
        }
    }

    private void getCountryInfo(Promise promise){
        WritableMap countryInfo = getCountryInfo();
        promise.resolve(countryInfo);
    }

    private void getSimNumber(){
            Activity currentActivity = getCurrentActivity();
               try {
                    mCredentialsApiClient = new GoogleApiClient.Builder(currentReactContext)
                            .addConnectionCallbacks(this)
                            .addApi(Auth.CREDENTIALS_API)
                            .build();
                    HintRequest hintRequest = new HintRequest.Builder()
                            .setHintPickerConfig(new CredentialPickerConfig.Builder()
                                    .setShowCancelButton(true)
                                    .build())
                            .setPhoneNumberIdentifierSupported(true)
                            .build();
                    
                    PendingIntent intent =
                            Auth.CredentialsApi.getHintPickerIntent(mCredentialsApiClient, hintRequest);
                    try {
                        currentActivity.startIntentSenderForResult(intent.getIntentSender(), RC_HINT, null, 0, 0, 0);
                    } catch (IntentSender.SendIntentException e) {
                        mPickerPromise.reject("Error invoke1:", e);
                        mPickerPromise = null;
                    }

                } catch (Exception e) {
                    mPickerPromise.reject("Error invoke:", e);
                    mPickerPromise = null;
                }    
    }

    private WritableMap getCountryInfo() {
        Context currentAppContext = currentReactContext.getApplicationContext();
        TelephonyManager tm = (TelephonyManager)currentAppContext.getSystemService(Context.TELEPHONY_SERVICE);
        String networkCountryIso = tm.getNetworkCountryIso();
        String simCountryIso = tm.getSimCountryIso();
        String localeCountry =  "";
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            localeCountry = currentAppContext.getResources().getConfiguration().getLocales().get(0).getCountry();
        } else {
            localeCountry = currentAppContext.getResources().getConfiguration().locale.getCountry();
        }
        WritableMap detail = Arguments.createMap();

        detail.putString("networkCountry", networkCountryIso.toUpperCase());
        detail.putString("simCountry", simCountryIso.toUpperCase());
        detail.putString("localeCountry", localeCountry);
        detail.putString("timeZone", TimeZone.getDefault().getID());
        return detail;
    }


    private void createDynamicLink(Promise promise){

        String link = "https://onepulse.page.link/?invitedby=" + "123";
        Uri pulseByPrudential = Uri.parse("https://i.ibb.co/Gt96G0h/Pulse.png");
        FirebaseDynamicLinks.getInstance().createDynamicLink()
                .setLink(Uri.parse(link))
                .setDomainUriPrefix("https://onepulse.page.link")
                .setAndroidParameters(
                        new DynamicLink.AndroidParameters.Builder(BuildConfig.APPLICATION_ID)
                                .setMinimumVersion(125)
                                .build())
                .setIosParameters(
                        new DynamicLink.IosParameters.Builder(BuildConfig.APPLICATION_ID)
                                .setAppStoreId("123456789")
                                .setMinimumVersion("1.0.1")
                                .build())
                .setSocialMetaTagParameters(
                        new DynamicLink.SocialMetaTagParameters.Builder()
                                .setTitle("Pulse By Prudential")
                                .setDescription("Enjoy getting fitter with Pulse!")
                                .setImageUrl(pulseByPrudential)
                                .build())
                .buildShortDynamicLink()
                .addOnSuccessListener(new OnSuccessListener<ShortDynamicLink>() {
                    @Override
                    public void onSuccess(ShortDynamicLink shortDynamicLink) {
                        mInvitationUrl = shortDynamicLink.getShortLink();
                        promise.resolve(mInvitationUrl.toString());
                    }
                });
        // [END ddl_referral_create_link]
    }



    public void registerTimezoneListener() {
        Context currentAppContext = currentReactContext.getApplicationContext();
        IntentFilter timezoneFilter = new IntentFilter(Intent.ACTION_TIMEZONE_CHANGED);

        BroadcastReceiver timezoneReceiver = new BroadcastReceiver(){
            @Override
            public void onReceive(Context context, Intent intent){
                WritableMap countryInfo = getCountryInfo();
                countryInfo.putString(Constants.COUNTRY_CHANGE_EVENT_KEY, "TIME_ZONE_CHANGED");
                sendEvent(currentReactContext, Constants.COUNTRY_CHANGE_EVENT, countryInfo);
                Log.d("mrmr", "TIMEZONE CHANGED!");
                Log.d("mrmr", countryInfo.getString("timeZone"));
            }
        };
        currentAppContext.registerReceiver(timezoneReceiver, timezoneFilter);
    }

    private void sendEvent(ReactContext reactContext,
                           String eventName,
                           @androidx.annotation.Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }
    @Override
    public void onConnected(@Nullable Bundle bundle) {
        Log.d(TAG, "Connected");
    }

    @Override
    public void onConnectionSuspended(int cause) {
        Log.d(TAG, "GoogleApiClient is suspended with cause code: " + cause);
    }

    @Override
    public void onConnectionFailed(@NonNull ConnectionResult connectionResult) {
        Log.d(TAG, "GoogleApiClient failed to connect: " + connectionResult);
    }


}
