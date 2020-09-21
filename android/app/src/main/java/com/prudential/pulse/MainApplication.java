package com.prudential.pulse;

import android.app.Application;

import androidx.appcompat.app.AppCompatActivity;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.babylon.sdk.core.BabylonCoreSDK;
import com.crashlytics.android.Crashlytics;
import com.crashlytics.android.core.CrashlyticsCore;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.facebook.react.ReactApplication;
import net.no_mad.tts.TextToSpeechPackage;
import com.corbt.keepawake.KCKeepAwakePackage;
import com.dooboolab.RNIap.RNIapPackage;
import com.jimmydaddy.imagemarker.ImageMarkerPackage;
import cn.nodemedia.react_native_nodemediaclient.NodeMediaReactPackage;
// import cl.json.RNSharePackage;
import com.github.yamill.orientation.OrientationPackage;
import com.reactnativecommunity.geolocation.GeolocationPackage;
import io.github.elyx0.reactnativedocumentpicker.DocumentPickerPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import org.wonday.pdf.RCTPdfView;
import com.BV.LinearGradient.LinearGradientPackage;
import com.kishanjvaghela.cardview.RNCardViewPackage;
import com.prudential.pulse.nativemodule.bluetooth.RNBluetoothPackage;
import com.reactnativecommunity.rnpermissions.RNPermissionsPackage;
import com.gantix.JailMonkey.JailMonkeyPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import br.com.classapp.RNSensitiveInfo.RNSensitiveInfoPackage;
import com.rnbiometrics.ReactNativeBiometricsPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.google.firebase.analytics.FirebaseAnalytics;
import com.henninghall.date_picker.DatePickerPackage;
import com.horcrux.svg.SvgPackage;
// import com.jadsonlourenco.RNShakeEvent.RNShakeEventPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.opensettings.OpenSettingsPackage;
// import com.opentokreactnative.OTPackage;
import com.prudential.pulse.library.babylon.auth.RNChatbotAuthPackage;
import com.prudential.pulse.library.babylon.babyloncommon.RNBabylonCommonPackage;
import com.prudential.pulse.library.babylon.chat.RNBabylonChatPackage;
import com.prudential.pulse.library.babylon.clinicalrecords.RNClinicalRecordsPackage;
import com.prudential.pulse.library.babylon.digitaltwin.RNDigitalTwinPackage;
import com.prudential.pulse.library.babylon.healthcheck.HealthCheckPackage;
import com.prudential.pulse.nativemodule.NotificationModule.NotificationReactPackage;
import com.prudential.pulse.nativemodule.RotationMatrixModule.RotationMatrixPackage;
import com.prudential.pulse.nativemodule.prucommonmodule.RNPruCommonPackage;
import com.prudential.pulse.nativemodule.devicePermission.DevicePermissionPackage;
import com.prudential.pulse.nativemodule.deviceinfomodule.RNDeviceInfoPackage;
import com.prudential.pulse.nativemodule.locationModule.LocationPackage;
import com.prudential.pulse.nativemodule.RingTonePackage;
import com.reactnative.googlefit.GoogleFitPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.rnfingerprint.FingerprintAuthPackage;
import com.rnfs.RNFSPackage;
import com.rt2zz.reactnativecontacts.ReactNativeContacts;
import com.masteratul.exceptionhandler.ReactNativeExceptionHandlerPackage;
import java.util.Arrays;
import java.util.List;

// import co.apptailor.googlesignin.RNGoogleSigninPackage;
import io.fabric.sdk.android.Fabric;
// import io.invertase.firebase.RNFirebasePackage;
// import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
// import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
// import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
// import io.invertase.firebase.links.RNFirebaseLinksPackage;
import com.twiliorn.library.TwilioPackage;
import com.reactnativecommunity.slider.ReactSliderPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.rssignaturecapture.RSSignatureCapturePackage; 
import io.github.elyx0.reactnativedocumentpicker.DocumentPickerPackage; // Import package 
import com.joshblour.reactnativeheading.ReactNativeHeadingPackage;
import com.prudential.pulse.generated.BasePackageList;
import org.unimodules.adapters.react.ModuleRegistryAdapter;
import org.unimodules.adapters.react.ReactModuleRegistryProvider;
import org.unimodules.core.interfaces.SingletonModule;
import com.prudential.pulse.nativemodule.maduramodule.HalodocMaduraPackage;
// import com.ocetnik.timer.BackgroundTimerPackage;

