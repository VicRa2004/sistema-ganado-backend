import { Race } from "./Race";

export interface RaceRepository {
  find(): Promise<Race[]>;
  findById(id: number): Promise<Race | null>;

  create(race: Race): Promise<Race>;
  update(race: Race): Promise<Race>;

  delete(id: number): Promise<void>;
}
