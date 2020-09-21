import Accelerate
import TwilioVideo
import ReplayKit

// TOKEN CLASS
struct Body: Codable {
  let chatToken: String
}

struct Status: Codable {
  let code: Int
}

struct TokenResponse: Decodable {
  let status: Status
  let body: Body
}

class SampleHandler: RPBroadcastSampleHandler {
  
  // Video SDK components
  public var room: Room?
  //var audioTrack: LocalAudioTrack?
  var videoSource: ReplayKitVideoSource?
  var screenTrack: LocalVideoTrack?
  var disconnectSemaphore: DispatchSemaphore?
  // let audioDevice = ExampleReplayKitAudioCapturer(sampleType: SampleHandler.kAudioSampleType)
  
  var statsTimer: Timer?
  static let kBroadcastSetupInfoRoomNameKey = "roomName"
  
  // Which kind of audio samples we will capture. The example does not mix multiple types of samples together.
  // static let kAudioSampleType = RPSampleBufferType.audioMic
  
  // The video codec to use for the broadcast. The encoding parameters and format request are built dynamically based upon the codec.
  static let kVideoCodec = H264Codec()!
  
  override func broadcastStarted(withSetupInfo setupInfo: [String : NSObject]?) {
    
    // if let userDefaults = UserDefaults(suiteName: "group.prudential.pulse.onepulse") {
      
    //   // TwilioVideoSDK.audioDevice = self.audioDevice
      
    //   // User has requested to start the broadcast. Setup info from the UI extension can be supplied but is optional.
      
    //   // This source will attempt to produce smaller buffers with fluid motion.
    //   let options = ReplayKitVideoSource.TelecineOptions.alternateDrop
    //   let (encodingParams, outputFormat) = ReplayKitVideoSource.getParametersForUseCase(codec: SampleHandler.kVideoCodec,
    //                                                                                     isScreencast: false,
    //                                                                                     telecineOptions: options)
      
    //   videoSource = ReplayKitVideoSource(isScreencast: false, telecineOptions: options)
    //   screenTrack = LocalVideoTrack(source: videoSource!,
    //                                 enabled: true,
    //                                 name: "Screen")
      
    //   videoSource!.requestOutputFormat(outputFormat)
    //   // audioTrack = LocalAudioTrack()
      
    //   //move forward if access token is present
    //   if let roomName = userDefaults.string(forKey: "room_name"),
    //     let auth = userDefaults.string(forKey: "a_t"),
    //     let apikey = userDefaults.string(forKey: "api_key"),
    //     let apiUrl = userDefaults.string(forKey: "api_url") {
        
    //     let decoder = JSONDecoder()
        
    //     if let url = URL(string: apiUrl) {
    //       //create the request with headers
    //       var request = URLRequest(url: url)
    //       request.addValue(apikey, forHTTPHeaderField: "apikey")
    //       request.addValue(auth, forHTTPHeaderField: "Authorization")
          
    //       let task = URLSession.shared.dataTask(with: request) {
    //         data, response, error in
    //         if let json = data {
    //           do {
    //             //SCREENSHARE QUALITY
    //             let videoOptions = VideoBandwidthProfileOptions { builder in
    //                 // Minimum subscribe priority of Dominant Speaker's RemoteVideoTracks
    //                 builder.dominantSpeakerPriority = .high

    //                 // Maximum bandwidth (Kbps) to be allocated to subscribed RemoteVideoTracks
    //                 builder.maxSubscriptionBitrate = 6000

    //                 // Max number of visible RemoteVideoTracks. Other RemoteVideoTracks will be switched off
    //                 builder.maxTracks = 5

    //                 // Subscription mode: collaboration, grid, presentation
    //                 builder.mode = .presentation

    //                 // Configure remote track's render dimensions per track priority
    //                 let renderDimensions = VideoRenderDimensions()

    //                 // Desired render dimensions of RemoteVideoTracks with priority low.
    //                 renderDimensions.low = VideoDimensions(width: 352, height: 288)

    //                 // Desired render dimensions of RemoteVideoTracks with priority standard.
    //                 renderDimensions.standard = VideoDimensions(width: 640, height: 480)

    //                 // Desired render dimensions of RemoteVideoTracks with priority high.
    //                 renderDimensions.high = VideoDimensions(width: 1280, height: 720)

    //                 builder.renderDimensions = renderDimensions

    //                 // Track Switch Off mode: .detected, .predicted, .disabled
    //                 builder.trackSwitchOffMode = .predicted
    //             }
    //             let bandwidthProfileOptions = BandwidthProfileOptions(videoOptions: videoOptions)

                
                
    //             //EXTRACT TOKEN
    //             let tokenResponse = try decoder.decode(TokenResponse.self, from: json)
    //             let accessToken = tokenResponse.body.chatToken
                
    //             //ROOM CREATION
    //             let connectOptions = ConnectOptions(token: accessToken) { (builder) in
    //               //SCREENSHARE QUALITY PROFILE
    //               builder.bandwidthProfileOptions = bandwidthProfileOptions

    //               // Use the local media that we prepared earlier.
    //               // builder.audioTracks = [self.audioTrack!]
    //               builder.videoTracks = [self.screenTrack!]
                  
                  
    //               // We have observed that downscaling the input and using H.264 results in the lowest memory usage.
    //               builder.preferredVideoCodecs = [SampleHandler.kVideoCodec]
                  
    //               /*
    //                * Constrain the bitrate to improve QoS for subscribers when simulcast is not used, and to reduce overall
    //                * bandwidth usage for the broadcaster.
    //                */
    //               builder.encodingParameters = encodingParams
                  
    //               /*
    //                * A broadcast extension has no need to subscribe to Tracks, and connects as a publish-only
    //                * Participant. In a Group Room, this options saves memory and bandwidth since decoders and receivers are
    //                * no longer needed. Note that subscription events will not be raised for remote publications.
    //                */
    //               builder.isAutomaticSubscriptionEnabled = false
                  
    //               builder.roomName = roomName
    //             }
                
    //             // CONNECT TO ROOM
    //             self.room = TwilioVideoSDK.connect(options: connectOptions, delegate: self)
                
    //           } catch {
    //             self.finishBroadcastWithError(error)
    //           }
    //         } else {
    //           if let error = error {
    //             self.finishBroadcastWithError(error)
    //           }
    //         }
    //       }
    //       task.resume()
    //     }
    //   } else {
    //     let error = BroadcastError.detailsMissing;
    //     finishBroadcastWithError(error)
    //   }
    // }
    
    // // The user has requested to start the broadcast. Setup info from the UI extension can be supplied but is optional.
    // print("broadcastStartedWithSetupInfo: ", setupInfo as Any)
  }
  