import java.util.Arrays;

// import com.evollu.react.fcm.FIRMessagingPackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactModuleRegistryProvider mModuleRegistryProvider = new ReactModuleRegistryProvider(new BasePackageList().getPackageList(), null);
  private static final String APP_IDENTIFIER = "prudential";
  private static final String BABYLON_MALAYSIAN_ENGLISH="en-MY";
  private static final String BABYLON_MALAYSIAN_BAHASA="ms-MY";
  private static final String BABYLON_DEFAULT_UK_ENGLISH="en-GB";

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {

      return Arrays.<ReactPackage>asList(new MainReactPackage(),
            new TextToSpeechPackage(),
            new KCKeepAwakePackage(),
            new RNIapPackage(),
            new ImageMarkerPackage(),
            new ModuleRegistryAdapter(mModuleRegistryProvider),
            new NodeMediaReactPackage(),
            // new RNSharePackage(),
            new GeolocationPackage(),
            new DocumentPickerPackage(),
            new FastImageViewPackage(),
            new RNCWebViewPackage(),
            new RCTPdfView(),
            new RNCardViewPackage(),
            new LinearGradientPackage(),
            new RNPermissionsPackage(),
            new JailMonkeyPackage(),
            new RNDeviceInfo(),
            new RNSensitiveInfoPackage(),
            new ReactNativeBiometricsPackage(),
            new ReactNativeConfigPackage(),
            new RNFetchBlobPackage(),
            new RNPruCommonPackage(),
            new FBSDKPackage(),
            // new FIRMessagingPackage(),
          // new RNFirebasePackage(),
          // new RNFirebaseMessagingPackage(),
          // new RNFirebaseNotificationsPackage(),
          // new RNFirebaseAnalyticsPackage(),
          // new RNFirebaseLinksPackage(),
          // new OTPackage(),
          new OpenSettingsPackage(),
          new DatePickerPackage(),
          new MapsPackage(),
          new SvgPackage(),
          new FingerprintAuthPackage(),
          new GoogleFitPackage(BuildConfig.APPLICATION_ID),
          new ReactNativeExceptionHandlerPackage(),
          new VectorIconsPackage(),
          // new RNShakeEventPackage(),
          // new RNGoogleSigninPackage(),
          new RNFSPackage(),
          new ReactNativeContacts(),
          new PickerPackage(),
          new LocationPackage(),
          new RNChatbotAuthPackage(),
          new RNBabylonChatPackage(),
          new RNClinicalRecordsPackage(),
          new RNDigitalTwinPackage(),
          new HealthCheckPackage(),
          new RNDeviceInfoPackage(),
          new RNBabylonCommonPackage(),
          new DevicePermissionPackage(),
          new ReactNativePushNotificationPackage(),
          new RotationMatrixPackage(),
          new TwilioPackage(),
          new ReactSliderPackage(),
          new ReactVideoPackage(),
          new OrientationPackage(),
          new NotificationReactPackage(),
          new RNBluetoothPackage(),
          new RSSignatureCapturePackage(),
          new RingTonePackage(),
          new ReactNativeHeadingPackage(),
          new HalodocMaduraPackage()
          // new BackgroundTimerPackage()
          );
          

    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    //BabylonCoreSDK.init(this, "PreprodPrudential", APP_IDENTIFIER, BABYLON_DEFAULT_UK_ENGLISH);
    BabylonCoreSDK.init(this, getString(R.string.babylon_identifier), APP_IDENTIFIER, BABYLON_DEFAULT_UK_ENGLISH);
    // FirebaseAnalytics.getInstance(this);
    configureCrashReporting();
  }

  private void configureCrashReporting() {
    CrashlyticsCore crashlyticsCore = new CrashlyticsCore.Builder()
            .disabled(BuildConfig.DEBUG)
            .build();
    Fabric.with(this, new Crashlytics.Builder().core(crashlyticsCore).build());
  }
}
