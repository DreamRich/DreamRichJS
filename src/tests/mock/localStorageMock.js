class LocalStorageMock {
  constructor(){
    this.storage = {};
  }
  getItem(key){
    return this.storage[key] || null;
  }
  setItem(key, value){
    this.storage[key] = value;
  }
  removeItem(key){
    delete this.storage[key];
  }
};

export default new LocalStorageMock();
