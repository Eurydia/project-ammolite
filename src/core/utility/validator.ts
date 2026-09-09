const identifierRegex = /^[0-9a-z_\-]+$/;
export const validateIdentifier = (iden: string) => {
  return identifierRegex.test(iden);
};
