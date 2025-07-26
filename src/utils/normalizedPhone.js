export const normalizePhone = (phone) => {
  if (!phone.startsWith("+")) {
    return "+57" + phone;
  }
  return phone;
};
