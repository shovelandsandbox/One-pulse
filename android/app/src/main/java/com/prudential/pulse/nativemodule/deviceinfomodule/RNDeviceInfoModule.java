package com.prudential.pulse.nativemodule.deviceinfomodule;

import android.os.AsyncTask;
import android.os.Build;
import android.provider.Settings;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.google.android.gms.ads.identifier.AdvertisingIdClient;
import com.google.android.gms.common.GooglePlayServicesNotAvailableException;
import com.google.android.gms.common.GooglePlayServicesRepairableException;
import com.prudential.pulse.BuildConfig;
import com.prudential.pulse.nativemodule.Constants;

import java.io.IOException;

public class RNDeviceInfoModule extends ReactContextBaseJavaModule {


    public RNDeviceInfoModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return Constants.DEVICE_INFO_BRIDGE;
    }


    @ReactMethod
    public void execute(String methodtype, ReadableMap details, Promise promise){

        switch(methodtype){
            case Constants.GET_DEVICE_DETAIL:
                  getDeviceDetial( promise);
                break;
            case Constants.GET_APP_VERSION:
                getAppVersion(promise);
                break;

            case Constants.GET_ADV_ID:
                getAdvertiserID(promise);
                break;

            default:
                promise.reject(Constants.METHOD_TYPE_ERROR, Constants.METHOD_TYPE_ERROR_MESSAGE);
                break;
        }
    }

    private void getAppVersion(Promise promise){
        WritableMap detail = Arguments.createMap();
        final String appVersion = BuildConfig.VERSION_NAME;
        detail.putString("appVersion",appVersion);
        promise.resolve(detail);

    }

    private void getAdvertiserID(Promise promise){
        WritableMap detail = Arguments.createMap();
        AsyncTask.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    AdvertisingIdClient.Info adInfo = AdvertisingIdClient.getAdvertisingIdInfo(getReactApplicationContext());
                    String adId = adInfo != null ? adInfo.getId() : null;
                    if (adId != null) {
                        detail.putString("advId",adId);
                    }
                    promise.resolve(detail);
                } catch (Exception exception) {
                    promise.reject(Constants.METHOD_TYPE_ERROR, exception.getMessage());
                    // Error handling if needed
                }
            }
        });
    }


    private void getDeviceDetial(Promise promise){
        WritableMap detail = Arguments.createMap();
        String uniqueID  =  Settings.Secure.getString(getReactApplicationContext().getContentResolver(), Settings.Secure.ANDROID_ID);
        String deviceType = "DEVICE_TYPE_ANDROID";
        String notificationToken = "";
        detail.putString("deviceId", uniqueID);
        detail.putString("deviceType", deviceType);
        detail.putString("notificationToken", notificationToken);
        promise.resolve(detail);
    }
}
