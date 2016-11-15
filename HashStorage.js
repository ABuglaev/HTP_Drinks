  //описание класса HashStorage
  var HashStorage;
  HashStorage = function() {
    self = this;
    this.reset = function() {
      self = null;
    };

    this.addValue = function(key, value) {
      self[key] = value;
    };

    this.getValue = function(key) {
      return self[key];
    };

    this.deleteValue = function(key) {
      if (self[key]) { 
          delete self[key];
          return true 
      } else {
          return false
      };
    };

    this.getKeys = function() {
      var
      arrayKeys = [], i=0;
      for ( K in self) {
        i++;
        arrayKeys[i] = K;
      };
      return arrayKeys;
    };
  };