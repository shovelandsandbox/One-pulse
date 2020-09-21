package com.prudential.pulse.nativemodule.maduramodule;

import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.prudential.pulse.nativemodule.maduramodule.VideoCallView;

public class VideoCallViewManager extends ViewGroupManager<VideoCallView> {
    @Override
    public String getName() {

        return "VideoCallView";
    }

    @Override
    protected VideoCallView createViewInstance(ThemedReactContext reactContext) {

        return new VideoCallView(reactContext);
    }

    @ReactProp(name = "viewType")
    public void updateVideoCallViews(VideoCallView view, String viewType) {

        view.updateVideoCallView(viewType);
    }

}
