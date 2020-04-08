interface storeInterface {
  fetchEntity: (string) => void;
  checkForCachedEntity: (string) => boolean | object; // todo: remove this one
}

export default storeInterface;
