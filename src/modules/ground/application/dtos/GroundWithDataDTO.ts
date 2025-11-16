export interface GroundWithDataDTO {
  id: number;
  name: string;
  image: string;
  width: number;
  length: number;
  address: string;
  notes: string;
  idUser: number;
  user: {
    id: number;
    fullName: string;
    email: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
