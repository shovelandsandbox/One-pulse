package com.prudential.pulse.nativemodule.maduramodule;

import android.os.Bundle;
import android.util.Log;
import android.view.SurfaceView;

import androidx.annotation.WorkerThread;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.halodoc.madura.MaduraModuleProtocolImpl;
import com.halodoc.madura.core.MaduraConfig;
import com.halodoc.madura.core.call.models.AudioVolumeIndicator;
import com.halodoc.madura.core.call.models.CallAckData;
import com.halodoc.madura.core.call.models.CallDetail;
import com.halodoc.madura.core.call.models.CallMode;
import com.halodoc.madura.core.call.models.CallRequest;
import com.halodoc.madura.core.call.models.CallServiceConfig;
import com.halodoc.madura.core.call.models.CallStats;
import com.halodoc.madura.core.call.models.CallType;
import com.halodoc.madura.core.call.protocols.CallEventListener;
import com.halodoc.madura.core.call.protocols.CallService;
import com.halodoc.madura.core.call.protocols.CallServiceProtocol;
import com.halodoc.madura.core.call.protocols.ConnectionCallback;
import com.halodoc.madura.core.call.protocols.NoOpCallEventListener;
import com.halodoc.madura.core.call.protocols.OnCallCompleteListener;
import com.halodoc.madura.core.chat.data.models.ChatServiceConfig;
import com.halodoc.madura.core.chat.protocols.ChatServiceProtocol;
import com.prudential.pulse.nativemodule.Constants;
import com.halodoc.madura.chat.messagetypes.call.CallStartMimeTypeKt;

import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import javax.annotation.Nonnull;

public class HalodocMaduraModule extends ReactContextBaseJavaModule {

    private static final String CHAT_ROOM_ID = "chatRoomId";
    private static final String CALL_ROOM_ID = "callRoomId";
    private static final String CONSULTATION_ID = "consultationId";
    private static final String CALL_USER_ID = "callUserId";
    private static final String CALL_USER_TOKERN = "callUserToken";
    private static final String INCOMING_OUTGOING = "incomingOutgoing";
    private static final String CALL_CONNECTED_EVENT = "call_connected";
    private static final String CALL_CONNECTION_ERROR_EVENT = "call_connection_failed";
    private static final String CALL_EVENTS = "CallEvents";
    private static final String EVENT_KEY = "eventName";
    private static final String CALL_DISCONNECTED_EVENT = "CallDisconnected";
    private static final String CALL_INTERRUPTED_EVENT = "CallInterrupted";
    private static final String CALL_RECONNECTED_EVENT = "CallReconnected";
    private static final String CALL_REMOTE_CONNECTED_EVENT = "CallRemoteConnected";
    private static final String CALL_FIRST_VIDEO_DECODED_EVENT = "CallFirstVideoDecoded";
    private static final String CALL_REMOTE_VIDEO_MUTE_EVENT = "CallRemoteVideoMuted";
    private static final String NATIVE_CALL_SUCCESS = "success";
    public static final String NATIVE_CALL_FAILURE = "failure";
    public static final String HALODOC_ACCESS_TOKEN = "halodocAccessToken";

    private String CALL_TYPE = "call_type";

    MaduraRN sharedState;
    CallRequest callRequest;
    CallService mCallService;
    ReactApplicationContext currentModuleReactContext;
    private SurfaceView remoteVideoView = null;
    private SurfaceView localVideoView = null;

    CallServiceProtocol callServiceProtocol;
    ChatServiceProtocol chatServiceProtocol;

