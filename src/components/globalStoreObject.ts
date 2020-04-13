export interface IIndexable {
  [key: string]: any;
}

class globalStoreObject implements IIndexable {
  globalStore: object;
  constructor() {
    this.globalStore = {};
  }
  getFromGlobalStore = (entityName: string) => {
    const stringEntityName = JSON.stringify(entityName);
    const entity = (this.globalStore as IIndexable)[stringEntityName];
    if (!entity) {
      return false;
    } else {
      const parsedData = JSON.parse(entity);
      return parsedData.Fields;
    }
  };

  addToGlobalStore = (childName: string, childData: string) => {
    (this.globalStore as IIndexable)[childName] = childData;
  };
}

let globalStoreObj = new globalStoreObject();

export default globalStoreObj;
