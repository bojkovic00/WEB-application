

import { racunIzdat } from "./racunIzdat";
export class Table {

callerObj;
  tip = ""
  odeljenje = null;
  id;
  path_to_image;
  height;
  width;
  end_position_top = "0";
  end_position_left = "0";
  img_obj;

  trenX;
  trenY;

  img = undefined;

  removeChilds(num) {
    let div_elem = document.getElementById("canvas_div")
    console.log("usao")
    var child = div_elem.lastChild;
    while (num > 0) {
      console.log("brise")
      div_elem.removeChild(child);
      child = div_elem.lastChild;
      num--;
    }

  }

  fja2(path) {

    this.img.src = path;
    this.azuriran = 1
  }
fjaVrati(){
  if (this.tip == "okrugli") {
    this.img.src = "../../assets/stoPng.png";
    this.path_to_image = "../../assets/stoPng.png";
  } else {
    this.img.src = "../../assets/stoKvadrat.jpg";
    this.path_to_image = "../../assets/stoKvadrat.jpg";
  }
  this.zauzet = 0;

}

  fja() {
    if (this.tip == "okrugli") {
      this.img.src = "../../assets/stoZauzet.png";
      this.path_to_image = "../../assets/stoZauzet.png";
    } else {
      this.img.src = "../../assets/stoKvadZauzet.png";
      this.path_to_image = "../../assets/stoKvadZauzet.png";
    }

    this.zauzet = 1;
  }


  zauzet = 0;
  azuriran = 0;

  constructor(path_to_image, width, height, id, pos_top, pos_left, callerObj, odeljenje, tip, izBaze) {
    
    this.callerObj = callerObj;
    this.tip = tip;
    this.odeljenje = odeljenje;

    console.log("constructor")
    this.path_to_image = path_to_image;
    this.id = id;
    this.width = width;
    this.height = height;

    this.img = new Image();
    this.img.src = path_to_image;

    this.img.addEventListener(('load'), () => {

      console.log('Image loaded successfully    ');

      if (height == '' || height == undefined) {
        this.img.style.height = width;
      }
      else {
        this.img.style.height = height;
      }
      //this.img.style.marginLeft = "15px";

      this.img.style.width = width;
      this.img.style.position = 'absolute';
      this.img.style.zIndex = '1000';
      this.img.style.display = 'block';

      let div_elem = document.getElementById("canvas_div")
      console.log(div_elem + " div elem");
      this.img.id = id;

      console.log(+ "   top");
      if (pos_top != "") {

        if (this.zauzet == 1 || this.azuriran == 1) {
          console.log(height)
          this.img.style.top = (this.trenY - Number(this.height.substring(0, this.height.length-2)) / 2 )+"px"
          this.end_position_top = this.trenY;
        } 
        else if (izBaze == 1) {
         
          //this.img.style.top = pos_top - Number(this.height.substring(0, this.height.length-2)) / 2 +"px";
          this.img.style.top = (pos_top - Number(this.height.substring(0, this.height.length-2)) / 2 )+"px"
          this.end_position_top = pos_top - Number(this.height.substring(0, this.height.length-2)) / 2 + "px"
        }
        else{
          this.img.style.top = 215 + pos_top +"px"
          this.end_position_top = pos_top;
        }
      }
      if (pos_left != "") {
        if (this.zauzet == 1 || this.azuriran == 1) {
          this.img.style.left = (this.trenX - Number(this.width.substring(0, this.width.length-2)) / 2 )+ "px"
          this.end_position_left = this.trenX;
        } 
        else if(izBaze==1) {
         // this.img.style.left = pos_left - Number(this.width.substring(0, this.width.length-2)) / 2 + 15;  + "px";
         this.img.style.left = (pos_left - Number(this.width.substring(0, this.width.length-2)) / 2 )+ "px"
         this.end_position_left = pos_left - Number(this.width.substring(0, this.width.length-2)) / 2 + 15 + "px";
          
        }
        else{
          this.img.style.left = pos_left + "px";
          this.end_position_left = pos_left;
        }
      }

      div_elem.appendChild(this.img);

      this.img.ondragstart = function () {
        return false;
      };
      console.log(this.img.style.left+ " pos_top " + this.img.style.top)
      this.img.addEventListener(('mousedown'), (event) => {

        this.img.style.position = 'absolute';
        this.img.style.zIndex = '1000';



        let div_elem = document.getElementById("canvas_div")

        div_elem.appendChild(this.img);
    

        function moveAt(pageX, pageY, img,zauzet) {
          if (zauzet==0) {
            var overlap = false;

            callerObj.odeljenjaBaza[callerObj.odabranoOdeljenje].stolovi.forEach(obj => {
              if (obj.id != id) {
                console.log("usao")

                let left1 = obj.trenX - obj.width.substring(0, obj.width.length - 2) / 2;
                let right1 = obj.trenX + obj.width.substring(0, obj.width.length - 2) / 2;
                let top1 = obj.trenY - obj.height.substring(0, obj.height.length - 2) / 2;
                let bottom1 = obj.trenY + obj.height.substring(0, obj.height.length - 2) / 2;


                let left2 = pageX - img.offsetWidth / 2;
                let right2 = pageX + img.offsetWidth / 2;
                let top2 = pageY - img.offsetHeight / 2;
                let bottom2 = pageY + img.offsetHeight / 2;


                if (!(right1 < left2 ||
                  left1 > right2 ||
                  bottom1 < top2 ||
                  top1 > bottom2)) overlap = true;



              } else {
            
                if (callerObj.odeljenjaBaza[callerObj.odabranoOdeljenje].stolovi.length == 1) {
                  img.style.left = pageX - img.offsetWidth / 2 + 'px';
                }

              }
            })

            if (pageX < (1420) && pageX > (img.offsetWidth / 2)) {
              if (!overlap) {

                img.style.left = pageX - img.offsetWidth / 2 + 'px';

              }
              else {
                console.log("preklop")
                return;
              }

            }


            if (pageY + img.offsetHeight / 2 < (935) && pageY - img.offsetHeight / 2 > (215)) {

              if (!overlap) {

                img.style.top = pageY - img.offsetHeight / 2 + 'px';

              }
              else {
                console.log("preklop")
                return;
              }

            }

          }
        }

        function onMouseMove(event) {
          moveAt(event.pageX, event.pageY, this.img, this.zauzet);
        }

        div_elem.addEventListener('mousemove', (event) => {
          moveAt(event.pageX, event.pageY, this.img, this.zauzet);
        });

        this.img.addEventListener(('mouseup'), (event) => {
          let div_elem = document.getElementById("canvas_div")

          div_elem.removeAllListeners('mousemove');
          this.end_position_top = this.img.style.top;
          this.end_position_left = this.img.style.left;

        

          callerObj.kliknuoId = id;
    

          this.img.onmouseup = null;
          this.trenX = event.pageX;
          this.trenY = event.pageY;
          console.log(event.pageY + " ispis " + event.y)

          callerObj.odeljenjaBaza[callerObj.odabranoOdeljenje].stolovi.forEach(sto=>{
            console.log(sto.id+" sto id ")
              if(sto.id==this.id){
                sto.trenX=this.trenX 
                sto.trenY=this.trenY
                callerObj.preduzecaService.izmeniOdeljenja(callerObj.korisnik.korIme, callerObj.odeljenjaBaza).subscribe(data => {});

}

          })

          console.log("onMouseMove up");
        })



      });
    });

  };





}

