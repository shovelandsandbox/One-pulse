class AvatarUtils {
  getShortName(name) {
    const nameParts = name.split(" ");
    if (nameParts.length == 1 && name.length > 2) {
      return name[0] + name[1];
    }
    return nameParts[0][0] + nameParts[1][0];
  }
}

export default new AvatarUtils();
