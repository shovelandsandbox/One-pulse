export default {
  name: "PostRegistrationWizard",
  title: "Welcome to Pulse!",
  productInfo: {
    productCode: "S00545",
  },
  platformEvents: {
    WizardOpened: {
      type: "ScreenEvent",
      name: "pulse.postReg.wizard.opened",
    },
  },
  firebaseEvents: {
    WizardOpened: "post_reg_wizard_opened",
  },
  cards: {
    nameScreen: {
      screenId: "CardName",
      fieldName: "name",
      fields: {
        firstName: { model: "firstName", validationMetaKey: "FIRSTNAME" },
        lastName: { model: "surName", validationMetaKey: "LASTNAME" },
      },
      context: "",
      actionType: "",
      configs: {},
      firebaseEvent: "post_reg_name",
      platformEvents: {
        WizardNextPressed: {
          name: "pulse.postReg.wizard.name",
        },
        WizardSkipPressed: {
          name: "pulse.postReg.wizard.name",
        },
      },
    },
    phoneScreen: {
      screenId: "CardPhone",
      fieldName: "phone",
      fields: { phone: { model: "phone", validationMetaKey: "MOBILENUMBER" } },
      context: "",
      actionType: "",
      configs: {},
      firebaseEvent: "post_reg_phone_num",
      platformEvents: {
        WizardNextPressed: {
          name: "pulse.postReg.wizard.phone_num",
        },
        WizardSkipPressed: {
          name: "pulse.postReg.wizard.phone_num",
        },
      },
    },
    birthdateScreen: {
      screenId: "CardDob",
      fieldName: "dob",
      fields: { dob: { model: "dob", validationMetaKey: "DATEOFBIRTH" } },
      context: "",
      actionType: "",
      configs: {},
      firebaseEvent: "post_reg_birthday",
      platformEvents: {
        WizardNextPressed: {
          name: "pulse.postReg.wizard.birthday",
        },
        WizardSkipPressed: {
          name: "pulse.postReg.wizard.birthday",
        },
      },
    },
    nationalIdScreen: {
      screenId: "NationalId",
      fieldName: "nationalId",
      fields: {
        nationalId: {
          model: "externalIds.NATIONAL_ID",
          validationMetaKey: "ID",
        },
      },
      context: "",
      actionType: "",
      configs: {},
      firebaseEvent: "post_reg_national_id",
      platformEvents: {
        WizardNextPressed: {
          name: "pulse.postReg.wizard.national_id",
        },
        WizardSkipPressed: {
          name: "pulse.postReg.wizard.national_id",
        },
      },
    },
    genderScreen: {
      screenId: "CardGender",
      fieldName: "gender",
      fields: { gender: { model: "gender", validationMetaKey: "GENDER" } },
      context: "",
      actionType: "",
      configs: {},
      firebaseEvent: "post_reg_gender",
      platformEvents: {
        WizardNextPressed: {
          name: "pulse.postReg.wizard.gender",
        },
        WizardSkipPressed: {
          name: "pulse.postReg.wizard.gender",
        },
      },
    },
    addressScreen: {
      screenId: "CardAddress",
      fieldName: "address1",
      fields: {
        houseNo: { model: "houseNo" },
        mapAddress: { model: "mapAddress", validationMetaKey: "ADDRESS" },
      },
      context: "",
      actionType: "",
      configs: {},
      firebaseEvent: "post_reg_address",
      platformEvents: {
        WizardNextPressed: {
          name: "pulse.postReg.wizard.address",
        },
        WizardSkipPressed: {
          name: "pulse.postReg.wizard.address",
        },
      },
    },
  },
  flow: {
    _start: {
      to: "birthdateScreen",
      screenParams: {},
    },
    birthdateScreen: {
      to: "genderScreen",
      screenParams: {},
    },
    genderScreen: {
      to: "nationalIdScreen",
      screenParams: {},
    },
    nationalIdScreen: {
      to: "addressScreen",
      screenParams: {},
    },
    addressScreen: {
      to: "phoneScreen",
      screenParams: {},
    }
  },
  postCustomerUpdateNavigation: {
    type: 'GO_TO_SCREEN',
    navigateTo: 'MyDocWizardRegn',
    payload: {
      
    }
  }
};
