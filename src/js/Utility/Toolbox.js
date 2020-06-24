class Toolbox {

  removeDuplicatesFromArrayWithObjects(originalArray) {
    // currently only works with id, would be nice to expand functionality/reusability using dynamic props as arguments
    let uniqueArray = [];
    return uniqueArray = Array.from(new Set(originalArray.map(a => a.id)))
    .map(id => {
      return originalArray.find(a => a.id === id)
    });
  };


  splitElementFromUrlByPosition(url, position) {
    // currently only works with a position int and a single keyword "last", perhaps fun to expand on that.
    if(position === 'last'){
        position = 1;
    }        
    const stringArray = url.split("/");
    const idFromUrlString = stringArray[stringArray.length - position];
    return parseInt(idFromUrlString);
  }
}


export default Toolbox;
