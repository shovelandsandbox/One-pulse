package com.prudential.pulse.nativemodule.NotificationModule;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Intent;
import android.os.Build;
import androidx.core.app.NotificationCompat;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.prudential.pulse.MainActivity;
import com.prudential.pulse.R;

import static android.content.Context.NOTIFICATION_SERVICE;

public class NotificationModules extends ReactContextBaseJavaModule {
    private static final int PUSH_NOTIFICATION_ID = (0x001);
    private static final String PUSH_CHANNEL_ID = "PUSH_NOTIFY_ID";
    private static final String PUSH_CHANNEL_NAME = "PUSH_NOTIFY_NAME";
    ReactApplicationContext reactContext;

    public NotificationModules(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "NotificationModule";
    }
    @ReactMethod
    public void showNotification(String title, String body) {
        NotificationManager notificationManager = (NotificationManager)reactContext.getSystemService(NOTIFICATION_SERVICE);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(PUSH_CHANNEL_ID, PUSH_CHANNEL_NAME, NotificationManager.IMPORTANCE_HIGH);
            if (notificationManager != null) {
                notificationManager.createNotificationChannel(channel);
            }
        }
        try {
            NotificationCompat.Builder builder = new NotificationCompat.Builder(reactContext);
            Intent notificationIntent = new Intent(reactContext, MainActivity.class);
            notificationIntent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
            PendingIntent pendingIntent = PendingIntent.getActivity(reactContext, 0, notificationIntent, 0);
            builder.setContentTitle(title)//设置通知栏标题
                    .setContentIntent(pendingIntent) //设置通知栏点击意图
                    .setContentText(body)
                    .setWhen(System.currentTimeMillis())//通知产生的时间，会在通知信息里显示，一般是系统获取到的时间
                    .setSmallIcon(R.mipmap.ic_launcher)//设置通知小ICON
                    .setChannelId(PUSH_CHANNEL_ID)
                    .setDefaults(Notification.DEFAULT_ALL);

            Notification notification = builder.build();
            notification.flags |= Notification.FLAG_AUTO_CANCEL;
            if (notificationManager != null) {
                notificationManager.notify(PUSH_NOTIFICATION_ID, notification);
            }

        } catch (Exception e){

        }
    }
}
