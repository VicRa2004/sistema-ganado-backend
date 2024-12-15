export const convertNumber = (value: string) => {
   const newValue = parseInt(value);

   if (!newValue) {
      throw new Error("ID is not Number");
   }

   return newValue;
};
