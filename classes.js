/**
* Source Class
*/
class Source {
  constructor(name, isImage, src) {
    this.name = name;
    this.isImage = isImage;
    this.src = src;
  }
  getName(){
    return this.name;
  }
  getHtmlSrc(){
    return this.isImage ? '<img style="margin-top:10px;" class="registeredSrc" src="' + this.src + '" />' : this.src;
  }
  getSrc(){
    return this.src;
  }
  setJSONString(str){
    let obj = JSON.parse(str);
    this.name = obj.name;
    this.isImage = obj.isImage;
    this.src = obj.src;
  }
}

