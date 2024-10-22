export const formatPhoneNumber9 = (phoneNumber: string) => {
  return phoneNumber.slice(-9);
};

export const formatPhoneNumber12 = (phoneNumber: string) => {
  return `233${phoneNumber.slice(-9)}`;
};
