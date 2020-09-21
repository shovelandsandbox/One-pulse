//
//  MaduraRN.swift
//  HealthCareApp
//
//  Created by Vivek Kumar Singh on 16/01/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

import Foundation
import madura
import PromiseKit
import UIKit
class MaduraRN {
  public static let shared = MaduraRN()
  var maduraModule : MaduraModuleProtocol?
  var callService: CallRTCServiceProtocol!
  var callRequest : CallRTCRequest?
  var callConfig : NSDictionary = [:]
  init(){
    
  }
  var isViewPresented = false
  var remoteView : UIView = UIView()
  var localView : UIView = UIView()
  var isSpeakerOn = false
  var isMicOn = true
  private var isVideoViewsAvailable : Bool = false
  
  public func getRemoteView()->UIView {
    return self.remoteView
  }
  
  public func setRemoteView(remoteView:UIView) {
    self.remoteView = remoteView
  }
  
  public func getLocalView()->UIView {
    return self.localView
  }
  
  public func setLocalView(localView:UIView) {
    self.localView = localView
  }
  
  public func getIsVideoViewsAvailable()->Bool {
    return self.isVideoViewsAvailable
  }
  
  public func setIsVideoViewsAvailable(videoViewAvailability:Bool){
    self.isVideoViewsAvailable = videoViewAvailability
  }
  
  func initMadura(_ details:NSDictionary,_ promise:RCTPromiseResolveBlock)  {
    DispatchQueue.main.async {
      let callConfig = details.getDictionary(key: "call_config")
      if(callConfig.allKeys.count > 4){
        self.callConfig = details.getDictionary(key: "call_config")
      }
      #if DEBUG
      self.maduraModule = MaduraModule(setDebugMode:true)
      #else
      self.maduraModule = MaduraModule(setDebugMode:false)
      #endif
    }
    promise([Constants.NATIVE_CALL_SUCCESS])
    
  }
  
  func setupMaduraCallService(_ promise:RCTPromiseResolveBlock,_ details:NSDictionary)  {
    let callConfig = CallConfig(appKey: self.callConfig.getString(key: "call_sdk_app_id"))
    let result = MaduraRN.shared.maduraModule!.createCallService(callConfig: callConfig)
    switch result {
    case .fulfilled(let callService):
      callService.speaker(true) // By default turn on speaker for testing
      self.callService = callService
      print("Native Madura Module Setup call service success")
      DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
        EventEmitter.shared.send(Constants.CALL_EVENTS, [Constants.MADURA_EVENT_KEY:"CallServiceInitialized"])
      }
      promise([Constants.NATIVE_CALL_SUCCESS])
    case .rejected(let error):
      promise([Constants.NATIVE_CALL_FAILURE])
      print("createCallService failed - \(error)")
    }
    
  }
  
  func setupMaduraChatService(_ promise:RCTPromiseResolveBlock)  {
    //let chatServiceDelegate: ChatServiceDelegate = self
    //    let chatService: ChatServiceProtocol = MaduraRN.shared.maduraModule?.createChatService(delegate: chatServiceDelegate)
  }
  
  func setupCallRequest(_ details:NSDictionary,_ promise:@escaping RCTPromiseResolveBlock)  {
    let chatRoomId = details.getString(key: Constants.CHAT_ROOM_ID)
    let callRoomId = details.getString(key:Constants.CALL_ROOM_ID)
    let callUserId = details.getString(key:Constants.CALL_USER_ID)
    let callUserToken = details.getString(key:Constants.CALL_USER_TOKERN)
    let consultationId = details.getString(key:Constants.CONSULTATION_ID)
    let incoming = details.getBool(key:Constants.INCOMING_OUTGOING)
    let callType = details.getString(key:Constants.CALL_TYPE)
    let halodocUserAccessToken = details.getString(key:Constants.HALODOC_ACCESS_TOKEN)
    let callMode : CallRTCMode!
    if(callType == "VIDEO"){
      callMode = .video
    }else{
      callMode = .audio
    }
    let callRequest = CallRTCRequest(uid: callUserId, token: callUserToken, id: callRoomId, name: "Name", avatar: "", callMode: callMode, callType: .outgoing)
    MaduraRN.shared.callRequest = callRequest
    //    promise([Constants.NATIVE_CALL_SUCCESS])
    if(!MaduraRN.shared.callService!.isCallOnGoing()) {
      promise([Constants.NATIVE_CALL_SUCCESS])
    }else{
      promise([Constants.NATIVE_CALL_FAILURE])
    }
  }

func chatServiceLogin(_ details:NSDictionary,_ promise:RCTPromiseResolveBlock)  {
  let chatRoomId = details.getString(key: Constants.CHAT_ROOM_ID)
  let callRoomId = details.getString(key:Constants.CALL_ROOM_ID)
  let callUserId = details.getString(key:Constants.CALL_USER_ID)
  let callUserToken = details.getString(key:Constants.CALL_USER_TOKERN)
  let consultationId = details.getString(key:Constants.CONSULTATION_ID)
  let incoming = details.getBool(key:Constants.INCOMING_OUTGOING)
  let callType = details.getString(key:Constants.CALL_TYPE)
  let halodocUserAccessToken = details.getString(key:Constants.HALODOC_ACCESS_TOKEN)
  //    let chatConfig: ChatConfig = ChatConfig(appID: "chat_app_id", deviceToken: "device_apns_token", baseURL: "use_chat_sdk_api_url", mqttURL: "use_chat_sdk_mqtt_url", mqttPort: "use_chat_sdk_mqtt_port", partnerAppToken: "use_partner_app_token", userAccessToken: "use_user_access_token")
  //    let chatConfigDelegate: ChatConfigDelegate = self
  //    let loginStatus: Promise<Bool> = chatService.logIn(config:chatConfig, configDelegate:chatConfigDelegate)
}

