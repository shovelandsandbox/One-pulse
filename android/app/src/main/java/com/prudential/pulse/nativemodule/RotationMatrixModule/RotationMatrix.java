package com.prudential.pulse.nativemodule.RotationMatrixModule;

import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.IllegalViewOperationException;

import java.util.ArrayList;
import java.util.List;

import static android.content.Context.SENSOR_SERVICE;

public class RotationMatrix extends ReactContextBaseJavaModule {
    private float[] mAccelerometerValues = new float[3];
    private float[] mMagneticFieldValues = new float[3];
    private float[] mValues = new float[3];
    private float[] mMatrix = new float[9];
    private List<Float> list = new ArrayList<>();

    public RotationMatrix(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "getRotationMatrix";
    }

    @ReactMethod
    public void getRotation(Callback errorCallback, Callback successCallback) {
        SensorManager mSensorManager = (SensorManager) getReactApplicationContext().getSystemService(SENSOR_SERVICE);
        Sensor mAccelerometer = mSensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER);
        Sensor mMagneticField = mSensorManager.getDefaultSensor(Sensor.TYPE_MAGNETIC_FIELD);
        mSensorManager.registerListener(myListener, mAccelerometer, SensorManager.SENSOR_DELAY_NORMAL);
        mSensorManager.registerListener(myListener, mMagneticField, SensorManager.SENSOR_DELAY_NORMAL);

        try {
            if (list.size() > 0) {
                for (int i = 0; i < list.size(); i++) {
                    successCallback.invoke(list.get(i));
                    list.clear();
                }
            }
        } catch (IllegalViewOperationException e) {
            errorCallback.invoke(e.getMessage());
        }
    }

    final SensorEventListener myListener = new SensorEventListener() {
        @Override
        public void onSensorChanged(SensorEvent event) {

            if (event.sensor.getType() == Sensor.TYPE_ACCELEROMETER) {
                mAccelerometerValues = event.values;
            }
            if (event.sensor.getType() == Sensor.TYPE_MAGNETIC_FIELD) {
                mMagneticFieldValues = event.values;
            }
            //调用getRotaionMatrix获得变换矩阵mMatrix[]
            SensorManager.getRotationMatrix(mMatrix, null, mAccelerometerValues, mMagneticFieldValues);
            SensorManager.getOrientation(mMatrix, mValues);
            //经过SensorManager.getOrientation(R, values);得到的values值为弧度
            //values[0]  ：azimuth 方向角，但用（磁场+加速度）得到的数据范围是（-180～180）,也就是说，0表示正北，90表示正东，180/-180表示正南，-90表示正西。
            // 而直接通过方向感应器数据范围是（0～359）360/0表示正北，90表示正东，180表示正南，270表示正西。
            float degree = (float) Math.toDegrees(mValues[0]);
            Log.e("QQQQQQQQQQQQQ", String.valueOf(degree));
            list.add(degree);
        }

        @Override
        public void onAccuracyChanged(Sensor sensor, int accuracy) {

        }
    };

}
