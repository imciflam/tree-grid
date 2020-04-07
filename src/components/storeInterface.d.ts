interface storeInterface {
  fetchEntity: (string) => void;
  checkForCachedEntity: (string) => boolean | object;
}

export default storeInterface;
