export function isNumber(evt: KeyboardEvent | undefined): boolean {
  if (evt) {
    switch (evt.key) {
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case "0":
        return true;
      default:
        evt.preventDefault();
        return false;
    }
  }
  return false;
}
