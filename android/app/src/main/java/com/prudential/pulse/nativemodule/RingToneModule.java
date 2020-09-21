package com.prudential.pulse.nativemodule;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.media.Ringtone;
import android.media.RingtoneManager;
import android.net.Uri;

import androidx.localbroadcastmanager.content.LocalBroadcastManager;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class RingToneModule extends ReactContextBaseJavaModule {
    Uri defaultRingtoneUri = null;
    Ringtone defaultRingtone = null;
    private boolean playingRingtone = false;

    public RingToneModule(ReactApplicationContext context) {
        super(context);
        LocalBroadcastManager.getInstance(context).registerReceiver(aLBReceiver,
                new IntentFilter("fireRingtone"));
    }

    @Override
    public String getName() {
        return "RingToneModule";
    }

    @ReactMethod
    public void playRingTone() {
        defaultRingtoneUri = RingtoneManager.getActualDefaultRingtoneUri(getReactApplicationContext(), RingtoneManager.TYPE_RINGTONE);
        defaultRingtone = RingtoneManager.getRingtone(getReactApplicationContext(), defaultRingtoneUri);
        defaultRingtone.play();
        playingRingtone = true;
        Thread counterThread = new Thread() {
            @Override
            public void run() {
                try {
                    Thread.sleep(1000 * 60);
                    stopRingTone();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        };
        counterThread.start();
    }

    @ReactMethod
    public void stopRingTone() {
        if(defaultRingtone != null){
            defaultRingtone.stop();
            playingRingtone = false;
        }

    }

    @ReactMethod
    public void isRingtonePlaying(Promise promise) {
        promise.resolve(playingRingtone);
    }

    private BroadcastReceiver aLBReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            String action = intent.getStringExtra("action");
            if(action.equals("startRingtone")) {
                playRingTone();
            } else if (action.equals("stopRingtone")) {
                stopRingTone();
            }
        }
    };

    @Override
    public void onCatalystInstanceDestroy() {
        super.onCatalystInstanceDestroy();
        LocalBroadcastManager.getInstance(getReactApplicationContext()).unregisterReceiver(aLBReceiver);
    }
}
