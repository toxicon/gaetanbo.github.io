$(document).ready(function(){
     $("#select_ressource").change(function(){
         let ressourceAsked = $("#select_ressource").children("option:selected").val();
         let jsonDoc = "ressources/"+ressourceAsked+".json";
         $("#select_ressource_type").empty();
         $.getJSON(jsonDoc,function(data) {
             $.each(data, function(key,val) {
                 var tierRessourceAsked = val.UniqueName;
                 var o = new Option(val.UniqueName,val.UniqueName);
                 $(o).html(val.UniqueName);
                 $("#select_ressource_type").append(o);
             });
         });
     });
     let ressource_typeAsked = "";
     $("#select_ressource_type").change(function(event) {
         //variable declaration
         // let bg_citytrader ="";
         //   let ca_citytrader ="";
         //   let fs_citytrader ="";
         //   let ly_citytrader ="";
         //   let ma_citytrader ="";
         //   let th_citytrader ="";
         //   let bg1_citytrader ="";
         //   let bg2_citytrader ="";
         //   let bg3_citytrader ="";
         //   let ca1_citytrader ="";
         //   let ca2_citytrader ="";
         //   let ca3_citytrader ="";
         //   let fs1_citytrader ="";
         //   let fs2_citytrader ="";
         //   let fs3_citytrader ="";
         //   let ly1_citytrader ="";
         //   let ly2_citytrader ="";
         //   let ly3_citytrader ="";
         //   let ma1_citytrader ="";
         //   let ma2_citytrader ="";
         //   let ma3_citytrader ="";
         //   let th1_citytrader ="";
         //   let th2_citytrader ="";
         //   let th3_citytrader ="";
         // $("#bgcitytrader").empty();
         //   $("#cacitytrader").empty();
         //   $("#fscitytrader").empty();
         //   $("#lycitytrader").empty();
         //   $("#macitytrader").empty();
         //   $("#thcitytrader").empty();
         //   $("#bg1citytrader").empty();
         //   $("#ca1citytrader").empty();
         //   $("#fs1citytrader").empty();
         //   $("#ly1citytrader").empty();
         //   $("#ma1citytrader").empty();
         //   $("#th1citytrader").empty();
         //   $("#bg2citytrader").empty();
         //   $("#ca2citytrader").empty();
         //   $("#fs2citytrader").empty();
         //   $("#ly2citytrader").empty();
         //   $("#ma2citytrader").empty();
         //   $("#th2citytrader").empty();
         //   $("#bg3citytrader").empty();
         //   $("#ca3citytrader").empty();
         //   $("#fs3citytrader").empty();
         //   $("#ly3citytrader").empty();
         //   $("#ma3citytrader").empty();
         //   $("#th3citytrader").empty();
           $("#sortedPrices0").empty();
           $("#sortedPrices").empty();
           $("#sortedPrices2").empty();
           $("#sortedPrices3").empty();
           $("#sortedPricesmax0").empty();
           $("#sortedPricesmax").empty();
           $("#sortedPricesmax2").empty();
           $("#sortedPricesmax3").empty();

         ressource_typeAsked = $("#select_ressource_type").children("option:selected").val();
         $.get("https://www.albion-online-data.com/api/v2/stats/prices/"+ressource_typeAsked,function(d){
             $("select_city").empty();
             var array2 = [];


               cleanCrossCity(d);

              sortMinAndAppend(d,"#sortedPrices0",ressource_typeAsked);
              sortMaxAndAppend(d,"#sortedPricesmax0",ressource_typeAsked);


             $.each(d, function(index, val) {
                 var oo = new Option(val["city"],val["city"]);
                 $(oo).html(val["city"]);
                 $("#select_city").append(oo);
                 switch(val["city"]){
                     case "Bridgewatch":
                         array2.push([val["city"],d[index].sell_price_min]);
                         bg_citytrader = d[index].sell_price_min;
                         break;
                     case "Caerleon":
                         // A la place de ça faire une vraie comparaison entre toutes les valeurs
                         ca_citytrader = d[index].sell_price_min;
                         break;
                     case "Fort Sterling":
                         fs_citytrader = d[index].sell_price_min;
                         break;
                     case "Lymhurst":
                         array2.push([val["city"],d[index].sell_price_min]);
                         try{
                             if (array2[3][1] >= array2[1][1]) {
                                 $('#lycitytrader').removeClass('green');
                                 $('#lycitytrader').addClass('red');
                             } else {
                                 $('#lycitytrader').removeClass('red');
                                 $('#lycitytrader').addClass('green');
                             }
                         }
                         catch(e) {
                             //console.log(e);
                         }
                         ly_citytrader = d[index].sell_price_min;
                         break;
                     case "Martlock":
                         array2.push([val["city"],d[index].sell_price_min]);
                         try{
                             if (array2[4][1] >= array2[1][1]) {
                                 $('#macitytrader').removeClass('green');
                                 $('#macitytrader').addClass('red');
                             } else {
                                 $('#macitytrader').removeClass('red');
                                 $('#macitytrader').addClass('green');
                             }
                         }
                         catch(e) {
                         }
                         ma_citytrader = d[index].sell_price_min;
                         break;
                     case "Thetford":
                         array2.push([val["city"],d[index].sell_price_min]);
                         try{
                             if (array2[5][1] >= array2[1][1]) {
                                 $('#thcitytrader').removeClass('green');
                                 $('#thcitytrader').addClass('red');
                             } else {
                                 $('#thcitytrader').removeClass('red');
                                 $('#thcitytrader').addClass('green');
                             }
                         }
                         catch(e) {
                         }
                         th_citytrader = d[index].sell_price_min;
                         break;
                     default:
                 }
                  /* DEFAULT CITY SHOULD BE CAERLEON  */
                  /* Black Market and Cross things should be ignored for materials at least */
             });
             // $("#bgcitytrader").append(bg_citytrader);
             // $("#cacitytrader").append(ca_citytrader);
             // $("#fscitytrader").append(fs_citytrader);
             // $("#lycitytrader").append(ly_citytrader);
             // $("#macitytrader").append(ma_citytrader);
             // $("#thcitytrader").append(th_citytrader);


              $.get("https://www.albion-online-data.com/api/v2/stats/prices/"+ressource_typeAsked+"_LEVEL1@1",function(priceArray){
                  //console.log(priceArray); 

                  var tiers = ressource_typeAsked+"LEVEL1@1";
                  
                  cleanCrossCity(priceArray);

                  sortMinAndAppend(priceArray,"#sortedPrices",tiers);
                  sortMaxAndAppend(priceArray,"#sortedPricesmax",tiers);

                  // const testMap = priceArray.map(function(prices) {
                  //   // return prices.city;
                  //   return `${prices.city} [${prices.sell_price_min}]`;
                  // });
                  // console.log(testMap);

                  $("select_city").empty();
                   $.each(priceArray,function(index1,val1) {
                      //console.log(d1[index1].city);
                       switch (val1["city"]) {
                         case "Bridgewatch":
                           bg1_citytrader = priceArray[index1].sell_price_min;
                           break;
                         case "Caerleon":
                           ca1_citytrader = priceArray[index1].sell_price_min;
                           break;
                         case "Fort Sterling":
                           fs1_citytrader = priceArray[index1].sell_price_min;
                           break;
                         case "Lymhurst":
                           ly1_citytrader = priceArray[index1].sell_price_min;
                           break;
                         case "Martlock":
                           ma1_citytrader = priceArray[index1].sell_price_min;
                           break;
                         case "Thetford":
                           th1_citytrader = priceArray[index1].sell_price_min;
                           break;
                         default:
                       }
                   });
                     // $("#bg1citytrader").append(bg1_citytrader);
                     // $("#ca1citytrader").append(ca1_citytrader);
                     // $("#fs1citytrader").append(fs1_citytrader);
                     // $("#ly1citytrader").append(ly1_citytrader);
                     // $("#ma1citytrader").append(ma1_citytrader);
                     // $("#th1citytrader").append(th1_citytrader);
              });



               $.get("https://www.albion-online-data.com/api/v2/stats/prices/"+ressource_typeAsked+"_LEVEL2@2",function(d2){
                 $("select_city").empty();
                  var tiers = ressource_typeAsked+"LEVEL2@2";

                  cleanCrossCity(d2);

                  sortMinAndAppend(d2,"#sortedPrices2",tiers);
                  sortMaxAndAppend(d2,"#sortedPricesmax2",tiers);
                  // const sortedPrices2 = d2.sort((a,b) => (a.sell_price_min > b.sell_price_min ? 1 : -1));
                  // // console.log(sortedPrices2);
                  // $("#sortedPrices2").append("ENCHANT 5.2 :  min = "+sortedPrices2[0].sell_price_min+" in "+sortedPrices2[0].city+" City !");


                 var array3 = [];
                 $.each(d2,function(index2,val2) {
                   switch (val2["city"]) {
                     case "Bridgewatch":
                       bg2_citytrader = d2[index2].sell_price_min;
                       break;
                     case "Caerleon":
                       ca2_citytrader = d2[index2].sell_price_min;
                       break;
                     case "Fort Sterling":
                       fs2_citytrader = d2[index2].sell_price_min;
                       break;
                     case "Lymhurst":
                       ly2_citytrader = d2[index2].sell_price_min;
                       break;
                     case "Martlock":
                       ma2_citytrader = d2[index2].sell_price_min;
                       break;
                     case "Thetford":
                       th2_citytrader = d2[index2].sell_price_min;
                       break;
                     default:
                       //console.log('default');

                   }
                 });
                 // $("#bg2citytrader").append(bg2_citytrader);
                 // $("#ca2citytrader").append(ca2_citytrader);
                 // $("#fs2citytrader").append(fs2_citytrader);
                 // $("#l2ycitytrader").append(ly2_citytrader);
                 // $("#ma2citytrader").append(ma2_citytrader);
                 // $("#th2citytrader").append(th2_citytrader);
               });

               $.get("https://www.albion-online-data.com/api/v2/stats/prices/"+ressource_typeAsked+"_LEVEL3@3",function(d3){
                 $("select_city").empty();
                 // $("#bg3_citytrader").empty();
                 // $("#ca3_citytrader").empty();
                 // $("#fs3_citytrader").empty();
                 // $("#ly3_citytrader").empty();
                 // $("#ma3_citytrader").empty();
                 // $("#th3_citytrader").empty();
                var tiers = ressource_typeAsked+"LEVEL3@3";    
                cleanCrossCity(d3);            
                sortMinAndAppend(d3,"#sortedPrices3",tiers);
                sortMaxAndAppend(d3,"#sortedPricesmax3",tiers);
                //  const sortedPrices3 = d3.sort((a,b) => (a.sell_price_min > b.sell_price_min ? 1 : -1));
                //  // console.log(sortedPrices3);
                // $("#sortedPrices3").append("ENCHANT 5.3 :  min = "+sortedPrices3[0].sell_price_min+" in "+sortedPrices3[0].city+" City !");

                 var array3 = [];
                 $.each(d3,function(index2,val2) {
                   switch (val2["city"]) {
                     case "Bridgewatch":
                       bg3_citytrader = d3[index2].sell_price_min;
                       break;
                     case "Caerleon":
                       ca3_citytrader = d3[index2].sell_price_min;
                       break;
                     case "Fort Sterling":
                       fs3_citytrader = d3[index2].sell_price_min;
                       break;
                     case "Lymhurst":
                       ly3_citytrader = d3[index2].sell_price_min;
                       break;
                     case "Martlock":
                       ma3_citytrader = d3[index2].sell_price_min;
                       break;
                     case "Thetford":
                       th3_citytrader = d3[index2].sell_price_min;
                       break;
                     default:
                       //console.log('default');

                   }
                 });
                 // $("#bg3citytrader").append(bg3_citytrader);
                 // $("#ca3citytrader").append(ca3_citytrader);
                 // $("#fs3citytrader").append(fs3_citytrader);
                 // $("#l23citytrader").append(ly3_citytrader);
                 // $("#ma3citytrader").append(ma3_citytrader);
                 // $("#th3citytrader").append(th3_citytrader);
               });
         });
     });

     let citySelected = "";
     $("#select_city").change(function(event) {
        // console.clear();
         /* DEFAULT CITY SHOULD BE CAERLEON  */
         var cities = {"1" : "Bridgewatch","2" : "Caerleon","3" : "Fort Sterling","5" : "Lymhurst","6" : "Martlock","10" : "Thetford"};
         citySelected = $("#select_city").children("option:selected").val();
        // console.log(citySelected);
         $.get("https://www.albion-online-data.com/api/v2/stats/prices/"+ressource_typeAsked+"?locations="+citySelected,function(dataThatMatters){
          //   console.log(dataThatMatters);
          //   console.log("sell min : "+dataThatMatters[0].sell_price_min);
          //   console.log('apiwascalled_2');
         });
     });
 });