    public HalodocMaduraModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
        this.currentModuleReactContext = reactContext;
        sharedState = MaduraRN.getSharedState();
    }

    @Nonnull
    @Override
    public String getName() {
            return "HalodocMadura";
    }

    @ReactMethod
    public void execute(String methodType, ReadableMap details, Promise promise){

        switch(methodType){
            case Constants.INIT_MADURA:
                initMadura(details, promise);
                break;
            case Constants.SETUP_CALL_SERVICE:
                setupMaduraCallService(promise);
                break;
            case Constants.SETUP_CALL_DETAILS:
                setupCallRequest(details, promise);
                break;
            case Constants.JOIN_CALL:
                joinCall(promise);
                break;
            case Constants.LEAVE_CALL:
                leaveCall(promise);
                break;

            case Constants.TOGGLE_SPEAKER:
                toggleSpeaker(promise);
                break;

             case Constants.SWITCH_CAMERA:
                 Log.d("function","SWITCH_CAMERA");
                 switchCamera(promise);
                 break;

            case Constants.TOGGLE_MIC:
                toggleMic(promise);
                break;

            case Constants.DESTROY_MADURA:
                destroyMaduraSetup(promise);
                break;
            default:
                promise.reject(Constants.METHOD_TYPE_ERROR, Constants.METHOD_TYPE_ERROR_MESSAGE);
                break;
        }
    }

    private void setupMaduraCallService(Promise promise) {
        Log.d("mkmk1013", "setupMaduraCallService");
        callServiceProtocol = MaduraModuleProtocolImpl.INSTANCE.createCallService(getReactApplicationContext());
        callServiceProtocol.bindService(getReactApplicationContext(), connectionCallback);
        promise.resolve(NATIVE_CALL_SUCCESS);
    }

    private void joinCall(Promise promise) {
        try {
            CallDetail callDetail = mCallService.getCallDetail();
            if (!callDetail.isIncoming()) {
                if (!mCallService.isInActiveCall()) {
                    Log.d("rakesh", "joining call..");
                    mCallService.joinCall();
                }
            }
            promise.resolve(NATIVE_CALL_SUCCESS);
        } catch (IllegalStateException illegalException) {
            illegalException.printStackTrace();
            promise.reject("sending_message_failed", NATIVE_CALL_FAILURE);
        } catch (Exception e) {
            promise.reject("sending_message_failed", NATIVE_CALL_FAILURE);
        }
    }

    private void updateVideoViewState() {
        CallDetail callDetail = mCallService.getCallDetail();
        if (callDetail == null) {
            return;
        }
        if (localVideoView != null) {
            mCallService.preview(localVideoView, false);
        }
        Log.d("mkmk", "before fetching local view");
        currentModuleReactContext.getCurrentActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                localVideoView = mCallService.getLocalRenderView(currentModuleReactContext.getCurrentActivity());
                remoteVideoView = mCallService.getRemoteRenderView(currentModuleReactContext.getCurrentActivity());
                sharedState.setLocalView(localVideoView);
                sharedState.setRemoteView(remoteVideoView);
                sharedState.setIsVideoViewsAvailable(true);
                Log.d("mkmk", "updated video views");
                WritableMap params = Arguments.createMap();
                params.putString(EVENT_KEY, "UpdatedVideoViews");
                sendEvent(currentModuleReactContext, CALL_EVENTS, params);
            }
        });
    }

    private void leaveCall(Promise promise) {
        CallDetail callDetail = mCallService != null ? mCallService.getCallDetail() : null;
        if (callDetail != null) {
            mCallService.leaveCall();
        }
        promise.resolve(NATIVE_CALL_SUCCESS);
    }

    private void toggleSpeaker(Promise promise) {
        CallDetail callDetail = mCallService != null ? mCallService.getCallDetail() : null;
        Boolean isSpeakerOn = false;
        if (callDetail != null) {
            isSpeakerOn = !callDetail.isSpeakerOn();
            mCallService.setSpeakerOn(isSpeakerOn);
        }
        promise.resolve(isSpeakerOn);
    }

    private void switchCamera(Promise promise) {
        Boolean isCameraSwitched = Boolean.FALSE;
        CallDetail callDetail = mCallService != null ? mCallService.getCallDetail() : null;
        if (callDetail != null) {
            mCallService.switchCamera();
            isCameraSwitched = true;
        }
        Log.d("function","switchCamera");
        promise.resolve(isCameraSwitched);
    }

    private void toggleMic(Promise promise) {
        CallDetail callDetail =  mCallService != null ? mCallService.getCallDetail() : null;
        Boolean isMuteAudio = false;
        if (callDetail != null) {
            isMuteAudio = !callDetail.isAudioMuted();
            mCallService.muteAudio(isMuteAudio);
        }
        promise.resolve(isMuteAudio);
    }

    private OnCallCompleteListener callCompleteListener = new OnCallCompleteListener() {
        @Override
        public void onCallComplete(CallAckData callAckData) {
            WritableMap params = Arguments.createMap();
            params.putString(EVENT_KEY, "CallEnded");
            sendEvent(currentModuleReactContext, CALL_EVENTS, params);
        }
    };

    @NotNull
    private ConnectionCallback connectionCallback = (ConnectionCallback)(new ConnectionCallback() {
        public void onServiceConnected(@NotNull CallService callService) {
            Log.d("mkmk1010", "onServiceConnected");
            mCallService = callService;
            mCallService.registerEventListener(callEventListener);
            mCallService.registerCallCompleteListener(callCompleteListener);

            WritableMap params = Arguments.createMap();
            params.putString(EVENT_KEY, "CallServiceInitialized");
            sendEvent(currentModuleReactContext, CALL_EVENTS, params);
        }

        public void onServiceConnectionFailed() {
            Log.d("mkmk1011", "onServiceConnectionFailed");
        }

        public void onServiceDisconnected() {
            Log.d("mkmk1012", "onServiceDisconnected");
            mCallService.unregisterEventListener(callEventListener);
        }
    });

    public void initMadura(ReadableMap maduraConfig, Promise promise) {
        Log.d("rakesh_log", "initialising madura");
        MaduraConfig maduraSdkConfig = makeMaduraConfig(maduraConfig);
        MaduraModuleProtocolImpl.INSTANCE.init(maduraSdkConfig);
        sharedState.setIsVideoViewsAvailable(false);
        promise.resolve(NATIVE_CALL_SUCCESS);
    }

    private MaduraConfig makeMaduraConfig(ReadableMap maduraConfig) {
        return new MaduraConfig(true,
                getChatServiceConfig(maduraConfig),
                getCallServiceConfig(maduraConfig)
        );
    }

    private CallServiceConfig getCallServiceConfig(ReadableMap maduraConfig) {
        if(maduraConfig != null) {
            ReadableMap callConfig = maduraConfig.getMap("call_config");
            if(callConfig!= null) {
                String callAppSdkConfigId = callConfig.getString("call_sdk_app_id");
                if (callAppSdkConfigId != null) {
                    return new CallServiceConfig(callAppSdkConfigId, new CallActionExecutor(), 10L, 10L);
                }
            }
        }
        return null;
    }

    private ChatServiceConfig getChatServiceConfig(ReadableMap maduraConfig) {

        ReadableMap chatConfig = maduraConfig.getMap("chat_config");

        String chatSdkConfigId= "halodoc-stage";
        String chatAppSdkApiUrl= "https://qiscus-lb.stage.halodoc.com";
        String chatAppSdkMqttUrl= "ssl://qiscus-mqtt.stage.halodoc.com:1885";

        return new ChatServiceConfig(true,
                chatSdkConfigId,
                chatAppSdkApiUrl,
                chatAppSdkMqttUrl,
                true, true
            );
    }

    private void setupCallRequest(
            ReadableMap details,
            Promise promise) {
        Log.d("rakesh", "setting up call request");
        String chatRoomId = details.getString(CHAT_ROOM_ID);
        String callRoomId = details.getString(CALL_ROOM_ID);
        String callUserId = details.getString(CALL_USER_ID);
        String callUserToken = details.getString(CALL_USER_TOKERN);
        String consultationId = details.getString(CONSULTATION_ID);
        Boolean incoming = details.getBoolean(INCOMING_OUTGOING);
        String callType = details.getString(CALL_TYPE);
        String halodocUserAccessToken = details.getString(HALODOC_ACCESS_TOKEN);
        Bundle clientData = new Bundle();
        clientData.putString(
                CallStartMimeTypeKt.getKEY_CONVERSATION_ID(),
                chatRoomId
        );
        CallType audioVideoCallType;
        if(callType.equals("AUDIO")) {
            audioVideoCallType = CallType.AUDIO;
        } else {
            audioVideoCallType = CallType.VIDEO;
        }
        CallMode callMode = incoming ? CallMode.INCOMING : CallMode.OUTGOING;
        callRequest = new CallRequest(
                callRoomId,
                callUserId,
                "",
                callMode,
                audioVideoCallType,
                callUserId,
                callUserToken,
                true,
                clientData,
                consultationId
        );
        if(!mCallService.isInActiveCall()) {
            mCallService.setupCall(callRequest);
            mCallService.muteAudio(false);
            mCallService.setSpeakerOn(false);
        } else {
            promise.resolve(NATIVE_CALL_FAILURE);
        }
        promise.resolve(NATIVE_CALL_SUCCESS);
    }

    private void destroyMaduraSetup(Promise promise) {
        Log.d("mkmk", "destroying madura");
        if(callServiceProtocol != null){
            callServiceProtocol.unbindService(getReactApplicationContext(), connectionCallback);
        }
        if(mCallService != null) {
            mCallService.unregisterEventListener(callEventListener);
            mCallService.unregisterCallCompleteListener(callCompleteListener);
        }
        promise.resolve(NATIVE_CALL_SUCCESS);
    }

    @NotNull
    private CallEventListener callEventListener = (CallEventListener)(new NoOpCallEventListener() {
        @Override
        public void onAudioRouteChanged(int audioRoute) {
            Log.d("mkmk1014", "onAudioRouteChanged");
            super.onAudioRouteChanged(audioRoute);
        }

        @Override
        public void onAudioVolumeIndication(@Nullable AudioVolumeIndicator[] audioVolumeInfo, int totalVolume) {
            Log.d("mkmk1015", "onAudioVolumeIndication");
            super.onAudioVolumeIndication(audioVolumeInfo, totalVolume);
        }

        @Override
        public void onConnectionLost() {
            Log.d("mkmk1016", "onConnectionLost");
            super.onConnectionLost();
        }

        @Override
        public void onFirstRemoteVideoFrame(int uid, int width, int height, int elapsed) {
            Log.d("mkmk1017", "onFirstRemoteVideoFrame");
            super.onFirstRemoteVideoFrame(uid, width, height, elapsed);
        }

        @Override
        public void onRemoteEnableVideo(int uid, boolean enabled) {
            Log.d("mkmk1018", "onRemoteEnableVideo");
            super.onRemoteEnableVideo(uid, enabled);
        }

        @Override
        public void onRemoteMuteAudio(int uid, boolean muted) {
            Log.d("mkmk1019", "onRemoteMuteAudio");
            super.onRemoteMuteAudio(uid, muted);
        }

        @Override
        public void onRemoteOffline(int uid) {
            Log.d("mkmk1020", "onRemoteOffline");
            super.onRemoteOffline(uid);
        }

        @Override
        public void onVideoSizeChanged(int uid, int width, int height, int rotation) {
            Log.d("mkmk1021", "onVideoSizeChanged");
            super.onVideoSizeChanged(uid, width, height, rotation);
        }



        @WorkerThread
        public void onConnected(@Nullable String channel, int uid, int elapsed) {
            Log.d("mkmk11", "CALL_CONNECTED_EVENT");
            WritableMap params = Arguments.createMap();
            params.putString(EVENT_KEY, CALL_CONNECTED_EVENT);
            sendEvent(currentModuleReactContext, CALL_EVENTS, params);
        }

        @WorkerThread
        public void onError(int errorCode) {
            Log.d("mkmk22", "CALL_CONNECTION_ERROR_EVENT");
            WritableMap params = Arguments.createMap();
            params.putString(EVENT_KEY, CALL_CONNECTION_ERROR_EVENT);
            sendEvent(currentModuleReactContext, CALL_EVENTS, params);
        }

        @WorkerThread
        public void onDisconnected(@Nullable CallStats stats) {
            Log.d("mkmk33", "CALL_DISCONNECTED_EVENT");
            WritableMap params = Arguments.createMap();
            params.putString(EVENT_KEY, CALL_DISCONNECTED_EVENT);
            sendEvent(currentModuleReactContext, CALL_EVENTS, params);
        }

        public void onConnectionInterrupted() {
            Log.d("mkmk44", "CALL_INTERRUPTED_EVENT");
            WritableMap params = Arguments.createMap();
            params.putString(EVENT_KEY, CALL_INTERRUPTED_EVENT);
            sendEvent(currentModuleReactContext, CALL_EVENTS, params);
        }

        @WorkerThread
        public void onReConnected(@Nullable String callIdentifier, int uid, int elapsed) {
            Log.d("mkmk55", "CALL_RECONNECTED_EVENT");
            WritableMap params = Arguments.createMap();
            params.putString(EVENT_KEY, CALL_RECONNECTED_EVENT);
            sendEvent(currentModuleReactContext, CALL_EVENTS, params);
        }

        public void onRemoteConnected(int uid, int elapsed) {
            Log.d("mkmk66", "CALL_REMOTE_CONNECTED_EVENT");
            WritableMap params = Arguments.createMap();
            params.putString(EVENT_KEY, CALL_REMOTE_CONNECTED_EVENT);
            sendEvent(currentModuleReactContext, CALL_EVENTS, params);
        }

        @WorkerThread
        public void onFirstRemoteVideoDecoded(int uid, int width, int height, int elapsed) {
            Log.d("mkmk77", "CALL_FIRST_VIDEO_DECODED_EVENT");
            updateVideoViewState();
        }

        public void onFirstLocalVideoFrame(int width, int height, int elapsed) {
            Log.d("mkmk88", "here");
            super.onFirstLocalVideoFrame(width, height, elapsed);
        }

        public void onRemoteMuteVideo(int uid, boolean muted) {
            Log.d("mkmk99", "CALL_REMOTE_VIDEO_MUTE_EVENT");
            WritableMap params = Arguments.createMap();
            params.putString(EVENT_KEY, CALL_REMOTE_VIDEO_MUTE_EVENT);
            sendEvent(currentModuleReactContext, CALL_EVENTS, params);
        }
    });

    private void sendEvent(ReactContext reactContext,
                           String eventName,
                           @androidx.annotation.Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }
}
