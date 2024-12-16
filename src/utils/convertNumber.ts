export const getPage = (value: string | undefined) => {
   let newValue;

   if (value) {
      newValue = parseInt(value);
   }

   if (!newValue) {
      newValue = 1;
      return newValue;
   }

   if (newValue <= 0) {
      throw new Error("Page is not negative");
   }

   return newValue;
};

export const getParamID = (value: string) => {
   let newValue;

   if (value) {
      newValue = parseInt(value);
   }

   if (!newValue) {
      throw new Error("ID is a type Number");
   }

   return newValue;
};