func joinCall(_ data:NSDictionary, _ promise:@escaping RCTPromiseResolveBlock) {
  if let callService = MaduraRN.shared.callService, let callRequest = MaduraRN.shared.callRequest{
    callService.speaker(true)
    if callRequest.mode == .video {
      callService.setupVideo(localView: MaduraRN.shared.localView, remoteView: MaduraRN.shared.remoteView)
      EventEmitter.shared.send(Constants.CALL_EVENTS, [Constants.MADURA_EVENT_KEY:"UpdatedVideoViews"])
    }
    callService.joinCall(request: callRequest, delegate: self).done { (joinCallStatus) in
      print("Join call status - \(joinCallStatus)")
      if(joinCallStatus){
//        promise([Constants.NATIVE_CALL_SUCCESS])
      }else{
//        promise([Constants.NATIVE_CALL_SUCCESS])
      }
      }.catch { (error) in
        print("Join call failed - \(error)")
//        promise([Constants.NATIVE_CALL_FAILURE])
    }
    promise([Constants.NATIVE_CALL_SUCCESS])
  }else{
    promise([Constants.NATIVE_CALL_FAILURE])
  }
}

func leaveCall(_ promise:RCTPromiseResolveBlock) {
      DispatchQueue.main.async {
        if let callService = MaduraRN.shared.callService{
          callService.leaveCall()
        }
        MaduraRN.shared.remoteView.removeFromSuperview()
        MaduraRN.shared.localView.removeFromSuperview()
      }
      promise([Constants.NATIVE_CALL_SUCCESS])
}
func toggleSpeaker(_ promise:RCTPromiseResolveBlock)  {
  if let callService = MaduraRN.shared.callService{
    callService.speaker(!MaduraRN.shared.isSpeakerOn)
  }
  MaduraRN.shared.isSpeakerOn = !MaduraRN.shared.isSpeakerOn
  promise(MaduraRN.shared.isSpeakerOn)
}
  
func switchCamera(_ promise:RCTPromiseResolveBlock) {
  if let callService = MaduraRN.shared.callService{
    callService.toggleCamera()
  }
}

func toggleMic(_ promise:RCTPromiseResolveBlock)  {
  if let callService = MaduraRN.shared.callService{
    callService.microphone(!MaduraRN.shared.isMicOn)
  }
  MaduraRN.shared.isMicOn = !MaduraRN.shared.isMicOn
  promise(MaduraRN.shared.isMicOn)
}
  
func destroyMaduraSetup(_ promise:RCTPromiseResolveBlock)  {
      if let callService = MaduraRN.shared.callService{
        DispatchQueue.main.async {
          callService.leaveCall()
          MaduraRN.shared.remoteView.removeFromSuperview()
          MaduraRN.shared.localView.removeFromSuperview()
        }
      }
      promise([Constants.NATIVE_CALL_SUCCESS])
}



}
extension MaduraRN:CallRTCDelegate{
  func joinedCallByRemoteUser() {
    EventEmitter.shared.send(Constants.CALL_EVENTS, [Constants.MADURA_EVENT_KEY:"CallRemoteConnected"])
    
    
  }
  
  func addViewToWidow(){
    if let window = UIApplication.shared.keyWindow{
      remoteView.frame = window.frame
      window.addSubview(remoteView)
      localView.frame = CGRect(x: 0, y: 0, width: 300, height: 300)
      window.addSubview(localView)
    }
  }
  
  func rejoinedCall() {
    EventEmitter.shared.send(Constants.CALL_EVENTS, [Constants.MADURA_EVENT_KEY:"CallReJoined"])
  }
  
  func connectionLost(reason: CallRTCConnectionLostReason) {
    EventEmitter.shared.send(Constants.CALL_EVENTS, [Constants.MADURA_EVENT_KEY:"CallDisconnected"])
  }
  
  
  func leftChannel() {
    EventEmitter.shared.send(Constants.CALL_EVENTS, [Constants.MADURA_EVENT_KEY:"CallEnded"])
  }
  
  func didPauseVideo(doctorVideoPaused: Bool) {
    
  }
}
extension MaduraRN:ChatServiceDelegate{
  func changeObserved(inRoom room: ChatRoom) {
    
  }
  
  func messageReceived(_ message: MessageData, inRoom room: ChatRoom) {
    
  }
  
  func participant(_ participant: ChatRoomParticipant, didChangeStatus status: ChatRoomParticipantStatus) {
    
  }
  
  func message(_ message: MessageData, didChangeStatus status: ChatMessageDeliveryStatus) {
    
  }
  
  func typingEventReceived(_ isTyping: Bool, forRoomId roomId: String) {
    
  }
  
  
}
