package com.prudential.pulse.nativemodule.maduramodule;

import android.os.Bundle;
import com.halodoc.madura.core.call.models.ActionType;
import com.halodoc.madura.core.call.protocols.ActionExecutorProtocol;
import com.halodoc.madura.core.call.protocols.ActionExecutorProtocol.Callback;
import kotlin.jvm.internal.Intrinsics;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

public final class CallActionExecutor implements ActionExecutorProtocol {
   public void executeAsync(@NotNull ActionType actionType, @Nullable Bundle data, @NotNull Callback callback) {
      if (actionType == ActionType.SEND_HEART_BEAT) {
         Object var10000;
         if (data != null) {
            data.getString("consultation_id");
         } else {
            var10000 = null;
         }

         if (data != null) {
            data.getString("room_id");
         } else {
            var10000 = null;
         }
      }

   }

   @Nullable
   public Object execute(@NotNull ActionType actionType, @Nullable Bundle data) {
      Intrinsics.checkParameterIsNotNull(actionType, "actionType");
      return actionType == ActionType.CLOSE_ROOM ? (Object)true : new Object();
   }
}
