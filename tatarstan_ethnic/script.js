let majority  = false ;
let ethnic = "None";
document.getElementById("numbers").style.visibility="hidden";


let overlay = null;
async function popup(id){
        const dataLoad = await fetch("stats.json");
    const data = await dataLoad.json();

    const popup = document.getElementById("popup");
    const element = document.getElementById(id);
    const parent= document.getElementById("map");
    const text = document.getElementById("nameSub");
    const  Pstat = document.getElementById("PPstat");


    const elementMeasurement= element.getBoundingClientRect();
    const parentMeasurement= parent.getBoundingClientRect();
    

    const centerX = elementMeasurement.left + elementMeasurement.width / 2 - parentMeasurement.left;
    const centerY = elementMeasurement.top + elementMeasurement.height / 2 - parentMeasurement.top;
    

    text.innerText = id;

    popup.style.left = `${centerX}px`;
    popup.style.top = `${centerY}px`;
    popup.style.display= "inline";
    removeOverlay()
    
    overlay = element.cloneNode();
    overlay.removeAttribute("id"); // avoid bugs with id
    overlay.style.stroke = "black"; //avoidbugs while onmouseenter on the overlay
    overlay.style.strokeWidth = "7px";
    overlay.style.strokeLinejoin = "round";
    overlay.style.pointerEvents = "none";
    overlay.style.fill = "none";
    element.parentNode.appendChild(overlay);
    

    const cities = ["Aznakayevo City", "Bavly City", "Almetyevsk City", "Bugulma City", "Buinsk City", "Chistopol City", "Leninogorsk City", "Nizhnekamsk City", "Nurlat City", "Yelabuga City", "Zainsk City", "Zelenodolsk City"];

    const districts = ["Aznakayevsky District", "Bavlinsky District", "Almetyevsky District", "Bugulminsky District", "Buinsky District", "Chistopolsky District", "Leninogorsky District", "Nizhnekamsky District", "Nurlatsky District", "Yelabuzhsky District", "Zainsky District", "Zelenodolsky District"];
    if(cities.includes(id)){
        Pstat.innerText = `Part of ${districts[cities.indexOf(id)]} census`;
    } else if (ethnic === "None") {
        Pstat.innerText = `Population : ${(data[id]["population"]).toLocaleString("fr-FR")}`;
    } else if (majority === true){
         Pstat.innerText = `Most important ethnic group : ${Object.keys(data[id]["majority"])[0]} : ${Object.values(data[id]["majority"])[0].toLocaleString("fr-FR")} (${(Object.values(data[id]["majority"])[0] * 100 / data[id]["population"]).toFixed(2)}%)`;

    }
        else {
        let percEthnic = (data[id]["ethnics"][ethnic] * 100 / data[id]["population"]).toFixed(2);
        Pstat.innerText = `${ethnic} : ${(data[id]["ethnics"][ethnic]).toLocaleString("fr-FR")} (${percEthnic}%)`;
    }








}
function removeOverlay() {
    if (overlay) {
        overlay.remove();
        overlay = null;
    }
}
function popupHide(){
    const popup = document.getElementById("popup");
    popup.style.display="none";
    const  Pstat = document.getElementById("PPstat");
    Pstat.innerText = "";


}