  override func broadcastPaused() {
    // User has requested to pause the broadcast. Samples will stop being delivered.
    // self.audioTrack?.isEnabled = false
    self.screenTrack?.isEnabled = false
  }
  
  override func broadcastResumed() {
    // User has requested to resume the broadcast. Samples delivery will resume.
    // self.audioTrack?.isEnabled = true
    self.screenTrack?.isEnabled = true
  }
  
  override func broadcastFinished() {
    // User has requested to finish the broadcast.
    DispatchQueue.main.async {
      self.room?.disconnect()
    }
    self.disconnectSemaphore?.wait()
    DispatchQueue.main.sync {
      //self.audioTrack = nil
      self.videoSource = nil
      self.screenTrack = nil
    }
  }
  
  override func processSampleBuffer(_ sampleBuffer: CMSampleBuffer, with sampleBufferType: RPSampleBufferType) {
    if(sampleBufferType == RPSampleBufferType.video) {
      videoSource?.processFrame(sampleBuffer: sampleBuffer)
    }
  }
}

// MARK:- RoomDelegate
extension SampleHandler : RoomDelegate {
  func roomDidConnect(room: Room) {
    print("didConnectToRoom: ", room)
    
    disconnectSemaphore = DispatchSemaphore(value: 0)
    
    #if DEBUG
    statsTimer = Timer(fire: Date(timeIntervalSinceNow: 1), interval: 10, repeats: true, block: { (Timer) in
      room.getStats({ (reports: [StatsReport]) in
        for report in reports {
          let videoStats = report.localVideoTrackStats.first!
          print("Capture \(videoStats.captureDimensions) @ \(videoStats.captureFrameRate) fps.")
          print("Send \(videoStats.dimensions) @ \(videoStats.frameRate) fps. RTT = \(videoStats.roundTripTime) ms")
        }
      })
    })
    
    if let theTimer = statsTimer {
      RunLoop.main.add(theTimer, forMode: .common)
    }
    #endif
  }
  
  func roomDidFailToConnect(room: Room, error: Error) {
    print("room: ", room, " didFailToConnectWithError: ", error)
    finishBroadcastWithError(error)
  }
  
  func roomDidDisconnect(room: Room, error: Error?) {
    statsTimer?.invalidate()
    if let semaphore = self.disconnectSemaphore {
      semaphore.signal()
    }
    if let theError = error {
      print("room: ", room, "didDisconnectWithError: ", theError)
      finishBroadcastWithError(theError)
    }
  }
  
  func roomIsReconnecting(room: Room, error: Error) {
    print("Reconnecting to room \(room.name), error = \(String(describing: error))")
  }
  
  func roomDidReconnect(room: Room) {
    print("Reconnected to room \(room.name)")
  }
  
  func participantDidConnect(room: Room, participant: RemoteParticipant) {
    print("participant: ", participant.identity, " didConnect")
  }
  
  func participantDidDisconnect(room: Room, participant: RemoteParticipant) {
    print("participant: ", participant.identity, " didDisconnect")
  }
}
