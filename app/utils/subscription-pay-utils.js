import { Platform } from "react-native";
import RNIap, {
  InAppPurchase,
  PurchaseError,
  SubscriptionPurchase,
  acknowledgePurchaseAndroid,
  consumePurchaseAndroid,
  finishTransaction,
  finishTransactionIOS,
  purchaseErrorListener,
  purchaseUpdatedListener,
} from "react-native-iap";

let purchaseUpdateSubscription;
let purchaseErrorSubscription;

const initilizeIAPConnection = async () => {
  try {
    const isConnected = await RNIap.initConnection();
    return isConnected;
  } catch (error) {
    return false;
  }
};

export const initiatePaymentListener = async () => {
  const successOnPurchase = new Promise((resolve, reject) => {
    purchaseUpdateSubscription = purchaseUpdatedListener(async purchase => {
      // return new Promise((resolve, reject) => {
      const receipt = purchase.transactionReceipt;
      if (receipt) {
        console.log(receipt);
        try {
          if (Platform.OS === "ios") {
            finishTransactionIOS(purchase.transactionId);
          } else if (Platform.OS === "android") {
            // If consumable (can be purchased again)
            // consumePurchaseAndroid(purchase.purchaseToken);
            // If not consumable
            await acknowledgePurchaseAndroid(purchase.purchaseToken);
          }

          const ackResult = await finishTransaction(purchase);
          console.log("ackResult success=>", ackResult);
          console.log("transaction success=>", purchase);
          resolve(purchase);
        } catch (ackErr) {
          reject({ ackErr: ackErr });
          console.log("ackErr");
        }
      }
    });
  });
  const errorOnPurchase = new Promise((resolve, reject) => {
    purchaseErrorSubscription = purchaseErrorListener(error => {
      console.log("purchaseErrorListener", error);
      console.log("transaction error", JSON.stringify(error));
      reject(error);
      // return purchaseErrorSubscription;
    });
  });
  //   console.log("successOnPurchase",);
  return Promise.race([successOnPurchase, errorOnPurchase]);
};

export const getSubscriptions = async itemSubs => {
  try {
    const products = await RNIap.getSubscriptions(itemSubs);
    console.log("Products subs", products, itemSubs);
    // const productssku = await RNIap.getSubscriptions(itemSkus);
    // console.log('productSsku subs', productssku);
    return products;
  } catch (err) {
    console.warn(err.code, err.message);
    return err;
  }
};

export const buySubscription = async sku => {
  try {
    const itemSubs = [];
    itemSubs.push(sku);
    //Initiate Payment
    const isConnected = await initilizeIAPConnection();
    if (!isConnected) {
      return Promise.reject({
        message: "not connected or got error while connecting",
      });
    }
    //Get Subscription
    const products = await RNIap.getSubscriptions(itemSubs);
    console.log("Products subs", products, itemSubs);
    //Request Subscription
    RNIap.requestSubscription(sku);
    return new Promise((resolve, reject) => {
      initiatePaymentListener()
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        })
        .finally(() => {
          removePurchaseListner();
        });
    });
  } catch (err) {
    console.log("buySubscription Error ", err.message);
  }
};

export const removePurchaseListner = () => {
  RNIap.endConnection();
  if (purchaseUpdateSubscription) {
    purchaseUpdateSubscription.remove();
    purchaseUpdateSubscription = null;
  }
  if (purchaseErrorSubscription) {
    purchaseErrorSubscription.remove();
    purchaseErrorSubscription = null;
  }
};

export const getPurchasedProduct = async productId => {
  const isConnected = await initilizeIAPConnection();
  if (!isConnected) {
    return Promise.reject({
      message: "not connected or got error while connecting",
    });
  }
  try {
    const availableProducts = await RNIap.getAvailablePurchases();
    const availableProduct = availableProducts.find(
      d => d.productId == productId
    );
    return Promise.resolve(availableProduct);
  } catch (err) {
    return Promise.reject(err);
  }
};