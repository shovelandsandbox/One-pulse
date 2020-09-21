package com.prudential.pulse.nativemodule.maduramodule;

import android.view.SurfaceView;

public class MaduraRN {

    public static MaduraRN sharedState;
    private SurfaceView remoteView;
    private SurfaceView localView;
    private boolean isVideoViewsAvailable;

    public static synchronized MaduraRN getSharedState() {

        if (sharedState == null) {
            sharedState = new MaduraRN();
        }
        return sharedState;
    }

    public SurfaceView getRemoteView() {
        return this.remoteView;
    }

    public void setRemoteView(SurfaceView remoteView) {
        this.remoteView = remoteView;
    }

    public SurfaceView getLocalView() {
        return this.localView;
    }

    public void setLocalView(SurfaceView localView) {
        this.localView = localView;
    }

    public boolean getIsVideoViewsAvailable() {
        return this.isVideoViewsAvailable;
    }

    public synchronized void setIsVideoViewsAvailable(boolean videoViewAvailability) {
        this.isVideoViewsAvailable = videoViewAvailability;
    }

    private MaduraRN() {}

}
