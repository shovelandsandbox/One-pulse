# Add project specific ProGuard rules here.
# You can control the set of applied configuration files using the
# proguardFiles setting in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# If your project uses WebView with JS, uncomment the following
# and specify the fully qualified class name to the JavaScript interface
# class:
#-keepclassmembers class fqcn.of.javascript.interface.for.webview {
#   public *;
#}

# Uncomment this to preserve the line number information for
# debugging stack traces.
#-keepattributes SourceFile,LineNumberTable

# If you keep the line number information, uncomment this to
# hide the original source file name.
#-renamesourcefileattribute SourceFile

-verbose

-keepnames class java.nio.file.Files { *; }

-dontwarn org.andengine.**
-dontwarn org.hibernate.**
-dontwarn org.jboss.**
-dontwarn org.jboss.**
-dontwarn org.slf4j.**

-keep class com.shephertz.** { *; }

-keep class org.json.**

# Retrofit
-dontwarn retrofit2.**
-dontwarn org.codehaus.mojo.**
-keep class retrofit2.** { *; }
-keepattributes Exceptions

-keepattributes RuntimeVisibleAnnotations
-keepattributes RuntimeInvisibleAnnotations
-keepattributes RuntimeVisibleParameterAnnotations
-keepattributes RuntimeInvisibleParameterAnnotations

-keepattributes EnclosingMethod

-keepclasseswithmembers class * {
    @retrofit2.* <methods>;
}
-keepclasseswithmembers interface * {
    @retrofit2.* <methods>;
}

# Jackson
-keepattributes *Annotation*,EnclosingMethod,Signature

-keepattributes InnerClasses

# Annotations
-keep public interface com.google.common.base.FinalizableReference { void finalizeReferent(); }
# Missing annotations are harmless.
-dontwarn sun.misc.Unsafe
-dontwarn javax.annotation.**

-keep public interface com.google.common.base.FinalizableReference { void finalizeReferent(); }


#Specific method signatures.
-keepclasseswithmembernames class * {
    public <init>(android.content.Context, android.util.AttributeSet);
}

-keepclasseswithmembernames class * {
    public <init>(android.content.Context, android.util.AttributeSet, int);
}

-keep public class com.google.android.gms.* { public *; }
-dontwarn com.google.android.gms.**

-keep public class com.babylon.* { public *;}
-dontwarn com.babylon.**

# SoLoader
-keep class com.facebook.soloader.** { *; }
-keepclassmembers class com.facebook.soloader.SoLoader {
     static <fields>;
}

-keep,includedescriptorclasses class com.facebook.react.bridge.CatalystInstanceImpl { *; }
-keep,includedescriptorclasses class com.facebook.react.bridge.JavaScriptExecutor { *; }
-keep,includedescriptorclasses class com.facebook.react.bridge.queue.NativeRunnable { *; }
-keep,includedescriptorclasses class com.facebook.react.bridge.ExecutorToken { *; }
-keep,includedescriptorclasses class com.facebook.react.bridge.ReadableType { *; }

-dontnote com.facebook.**

-keep class com.facebook.react.devsupport.** { *; }
-dontwarn com.facebook.react.devsupport.**
-dontwarn com.facebook.react.**

-keep public class com.google.firebase.* { public *;}
-dontwarn com.google.firebase.**

-keep public class dagger.android.* { public *;}
-dontwarn dagger.android.**


# Obfuscation rules for gson library

-keep,allowobfuscation @interface com.google.gson.annotations.*
-dontnote com.google.gson.annotations.Expose
-keepclassmembers class * {
    @com.google.gson.annotations.Expose <fields>;
}

-keepclasseswithmembers,allowobfuscation,includedescriptorclasses class * {
    @com.google.gson.annotations.Expose <fields>;
}

-dontnote com.google.gson.annotations.SerializedName
-keepclasseswithmembers,allowobfuscation,includedescriptorclasses class * {
    @com.google.gson.annotations.SerializedName <fields>;
}

-keepclassmembers enum * { *; }

# Gson uses generic type information stored in a class file when working with fields. Proguard removes such information
# by default, so configure it to keep all of it.
-keepattributes Signature

# For using GSON @Expose annotation
-keepattributes *Annotation*

# Prevent proguard from stripping interface information from TypeAdapterFactory,
# JsonSerializer, JsonDeserializer instances (so they can be used in @JsonAdapter)
-keep class * implements com.google.gson.TypeAdapterFactory
-keep class * implements com.google.gson.JsonSerializer
-keep class * implements com.google.gson.JsonDeserializer

-keep public class com.google.firebase.* { public *; }
-dontwarn com.google.firebase.**

-keep public class com.google.android.gms.* { public *; }
-dontwarn com.google.android.gms.**

# if using notifications from RNFirebase
-keep public class me.leolin.shortcutbadger.* { public *; }
-dontwarn me.leolin.shortcutbadger.**

-keep class com.opentok.** { *; }
-dontwarn com.opentok.** 

-keep class org.webrtc.** { *;}
-dontwarn org.webrtc.** 

-keep class com.halodoc.qchat.** { *; }
-keepclassmembers class com.halodoc.qchat.** { *; }
-dontwarn com.halodoc.qchat.**

-keep class com.halodoc.madura.** { *; }
-keepclassmembers class com.halodoc.madura.** { *; }
-dontwarn com.halodoc.madura.**

-keep class com.halodoc.agorartc.** { *; }
-keepclassmembers class com.halodoc.agorartc.* { *; }
-dontwarn com.halodoc.agorartc.**

-keep class io.agora.rtc.** { *; }
-keepclassmembers class io.agora.rtc.** { *; }
-dontwarn io.agora.rtc.**

-keep class com.prudential.pulse.BuildConfig { *; }

-keep class tvi.webrtc.** { *;}
-keep class com.twilio.** { *; }
-keep public class com.dylanvann.fastimage.* {*;}
-keep public class com.dylanvann.fastimage.** {*;}
-keep public class * implements com.bumptech.glide.module.GlideModule
-keep public class * extends com.bumptech.glide.module.AppGlideModule
-keep public enum com.bumptech.glide.load.ImageHeaderParser$** {
  **[] $VALUES;
  public *;
}
-keep class cn.nodemedia.** {*; }
