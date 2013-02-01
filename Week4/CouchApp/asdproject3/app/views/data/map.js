function(doc) {
  if(doc._id != "_design/app") {
    emit(doc._id, doc)
  }
};