import { makeAutoObservable } from "mobx";

class Store {
  metaData: any = {};
  imageMetaData: any = [];
  image = "";

  constructor() {
    makeAutoObservable(this);
  }
  setMetaData(val: any) {
    this.metaData = val;
  }
  setImage(val: string) {
    this.image = val;
  }
  setImageMetaData(val: any) {
    this.imageMetaData = val;
    console.log(val, "val");
  }
}

export default new Store();
