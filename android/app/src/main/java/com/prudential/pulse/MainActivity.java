package com.prudential.pulse;

import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.media.AudioManager;
import android.media.MediaPlayer;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Bundle;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import android.util.AttributeSet;
import android.util.Log;
import android.view.ViewGroup;
import android.widget.LinearLayout;

import com.aisolve.babylonapp.CustomUnityPlayer;
import com.babylon.domainmodule.gateway.exceptions.NetworkException;
import com.babylon.sdk.digitaltwin.BabylonDigitalTwinApi;
import com.babylon.sdk.digitaltwin.BabylonDigitalTwinSdk;
import com.babylon.sdk.digitaltwin.UnityPlayerListener;
import com.babylon.sdk.digitaltwin.model.BodyPart;
import com.babylon.sdk.digitaltwin.model.BodyPartAppearance;
import com.babylon.sdk.digitaltwin.model.BodyPartConfig;
import com.babylon.sdk.digitaltwin.model.DigitalTwin;
import com.babylon.sdk.digitaltwin.model.DigitalTwinLayerType;
import com.babylon.sdk.digitaltwin.model.Gender;
import com.babylon.sdk.healthcheck.BabylonHealthCheckSdk;
import com.babylon.sdk.healthcheck.domain.interactors.gethealthcategories.GetHealthCategoriesOutput;
import com.babylon.sdk.healthcheck.domain.interactors.gethealthcategories.GetHealthCategoriesRequest;
import com.babylon.sdk.healthcheck.domain.model.HealthCategory;
import com.babylon.sdk.healthcheck.domain.model.HealthCategoryDataAvailability;
import com.babylon.sdk.healthcheck.domain.model.HealthCategoryId;
import com.babylon.sdk.healthcheck.domain.model.HealthCategoryStatus;
import com.babylon.sdk.healthcheck.domain.model.HealthCategoryType;
import com.facebook.react.bridge.Promise;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.dynamiclinks.FirebaseDynamicLinks;
import com.google.firebase.dynamiclinks.PendingDynamicLinkData;
import com.prudential.pulse.nativemodule.Constants;
import com.facebook.react.ReactFragmentActivity;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import org.jetbrains.annotations.NotNull;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import butterknife.ButterKnife;
import io.reactivex.disposables.CompositeDisposable;
import io.reactivex.disposables.Disposable;
import timber.log.Timber;
import com.prudential.pulse.library.babylon.activity.AbstractMainActivity;
import com.prudential.pulse.nativemodule.prucommonmodule.RNPruCommonModule;
import android.content.Intent;
import android.content.res.Configuration;

public class MainActivity extends AbstractMainActivity  {

    CompositeDisposable compositeDisposable = new CompositeDisposable();
    BabylonDigitalTwinApi babylonDigitalTwinApi;
    private Disposable layerSelectionDisposable;
    private Map<BodyPart, BodyPartConfig> digitalTwinBodyParts;
    ViewGroup customUnityPlayer;
    Gender gender = Gender.Male.INSTANCE;
    DigitalTwinLayerType digitalTwinLayerType=DigitalTwinLayerType.Organs.INSTANCE;
    private Map<Integer, Promise> devicePermissionsResolver = new HashMap<>();

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "HealthCareApp";
    }

    public void setResolver(Integer permissionRequestType, Promise promise){
        devicePermissionsResolver.put(permissionRequestType, promise);
    }

    public Promise retrieveResolver(Integer permissionRequestType){
        return devicePermissionsResolver.remove(permissionRequestType);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        ButterKnife.bind(this);
        createDigitalTwinView();
        receiveDynamicLink();
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        Intent intent = new Intent("onConfigurationChanged");
        intent.putExtra("newConfig", newConfig);
        this.sendBroadcast(intent);
    }


    private void receiveDynamicLink(){
        try {
            FirebaseDynamicLinks.getInstance()
                    .getDynamicLink(getIntent())
                    .addOnSuccessListener(this, new OnSuccessListener<PendingDynamicLinkData>() {
                        @Override
                        public void onSuccess(PendingDynamicLinkData pendingDynamicLinkData) {
                            // Get deep link from result (may be null if no link is found)
                            Uri deepLink = null;
                            if (pendingDynamicLinkData != null) {
                                deepLink = pendingDynamicLinkData.getLink();
                            }
                            //
                            // If the user isn't signed in and the pending Dynamic Link is
                            // an invitation, sign in the user anonymously, and record the
                            // referrer's UID.
                            //

                            if (deepLink != null
                                    && deepLink.getBooleanQueryParameter("invitedby", false)) {
                                String referrerUid = deepLink.getQueryParameter("invitedby");
                                RNPruCommonModule.referrerUid = referrerUid;
                            }

                            if (deepLink != null
                                    && deepLink.getBooleanQueryParameter("campaign", false)) {
                                System.out.println("@@@@@@@@@@deeplink:campaign:" + deepLink);
                                String  campaign = deepLink.getQueryParameter("campaign");
                                RNPruCommonModule.campaignId = campaign;
                            }

                            if (deepLink != null
                                    && deepLink.getBooleanQueryParameter("deepLinkID", false)) {
                                String deepLinkID = deepLink.getQueryParameter("deepLinkID");
                                RNPruCommonModule.deepLinkID = deepLinkID;
                            }
                        }
                    });
        }catch(Exception exception){
            // issue in dynamic link
        }

    }

    public void shareLink(Uri myDynamicLink) {
        // [START ddl_share_link]
        Intent sendIntent = new Intent();
        String msg = "Hey, check this out: " + "http://www.google.com";
        sendIntent.setAction(Intent.ACTION_SEND);
        sendIntent.putExtra(Intent.EXTRA_TEXT, msg);
        sendIntent.setType("text/plain");
        startActivity(sendIntent);
        // [END ddl_share_link]
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        Promise promise = retrieveResolver(requestCode);
        if(promise == null){
            super.onRequestPermissionsResult(requestCode, permissions, grantResults);
            return;
        }
        if (grantResults.length > 0
                && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
            promise.resolve(true);
        } else {
            // permission denied
            promise.resolve(false);
        }
        return;
    }

    @Override
    protected void onDestroy() {
        compositeDisposable.clear();
        if (layerSelectionDisposable != null) {
            layerSelectionDisposable.dispose();
            layerSelectionDisposable = null;
        }
        super.onDestroy();
    }
}