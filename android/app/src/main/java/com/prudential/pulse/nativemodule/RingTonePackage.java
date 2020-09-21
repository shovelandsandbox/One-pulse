package com.prudential.pulse.nativemodule;

import com.facebook.react.ReactPackage;
        import com.facebook.react.bridge.JavaScriptModule;
        import com.facebook.react.bridge.NativeModule;
        import com.facebook.react.bridge.ReactApplicationContext;
        import com.facebook.react.uimanager.ViewManager;

        import java.util.ArrayList;
        import java.util.Collections;
        import java.util.List;

public class RingTonePackage implements ReactPackage {

    @Override
    public List<NativeModule> createNativeModules(
            ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();

        modules.add(new RingToneModule(reactContext));

        return modules;
    }


    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext context) {
        return Collections.emptyList();
    }
}
