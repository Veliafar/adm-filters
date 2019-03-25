export class GridConfigModel {
  constructor(public pageNumber: number = 1,
              public pageSize: number = 100,
              public sortBy: any = null) {}
}
