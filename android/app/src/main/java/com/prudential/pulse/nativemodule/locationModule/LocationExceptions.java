package com.prudential.pulse.nativemodule.locationModule;

public class LocationExceptions extends Exception {
    public LocationExceptions(String detailMessage, Throwable throwable) {
        super(detailMessage, throwable);
    }

    public LocationExceptions(String detailMessage) {
        super(detailMessage);
    }
}