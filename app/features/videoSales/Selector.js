export const VideoSalesSelector = {
  getContactsFromLogs: (callLogList = []) => {
    const resArr = [];
    callLogList.filter(item => {
      const i = resArr.findIndex(contact => contact.email == item.email);
      if (item.email && i == -1) {
        const contactDetail = {
          fullName: item.fullName,
          customerNumber: item.customerNumber,
          email: item.email,
          dob: item.dob,
          phoneNumber: item.phoneNumber,
          id: item.id,
          documentId: item.documentId,
          type: "contact",
          profilePic: item.profilePic,
        };
        resArr.push(contactDetail);
      }
      return null;
    });
    return resArr;
  },
};
