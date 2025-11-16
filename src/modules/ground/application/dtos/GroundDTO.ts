export interface GroundDTO {
  id: number;
  name: string;
  image?: string;
  width: number;
  length: number;
  address: string;
  notes: string;
  idUser: number;
  createdAt: Date;
  updatedAt: Date;
}
