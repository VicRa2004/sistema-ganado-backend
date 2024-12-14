interface ErrorDataCreate {
   message?: string;
   statusCode?: number;
}

export class ErrorController extends Error {
   statusCode: number;

   constructor({ message, statusCode }: ErrorDataCreate) {
      if (!message) {
         message = "Internal Server Error";
      }

      if (!statusCode) {
         statusCode = 500;
      }

      super(message);

      this.statusCode = statusCode;
   }
}

export class ErrorSesion extends Error {
   statusCode: number;

   constructor() {
      const message = "No autorizado";
      const statusCode = 401;

      super(message);

      this.statusCode = statusCode;
   }
}