async function color() {
    const dataLoad = await fetch("stats.json");
    const data = await dataLoad.json();
    
    const my_list = ["Agryzsky District","Aksubayevsky District","Aktanyshsky District","Alexeyevsky District","Alkeyevsky District","Almetyevsky District","Apastovsky District","Arsky District","Atninsky District","Aznakayevsky District","Baltasinsky District","Bavlinsky District","Bugulminsky District","Buinsky District","Cheremshansky District","Chistopolsky District","Drozhzhanovsky District","Kamsko-Ustyinsky District","Kaybitsky District","Kukmorsky District","Laishevsky District","Leninogorsky District","Mamadyshsky District","Mendeleyevsky District","Menzelinsky District","Muslyumovsky District","Nizhnekamsky District","Novosheshminsky District","Nurlatsky District","Pestrechinsky District","Rybno-Slobodsky District","Sabinsky District","Sarmanovsky District","Spassky District","Tetyushsky District","Tukayevsky District","Tyulyachinsky District","Verkhneuslonsky District","Vysokogorsky District","Yelabuzhsky District","Yutazinsky District","Zainsky District","Zelenodolsky District","Aznakayevo City","Almetyevsk City","Bavly City","Bugulma City","Buinsk City","Chistopol City","Kazan City","Leninogorsk City","Naberezhnye Chelny City","Nizhnekamsk City","Nurlat City","Yelabuga City","Zainsk City","Zelenodolsk City"];
    const allColorLoad = await fetch ("colors.json");
    const allColor = await allColorLoad.json()

    if(majority === true){

        my_list.forEach(function (element){

            
            if(data[element]["majority"]){
                const majEthnic = Object.keys(data[element]["majority"])[0];
                const majNumber = data[element]["majority"][majEthnic];
                let percent = ((majNumber * 100 )/data[element]["population"]).toFixed(2);

                if(percent >= 90 ){document.getElementById(element).style.fill= allColor[majEthnic][7];}  
                else if(percent >= 70){document.getElementById(element).style.fill= allColor[majEthnic][6];}
                else if(percent >= 50){document.getElementById(element).style.fill= allColor[majEthnic][5];}
                else if(percent >= 35){document.getElementById(element).style.fill= allColor[majEthnic][4];}
                else if(percent >= 20){document.getElementById(element).style.fill= allColor[majEthnic][3];}
                else if(percent >= 10){document.getElementById(element).style.fill= allColor[majEthnic][2];}
                else if(percent >= 3){document.getElementById(element).style.fill= allColor[majEthnic][1];}
                else {document.getElementById(element).style.fill= allColor[majEthnic][0];}
            }

            if(element === "Aznakayevo City"){
                document.getElementById(element).style.fill = document.getElementById("Aznakayevsky District").style.fill;
            } else if(element === "Bavly City"){
                document.getElementById(element).style.fill = document.getElementById("Bavlinsky District").style.fill;
            } else if(element === "Almetyevsk City"){
                document.getElementById(element).style.fill = document.getElementById("Almetyevsky District").style.fill;
            } else if(element === "Bugulma City"){
                document.getElementById(element).style.fill = document.getElementById("Bugulminsky District").style.fill;
            } else if(element === "Buinsk City"){
                document.getElementById(element).style.fill = document.getElementById("Buinsky District").style.fill;
            } else if(element === "Chistopol City"){
                document.getElementById(element).style.fill = document.getElementById("Chistopolsky District").style.fill;
            } else if(element === "Leninogorsk City"){
                document.getElementById(element).style.fill = document.getElementById("Leninogorsky District").style.fill;
            } else if(element === "Nizhnekamsk City"){
                document.getElementById(element).style.fill = document.getElementById("Nizhnekamsky District").style.fill;
            } else if(element === "Nurlat City"){
                document.getElementById(element).style.fill = document.getElementById("Nurlatsky District").style.fill;
            } else if(element === "Yelabuga City"){
                document.getElementById(element).style.fill = document.getElementById("Yelabuzhsky District").style.fill;
            } else if(element === "Zainsk City"){
                document.getElementById(element).style.fill = document.getElementById("Zainsky District").style.fill;
            } else if(element === "Zelenodolsk City"){
                document.getElementById(element).style.fill = document.getElementById("Zelenodolsky District").style.fill;
            }

        })

    } else {

    my_list.forEach(function (element){
        
        
        let percent = ((data[element]["ethnics"][ethnic] * 100 )/data[element]["population"]).toFixed(2);
        if(percent >= 90 ){document.getElementById(element).style.fill= allColor[ethnic][7];}  
        else if(percent >= 70){document.getElementById(element).style.fill= allColor[ethnic][6];}
        else if(percent >= 50){document.getElementById(element).style.fill= allColor[ethnic][5];}
        else if(percent >= 35){document.getElementById(element).style.fill= allColor[ethnic][4];}
        else if(percent >= 20){document.getElementById(element).style.fill= allColor[ethnic][3];}
        else if(percent >= 10){document.getElementById(element).style.fill= allColor[ethnic][2];}
        else if(percent >= 3){document.getElementById(element).style.fill= allColor[ethnic][1];}
        
        else {document.getElementById(element).style.fill= allColor[ethnic][0];}

        if(element === "Aznakayevo City"){
            document.getElementById(element).style.fill = document.getElementById("Aznakayevsky District").style.fill;
        }        else if(element === "Bavly City"){
            document.getElementById(element).style.fill = document.getElementById("Bavlinsky District").style.fill;
        } else if(element === "Almetyevsk City"){
            document.getElementById(element).style.fill = document.getElementById("Almetyevsky District").style.fill;
        }         else if(element === "Bugulma City"){
            document.getElementById(element).style.fill = document.getElementById("Bugulminsky District").style.fill;
        } else if(element === "Buinsk City"){
            document.getElementById(element).style.fill = document.getElementById("Buinsky District").style.fill;
        } else if(element === "Chistopol City"){
            document.getElementById(element).style.fill = document.getElementById("Chistopolsky District").style.fill;
        }else if(element === "Chistopol City"){
            document.getElementById(element).style.fill = document.getElementById("Chistopolsky District").style.fill;
        }else if(element === "Leninogorsk City"){
            document.getElementById(element).style.fill = document.getElementById("Leninogorsky District").style.fill;
        }else if(element === "Nizhnekamsk City"){
            document.getElementById(element).style.fill = document.getElementById("Nizhnekamsky District").style.fill;
        }else if(element === "Nurlat City"){
            document.getElementById(element).style.fill = document.getElementById("Nurlatsky District").style.fill;
        }else if(element === "Yelabuga City"){
            document.getElementById(element).style.fill = document.getElementById("Yelabuzhsky District").style.fill;
        }else if(element === "Zainsk City"){
            document.getElementById(element).style.fill = document.getElementById("Zainsky District").style.fill;
        }else if(element === "Zelenodolsk City"){
            document.getElementById(element).style.fill = document.getElementById("Zelenodolsky District").style.fill;
        }


    })

     const legend = document.getElementById("legend");
     document.getElementById("numbers").style.visibility="visible";
     while(legend.firstChild){
        legend.firstChild.remove()
     }
     allColor[ethnic].forEach(element =>{
        
        const creation = document.createElement("div");
        
        creation.classList.add("legend_div");
        creation.style.backgroundColor=element;
        
        legend.appendChild(creation);
        console.log(legend)
        
     


     })

    }
    
}


    
    




function changeEthnic(ethnicGroup){
    ethnic = ethnicGroup;
    majority =  false;
    color();
}


async function noneRadio(){
    majority = false;
    ethnic = "None";
   const liste_blank = document.querySelectorAll(".region");
   document.getElementById("numbers").style.visibility="hidden";

   liste_blank.forEach((elem)=>{
        elem.style.fill = "white";
   })

   const legend = document.getElementById("legend");
    while(legend.firstChild){
        legend.firstChild.remove()
     }



}

function funcmajority(){
    ethnic = "nothing";
    majority = true;
    color()

       const legend = document.getElementById("legend");
    while(legend.firstChild){
        legend.firstChild.remove()
     }
     document.getElementById("numbers").style.visibility="hidden";

}