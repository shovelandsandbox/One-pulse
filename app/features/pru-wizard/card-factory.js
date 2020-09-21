import CardPhone from "./components/cards/cardPhone";
import CardAddress from "./components/cards/cardAddress";
import CardDob from "./components/cards/cardDob";
import CardGender from "./components/cards/cardGender";
import NationalId from "./components/cards/NationalId";
import CardName from "./components/cards/cardName";

export default type => {
  switch (type) {
    case "CardPhone":
      return CardPhone;
    case "CardAddress":
      return CardAddress;
    case "CardDob":
      return CardDob;
    case "CardGender":
      return CardGender;
    case "NationalId":
      return NationalId;
    case "CardName":
      return CardName;
  }
  return null;
};
