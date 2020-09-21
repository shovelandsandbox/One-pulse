package com.prudential.pulse.service;

import android.content.Intent;

import androidx.localbroadcastmanager.content.LocalBroadcastManager;

import com.google.firebase.messaging.RemoteMessage;

// import io.invertase.firebase.Utils;
// import io.invertase.firebase.messaging.RNFirebaseMessagingService;

public class AppFirebaseMessageService {
//  extends RNFirebaseMessagingService 

  // @Override
  // public void onMessageReceived(RemoteMessage message) {
  //   super.onMessageReceived(message);
  //   if (!Utils.isAppInForeground(this.getApplicationContext()) && 
  //       message.getData() != null && 
  //       message.getData().get("platform") != null 
  //     ) {

  //     if(message.getData().get("platform").equals("twilio") && message.getData().get("action").equals("startRingtone")) {
  //       Intent intent = new Intent("fireRingtone");
  //       intent.putExtra("action", "startRingtone");
  //       LocalBroadcastManager.getInstance(getApplicationContext()).sendBroadcast(intent);
  //     }
  //     if(message.getData().get("platform").equals("twilio") && message.getData().get("action").equals("stopRingtone")) {
  //       Intent intent = new Intent("fireRingtone");
  //       intent.putExtra("action", "stopRingtone");
  //       LocalBroadcastManager.getInstance(getApplicationContext()).sendBroadcast(intent);
  //     }
  //   }
  // }

}
