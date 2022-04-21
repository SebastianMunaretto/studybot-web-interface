export class Task {

  constructor(
    public title: string,
    public description: string,
    public done: boolean,
    public date: Date,
    public _id?: string | undefined
  ) {

  }

}