$(document).ready(function(){
    // $("#Lootbtn").click(function(){
    //    $( ".content-loot" ).toggle();
    // });
    // $("#Focabtn").click(function(){
    //    $( ".content-foca" ).toggle();
    // });
    // $("#Buildsbtn").click(function(){
    //    $( ".content-builds" ).toggle();
    // });
    // $("#Craftsbtn").click(function(){
    //    $( ".content-crafts" ).toggle();
    // });
    // $("#Marketbtn").click(function(){
    //    $( ".content-Market" ).toggle();
    // });
    // $("#City_Traderbtn").click(function(){
    //    $( ".content-cityTrader" ).toggle();
    // });
});

  

  // STARTED FROM THE BOTTOM NOW WE HERE 
  // https://www.albion-online-data.com/api/v2/stats/prices/T4_ORE_LEVEL2@2?location=Bridgewatch,Caerleon
  // https://albiononline2d.ams3.cdn.digitaloceanspaces.com/thumbnails/128/T5_METALBAR_LEVEL3
  
  let price_min;
  let dataprice;
  function fetchData (item, enchantLevel = 0,location = 0,quality = 0){
    // location, enchantLevel et quality peuvent etre nul
    var request = "https://www.albion-online-data.com/api/v2/stats/prices/"+item;
      if (enchantLevel) {
        request += enchantLevel;
      } else {
       // console.log('no enchantLevelAsked');
      }
      if (location) {
        request +="?locations=" +location;
      } else {  
        // console.log('no locationAsked');
      }
      $.get(request, function(dataprice){
        // price_min = dataprice[0].sell_price_min;
        //        This only return the first city in the array, rarely the same city
        // console.log("price min for "+item+"= "+price_min);
        console.log(dataprice);
        return dataprice;
      });
  };
  // fetchData("T2_ORE","","");
  // fetchData("T4_ORE","_LEVEL3@3","Bridgewatch,Caerleon");
  



  function sortMinAndAppend(donnee,destinataire,tiers) {
    const sortdonnee = donnee.sort((a,b) => (a.sell_price_min > b.sell_price_min ? 1 : -1));
    //console.log('sortdonneemin');
    // console.log(sortdonnee);
    // console.log('cleanedEmptyPrices');
    // cleanEmptyPrices(sortdonnee);
    //console.log(sortdonnee);
    $(destinataire).append(sortdonnee[0].sell_price_min+" in "+sortdonnee[0].city);
//    $(destinataire).append(tiers+" : min = "+sortdonnee[0].sell_price_min+" in "+sortdonnee[0].city+" City !");
  };
  function sortMaxAndAppend(donnee,destinataire,tiers) {
    const sortdonnee = donnee.sort((a,b) => (a.sell_price_min < b.sell_price_min ? 1 : -1));
    $(destinataire).append(sortdonnee[0].sell_price_min+" in "+sortdonnee[0].city);
    // $(destinataire).append(tiers+" : max = "+sortdonnee[0].sell_price_min+" in "+sortdonnee[0].city+" City !");
  };

  function cleanEmptyPrices(array) {
    for(var i = 0; i < array.length; i++) {
      if(array[i].sell_price_min === 0 ) {
        array.splice(i,1);
      }
    }
    return array;
  };

  function cleanCrossCity(array) {
    for(var i = 0; i < array.length; i++) {
      if( array[i].city.includes("Cross") || array[i].city.includes("Steppe") || array[i].city.includes("Black") || array[i].city.includes("2000")) {
        console.log(i);
        console.log(array[i].city);
        array.splice(i,1);
        i--;
      }
    }
    return array;
  };