//
//  JailBrokenTest.swift
//  HealthCareApp
//
//  Created by Vivek Kumar on 18/11/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation
class JailBrokenTest:NSObject{
  let fileSystemPaths = ["/bin/bash",
                         "/usr/sbin/sshd",
                         "/etc/apt",
                         "/private/var/lib/apt/",
                         "/Applications/Cydia.app",
                         "/private/var/lib/cydia",
                         "/private/var/mobile/Library/SBSettings/Themes",
                         "/Library/MobileSubstrate/DynamicLibraries/LiveClock.plist",
                         "/System/Library/LaunchDaemons/com.saurik.Cydia.Startup.plist",
                         "/var/lib/apt",
                         "/Applications/SBSettings.app",
                         "/Applications/Cydia.app",
                         "/Applications/FakeCarrier.app",
                         "/Applications/Icy.app",
                         "/Applications/IntelliScreen.app",
                         "/Applications/MxTube.app",
                         "/Applications/RockApp.app",
                         "/Applications/SBSetttings.app",
                         "/Applications/WinterBoard.app",
                         "/Applications/blackra1n.app",
                         "/Library/MobileSubstrate/DynamicLibraries/Veency.plist",
                         "/Library/MobileSubstrate/MobileSubstrate.dylib",
                         "/System/Library/LaunchDaemons/com.ikey.bbot.plist",
                         "/System/Library/LaunchDaemons/com.saurik.Cy@dia.Startup.plist",
                         "/bin/bash",
                         "/bin/sh",
                         "/etc/apt",
                         "/etc/ssh/sshd_config",
                         "/private/var/stash",
                         "/private/var/tmp/cydia.log",
                         "/usr/bin/cycript",
                         "/usr/bin/ssh",
                         "/usr/bin/sshd",
                         "/usr/libexec/sftp-server",
                         "/usr/libexec/ssh-keysign",
                         "/usr/sbin/sshd",
                         "/var/cache/apt",
                         "/var/lib/cydia",
                         "/var/log/syslog",
                         "/var/tmp/cydia.log"
  ]
  
  let symbolicLinks = [
    "/Library/Ringtones",
    "/Library/Wallpaper",
    "/usr/arm-apple-darwin9",
    "/usr/include",
    "/usr/libexec",
    "/usr/share",
    "/Applications"
  ]
  
  
  @objc func completeTest() -> Bool {
    #if DEBUG
     return false
    #else
    if(runFileSystemTest()){
      return true
    }else if(runDirectoryPermissionTest()){
      return true
    }else if(runSymbolicLinkTest()){
      return true
    }else if(runSystemTest()){
      return true
    }else{
      return false
    }
    #endif
  }
  
  func runFileSystemTest() -> Bool {
    for item in self.fileSystemPaths {
      if(FileManager.default.fileExists(atPath: item)){
        return true
      }
    }
    return false
  }
  
  func runDirectoryPermissionTest() -> Bool {
    let stringToWrite = "Jailbreak Test"
    do {
      try stringToWrite.write(toFile:"/private/JailbreakTest.txt", atomically:true, encoding:String.Encoding.utf8)
      return true
    } catch {
      
    }
    return false
  }
  
  func runSymbolicLinkTest() -> Bool {
    for item in symbolicLinks{
      do {
        let node = try FileWrapper(url: URL(fileURLWithPath: item), options: .immediate)
        if(node.isSymbolicLink){
          return true
        }
      } catch{
        
      }
    }
    return false
  }
  
  func runSystemTest() -> Bool {
    let pid = ProcessInfo.processInfo.processIdentifier
    if(pid > 0){
      return false
    }else{
      return true
    }
  }
  
}
