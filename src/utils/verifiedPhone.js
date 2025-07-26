const verifiedPhones = new Set();

export const addVerifiedPhone = (phone) => {
  verifiedPhones.add(phone);
};

export const isPhoneVerified = (phone) => {
  return verifiedPhones.has(phone);
};

export const removeVerifiedPhone = (phone) => {
  verifiedPhones.delete(phone);
};

