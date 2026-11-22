//Pop-up Name...............................................................................................................................................
let radioValue = "None";
function displayCenter(path, container){
    const pathMeasurement = path.getBoundingClientRect();
    const containerMeasurement = container.getBoundingClientRect();

    const centerX = pathMeasurement.left + pathMeasurement.width / 2 - containerMeasurement.left;
    const centerY = pathMeasurement.top + pathMeasurement.height / 2 - containerMeasurement.top;

    popup.style.left = centerX + 'px';
    popup.style.top = centerY + 'px';
}

async function popupname(name, id){

    

    const loadData = await fetch("kmedata.json");
    const allData = await loadData.json();

    const loadColor = await fetch("kmecolors.json");
    const allColor = await loadColor.json();


    const my_id = document.getElementById(id);
    const contain = document.getElementById("main-map-div");
    const elem = document.getElementById("popup");
    const borders= document.getElementById("broader-borders");
    const region_popup = document.getElementById("regionName");
    const region_stats = document.getElementById("region-stats");
    elem.style.zIndex=2;
    let ethnicity = radioValue;
    region_popup.innerText = name;

    const statsload = await fetch("kmestats.json");
    const statsDef = await (statsload).json()
    console.log(radioValue)
    if (name === "Aral sea"){
        
        region_stats.style.display="none"
    }else if(ethnicity === "None"){
        
        region_stats.style.display="inline"
        region_stats.innerText ="Population : " + (statsDef[id]["population"]).toLocaleString("fr-FR") ;
    }else{
        
        region_stats.style.display="inline"
        region_stats.innerText = radioValue + " : " + (statsDef[id]["ethnics"][radioValue]).toLocaleString("fr-FR") + " ("+ ((statsDef[id]["ethnics"][radioValue])*100/(statsDef[id]["population"])).toFixed(2) + "%)";
    }
    
    
    borders.setAttribute("d", my_id.getAttribute("d"));
    borders.style.visibility="visible";
    elem.style.visibility ="visible";
    displayCenter(my_id, contain)
    
}

function reset(id){
    const region_popup = document.getElementById("regionName");
    const region_stats = document.getElementById("region-stats");
    region_stats.style.display="block";
    const other_id = document.getElementById(id);
    const elem = document.getElementById("popup");
    const borders= document.getElementById("broader-borders");
    elem.style.zIndex=-1;
     
    
    
    borders.style.visibility="hidden";
    
    elem.style.visibility ="hidden";
    
    

}

//Colors...................................................................................................................................

async function colorMap(ethnic) {
    
    radioValue = ethnic
    
    const loadData = await fetch("kmedata.json");
    const allData = await loadData.json();

    const loadColor = await fetch("kmecolors.json");
    const allColor = await loadColor.json();
    const cities = document.querySelectorAll(".city");
    cities.forEach(city =>{
        city.style.border = "rgb(65, 65, 65) solid 3px";
    });

    



    allData.byCities.forEach(element => {
        const percent = Math.round((element.ethnics[ethnic] * 100/element.population)*100)/100;
        
        if(percent >= 90 ){document.getElementById(element.id).style.backgroundColor= allColor[ethnic][7];}  
        else if(percent >= 70){document.getElementById(element.id).style.backgroundColor= allColor[ethnic][6];}
        else if(percent >= 50){document.getElementById(element.id).style.backgroundColor= allColor[ethnic][5];}
        else if(percent >= 35){document.getElementById(element.id).style.backgroundColor= allColor[ethnic][4];}
        else if(percent >= 20){document.getElementById(element.id).style.backgroundColor= allColor[ethnic][3];}
        else if(percent >= 10){document.getElementById(element.id).style.backgroundColor= allColor[ethnic][2];}
        else if(percent >= 3){document.getElementById(element.id).style.backgroundColor= allColor[ethnic][1];}
        else {document.getElementById(element.id).style.backgroundColor= allColor[ethnic][0];}


        //let color = null;
        

        //=allColor[ethnic]
        document.getElementById(element.id).style.stroke="rgb(65, 65, 65)";
        document.getElementById(element.id).style.strokeWidth="1px";   
    });

        allData.byRegion.forEach(element => {
        const percent = Math.round((element.ethnics[ethnic] * 100/element.population)*100)/100;
        
        if(percent >= 90 ){document.getElementById(element.id).style.fill= allColor[ethnic][7];}  
        else if(percent >= 70){document.getElementById(element.id).style.fill= allColor[ethnic][6];}
        else if(percent >= 50){document.getElementById(element.id).style.fill= allColor[ethnic][5];}
        else if(percent >= 35){document.getElementById(element.id).style.fill= allColor[ethnic][4];}
        else if(percent >= 20){document.getElementById(element.id).style.fill= allColor[ethnic][3];}
        else if(percent >= 10){document.getElementById(element.id).style.fill= allColor[ethnic][2];}
        else if(percent >= 3){document.getElementById(element.id).style.fill= allColor[ethnic][1];}
        else {document.getElementById(element.id).style.fill= allColor[ethnic][0];}


        //let color = null;
        

        //=allColor[ethnic]
        document.getElementById(element.id).style.stroke="rgb(65, 65, 65)";
        document.getElementById(element.id).style.strokeWidth="1px";   
    });
    
}


async function clearMap(){
    radioValue = "None"

    const loadData = await fetch("kmedata.json");
    const allData = await loadData.json();

        allData.byRegion.forEach(element => {
        document.getElementById(element.id).style.fill= "grey";   
        document.getElementById(element.id).style.stroke= "white";   
        
    });
    
    const cities = document.querySelectorAll(".city");
    cities.forEach(city =>{
        city.style.border = "solid white 2px";
        city.style.backgroundColor = "grey";
    });
}

//None checked....................................................................................
function checked(){
    document.getElementById("none-radio").checked=true;
}
checked()

function city_leave(element){
    document.getElementById(element).style.height ="18px";
    document.getElementById(element).style.borderWidth ="3px";
    document.getElementById(element).style.width ="18px";
    
    
}

function city_enter(element){
    
    document.getElementById(element).style.height ="25px";
    document.getElementById(element).style.borderWidth ="4px";
    document.getElementById(element).style.width ="25px"; //.....................................................
    
}



// Legend creation.............................................................................................................................................

async function drawLegend(ethn){
    const legend_gradient = document.getElementById("legend-color");
    const legend_numbers = document.getElementById("legend-numbers");
    legend_numbers.style.display="flex";
    legend_gradient.style.display="flex";
    while (legend_gradient.firstChild) {
        legend_gradient.firstChild.remove();
    }
    
    
    const data_color_legend_ = await fetch("kmecolors.json");
    const data_color_legend = await data_color_legend_.json();
    
    for (let i = 0; i < 8; i++){
        let my_div = document.createElement("div");
        my_div.classList.add("gradient");
        legend_gradient.appendChild(my_div);
        my_div.style.backgroundColor= data_color_legend[ethn][i];
    }
    

}

function hideLegend(){
    document.getElementById("legend-color").style.display="none";
    document.getElementById("legend-numbers").style.display="none";
}