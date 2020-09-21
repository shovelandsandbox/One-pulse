import UIKit

enum BroadcastError: Error {
  case detailsMissing
  case serverError
}

extension BroadcastError: LocalizedError {
  public var errorDescription: String? {
    switch self {
    case .detailsMissing:
      return NSLocalizedString("Call Details Are Missing", comment: "Call Details Missing")
    case .serverError:
      return NSLocalizedString("Server Error", comment: "Server Error")
    }
  }
}
