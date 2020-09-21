//
//  VideoCallView.swift
//  HealthCareApp
//
//  Created by Vivek Kumar Singh on 16/01/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

import Foundation
import UtilityKit
@objc(VideoCallView) class VideoCallView: UIView {
  public static let REMOTE = "remote"
  public static let LOCAL = "local"
  @objc var viewType: String = ""
  
  override init(frame: CGRect) {
    super.init(frame: frame)
    MaduraRN.shared.localView.backgroundColor = UIColor.clear
    MaduraRN.shared.remoteView.backgroundColor = UIColor.clear
    if let window = UIApplication.shared.keyWindow{
      let width = window.bounds.width
      let height = window.bounds.height
      if(MaduraRN.shared.isViewPresented == false){
        self.frame = CGRect(x: 0, y:0, width: 100, height: 100)
        //        MaduraRN.shared.localView.frame = CGRect(x: 0, y: 0, width: 50, height: 50)
        MaduraRN.shared.localView.frame = CGRect(x: 0, y: 0, width: 100, height: 100)
        self.addSubview(MaduraRN.shared.localView)
        MaduraRN.shared.isViewPresented = true
      }else{
        self.frame = CGRect(x: 0, y: 0, width: width, height: height)
        MaduraRN.shared.remoteView.frame = CGRect(x:  -(width*0.71), y:  -(height*0.67), width:window.bounds.width+(width*0.2) , height: window.bounds.height+height*0.2)
        //        MaduraRN.shared.remoteView.frame = CGRect(x:  0, y:  0, width: 500, height: 500)
        self.addSubview(MaduraRN.shared.remoteView)
        MaduraRN.shared.localView.frame = CGRect(x: 0, y: 0, width: 100, height: 100)
        self.addSubview(MaduraRN.shared.localView)
        MaduraRN.shared.isViewPresented = false
      }
    }
    MaduraRN.shared.localView.layer.cornerRadius = 8
  }
  
  
  //  override init(frame: CGRect) {
  //    super.init(frame: frame)
  //    if let window = UIApplication.shared.keyWindow{
  //      self.frame = CGRect(x:-window.bounds.width*2,y:window.bounds.height*2,width:window.bounds.width*2,height:window.bounds.height*2)
  //      self.backgroundColor = UIColor.green
  //      MaduraRN.shared.remoteView.frame = CGRect(x:0,y:0,width:window.bounds.width,height:window.bounds.height)
  //      MaduraRN.shared.localView.frame = CGRect(x: 16, y: 16, width: 200, height: 200)
  //      MaduraRN.shared.remoteView.backgroundColor = UIColor.black
  //      MaduraRN.shared.localView.backgroundColor = UIColor.white
  //      if(!MaduraRN.shared.remoteView.isDescendant(of: self)){
  //        self.addSubview(MaduraRN.shared.remoteView)
  //        self.addSubview(MaduraRN.shared.localView)
  //      }
  //    }
  //  }
  
  required init?(coder aDecoder: NSCoder) {
    super.init(coder: aDecoder)
    
  }
  //  override func layoutSubviews() {
  //    super.layoutSubviews()
  //    if let windowFrame = UIApplication.shared.keyWindow?.frame{
  //      self.frame = windowFrame
  //      MaduraRN.shared.remoteView.frame = windowFrame
  //      MaduraRN.shared.localView.frame = CGRect(x: 16, y: 16, width: 200, height: 200)
  //      self.addSubview(MaduraRN.shared.remoteView)
  //      self.addSubview(MaduraRN.shared.localView)
  //    }
  //  }
  
  
  
  @objc func updateVideoCallView(viewType:String) {
    DispatchQueue.main.async {
      MaduraRN.shared.localView.removeFromSuperview()
    }
    
    switch(viewType) {
    case VideoCallView.REMOTE:
      self.addSubview(MaduraRN.shared.getRemoteView())
      print("mkmk", "added remote view");
      break;
    case VideoCallView.LOCAL:
      self.addSubview(MaduraRN.shared.getLocalView())
      print("mkmk", "added local view")
    default:
      break;
    }
  }
}
