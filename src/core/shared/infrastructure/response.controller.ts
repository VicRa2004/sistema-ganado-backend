import { Response } from "express";

interface ResponseProps {
  res: Response;
  data?: object;
  message?: string;
  status?: number;
}

export const responseController = ({
  res,
  data,
  status = 200,
  message,
}: ResponseProps) => {
  res
    .json({
      data,
      message: message || "Operation success",
    })
    .status(status);
};
