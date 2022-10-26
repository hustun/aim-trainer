import { v4 as uuid } from 'uuid';

export class TargetClass {
  id: string;
  startingX: number;
  startingY: number;

  constructor() {
    this.id = uuid();
    this.startingX = Math.floor(Math.random() * 1200);
    this.startingY = Math.floor(Math.random() * 600);
  }
}
