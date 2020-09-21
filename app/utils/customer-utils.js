import { forEachObjIndexed, isNil, path, pick, pickBy } from "ramda";

export const parseCustomerDetailsAPIResponse = response => {
  const responseBody = response.body;
  const keysToPick = [
    "id",
    "status",
    "externalIds",
    "firstName",
    "surName",
    "middleName",
    "dob",
    "documents",
    "contactDetails",
    "sex",
    "addressDetails",
    "termsConditions"
  ];
  const personalInfo = pick(keysToPick, responseBody);
  personalInfo.addressDetails = {};
  personalInfo.gender = responseBody.sex;
  const valNotNilFilter = val => !isNil(val);
  forEachObjIndexed(
    (val, key) =>
      (personalInfo.addressDetails[key] = pickBy(valNotNilFilter, val)),
    responseBody.addressDetails
  );
  return personalInfo;
};

export const structureCustomer = responseBody => {
  return {
    id: responseBody.id,
    email: path(["contactDetails", "email", "value"], responseBody),
    firstName: responseBody.firstName ? responseBody.firstName : "",
    surName: responseBody.surName ? responseBody.surName : "",
    countryCode: path(
      ["addressDetails", "address", "countryCode"],
      responseBody
    ),
    dob: responseBody.dob,
    profilePicture: "",
    gender: responseBody.sex,
    phone: path(["contactDetails", "phone", "value"], responseBody),
    device: path(["contactDetails", "device", "value"], responseBody),
    userLanguage: path(
      ["preferences", "preferredLanguage", "value"],
      responseBody
    ),
    documents: path(["documents"], responseBody),
    address1: path(["addressDetails", "address", "line1"], responseBody),
    address2: path(["addressDetails", "address", "city"], responseBody),
    address3: path(["addressDetails", "address", "zipcode"], responseBody),
    termsConditions: path(["termsConditions"], responseBody),
    externalIds: path(["externalIds"], responseBody)
  };
};

export const makeCustomerObject = state => {
  const { profile = {} } = state;
  const userProfile = {
    firstName: profile.firstName,
    surName: profile.surName,
    sex: profile.gender || "",
    addressDetails: {
      address: {
        line1: profile.address1 || "",
      },
    },
    contactDetails: {
      phone: {
        channel: "PHONE",
        value: profile.phone || "",
      },
      email: {
        channel: "EMAIL",
        value: profile.email || "",
      }
    },
    externalIds: {
      NATIONAL_ID: path(["externalIds", "NATIONAL_ID"], profile),
    },
    dob: profile.dob || "",
  };
  return userProfile;
};