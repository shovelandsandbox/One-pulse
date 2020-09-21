package com.prudential.pulse.nativemodule.maduramodule;

import android.content.Context;
import android.util.AttributeSet;
import android.util.Log;
import android.view.SurfaceView;
import android.widget.FrameLayout;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

public class VideoCallView extends FrameLayout {

    public static final String REMOTE = "remote";
    public static final String LOCAL = "local";

    MaduraRN sharedState;

    public VideoCallView(@NonNull Context context) {
        super(context);
        sharedState = MaduraRN.getSharedState();
    }

    public VideoCallView(@NonNull Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
    }

    public VideoCallView(@NonNull Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }

    public VideoCallView(@NonNull Context context, @Nullable AttributeSet attrs, int defStyleAttr, int defStyleRes) {
        super(context, attrs, defStyleAttr, defStyleRes);
    }

    public void updateVideoCallView(String viewType) {
        this.removeAllViews();
        switch(viewType) {
            case VideoCallView.REMOTE:
                this.addView(sharedState.getRemoteView());
                Log.d("mkmk", "added remote view");
                break;
            case VideoCallView.LOCAL:
                this.addView(sharedState.getLocalView());
                Log.d("mkmk", "added local view");
                break;
            default:
                break;
        }
        this.requestLayout();
    }
}
