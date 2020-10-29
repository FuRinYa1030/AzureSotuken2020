var JsonData;
var select = document.getElementById("sampleSelect");

async function ret(){
  var i = 0;var IDSUM = 0;

  try{
    await $.post('/post', { processing: 'Download' }, 'json')
    .done(function(data) {
      JsonData = data;
      for (const itemDef of data) {
       IDSUM++;
      }
      alert('JSON Data was able to Download by system');
    })
    .fail(function() {alert('通信失敗')});
    //.always(function() {alert('通信終了')});
  }catch (err) {
    await alert(err.message + "@cosmosdbHTMLControl@dataget");
  }

  try{
    k = await select.childElementCount;

    if(Number(k) == 0){
      var option = await new Array(IDSUM);
      for(i = 0;i < IDSUM;i++){
        option[i] = await document.createElement("option");
        option[i].text = JsonData[i].id;
        option[i].value = i;
        await select.appendChild(option[i]);
      }
    }

    else if(k < IDSUM || k > IDSUM){
      while(select.firstChild){
        await select.removeChild(select.firstChild);
      }

      var option = await new Array(IDSUM);
      for(i = 0;i < IDSUM;i++){
        option[i] = await document.createElement("option");
        option[i].text = JsonData[i].id;
        option[i].value = i;
        await select.appendChild(option[i]);
      }
    }

    select.selectedIndex = 0;
    document.getElementById("id").value = decodeURI(JsonData[select.value].id);
    document.getElementById("dog").value = decodeURI(JsonData[select.value].dog);
    document.getElementById("cat").value = decodeURI(JsonData[select.value].cat);

  }catch (err) {await alert(err.message + "@cosmosdbHTMLControl@select");}
}

function selectboxChange(){
  document.getElementById("id").value = decodeURI(JsonData[select.value].id);
  document.getElementById("dog").value = decodeURI(JsonData[select.value].dog);
  document.getElementById("cat").value = decodeURI(JsonData[select.value].cat);
}
