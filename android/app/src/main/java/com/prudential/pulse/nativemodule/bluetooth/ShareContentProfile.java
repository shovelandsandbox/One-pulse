package com.prudential.pulse.nativemodule.bluetooth;

import android.bluetooth.BluetoothGattCharacteristic;
import android.bluetooth.BluetoothGattDescriptor;
import android.bluetooth.BluetoothGattService;

import java.util.UUID;

public class ShareContentProfile {

    private static final String TAG = ShareContentProfile.class.getSimpleName();

    /* Service UUID */
    public static final UUID SHARE_ID_SERVICE = UUID.fromString("00001805-0000-1000-8000-00805f9b34fb");
    /* ID Characteristic */
    public static final UUID ID_CHARACTERISTIC = UUID.fromString("00002a2b-0000-1000-8000-00805f9b34fb");

    /* Mandatory Client Characteristic Config Descriptor */
    public static final UUID CLIENT_CONFIG = UUID.fromString("00002902-0000-1000-8000-00805f9b34fb");

    /**
     * Return a configured {@link BluetoothGattService} instance for the sharing payload.
     */
    public static BluetoothGattService createShareContentService() {
        BluetoothGattService service = new BluetoothGattService(SHARE_ID_SERVICE, BluetoothGattService.SERVICE_TYPE_PRIMARY);
        BluetoothGattCharacteristic idCharacteristic = new BluetoothGattCharacteristic(ID_CHARACTERISTIC,
                //Read-only characteristic, supports notifications
                BluetoothGattCharacteristic.PROPERTY_READ | BluetoothGattCharacteristic.PROPERTY_NOTIFY,
                BluetoothGattCharacteristic.PERMISSION_READ);

        BluetoothGattDescriptor configDescriptor = new BluetoothGattDescriptor(CLIENT_CONFIG,
                //Read/write descriptor
                BluetoothGattDescriptor.PERMISSION_READ | BluetoothGattDescriptor.PERMISSION_WRITE);
        idCharacteristic.addDescriptor(configDescriptor);
        service.addCharacteristic(idCharacteristic);
        return service;
    }
}