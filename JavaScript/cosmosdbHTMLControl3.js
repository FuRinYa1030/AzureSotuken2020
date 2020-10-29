var JsonData;
var select = document.getElementById("sampleSelect");
var select2 = document.getElementById("sampleSelect2");
var select3 = document.getElementById("sampleSelect3");

async function ret(){
  var i = 0,j = 0,k = 0,IDSUM = 0;

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

    await alert(k);

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

  try{
    k = await select2.childElementCount;

    await alert(k);

    if(Number(k) == 0){
      var option = await new Array(IDSUM);
      for(i = 0;i < IDSUM;i++){
        option[i] = await document.createElement("option");
        option[i].text = JsonData[i].id;
        option[i].value = i;
        await select2.appendChild(option[i]);
      }
    }

    else if(k < IDSUM || k > IDSUM){
      while(select2.firstChild){
        await select2.removeChild(select.firstChild);
      }

      var option = await new Array(IDSUM);
      for(i = 0;i < IDSUM;i++){
        option[i] = await document.createElement("option");
        option[i].text = JsonData[i].id;
        option[i].value = i;
        await select2.appendChild(option[i]);
      }
    }

    select2.selectedIndex = 0;

    document.getElementById("id").value = decodeURI(JsonData[select2.value].id);
    document.getElementById("dog").value = decodeURI(JsonData[select2.value].dog);
    document.getElementById("cat").value = decodeURI(JsonData[select2.value].cat);

  }catch (err) {await alert(err.message + "@cosmosdbHTMLControl@select");}

  try{
    k = await select3.childElementCount;

    await alert(k);

    if(Number(k) == 0){
      var option = await new Array(IDSUM);
      for(i = 0;i < IDSUM;i++){
        option[i] = await document.createElement("option");
        option[i].text = JsonData[i].id;
        option[i].value = i;
        await select3.appendChild(option[i]);
      }
    }

    else if(k < IDSUM || k > IDSUM){
      while(select3.firstChild){
        await select3.removeChild(select3.firstChild);
      }

      var option = await new Array(IDSUM);
      for(i = 0;i < IDSUM;i++){
        option[i] = await document.createElement("option");
        option[i].text = JsonData[i].id;
        option[i].value = i;
        await select3.appendChild(option[i]);
      }
    }

    select3.selectedIndex = 0;

    document.getElementById("id").value = decodeURI(JsonData[select3.value].id);
    document.getElementById("dog").value = decodeURI(JsonData[select3.value].dog);
    document.getElementById("cat").value = decodeURI(JsonData[select3.value].cat);

  }catch (err) {await alert(err.message + "@cosmosdbHTMLControl@select");}
}



function selectboxChange(){
  document.getElementById("id").value = decodeURI(JsonData[select.value].id);
  document.getElementById("dog").value = decodeURI(JsonData[select.value].dog);
  document.getElementById("cat").value = decodeURI(JsonData[select.value].cat);

  document.getElementById("id").value = decodeURI(JsonData[select2.value].id);
  document.getElementById("dog").value = decodeURI(JsonData[select2.value].dog);
  document.getElementById("cat").value = decodeURI(JsonData[select2.value].cat);

  document.getElementById("id").value = decodeURI(JsonData[select3.value].id);
  document.getElementById("dog").value = decodeURI(JsonData[select3.value].dog);
  document.getElementById("cat").value = decodeURI(JsonData[select3.value].cat);
}



async function del(){
  try{
    await $.post('/post', { processing: 'Delete', id: JsonData[select.value].id}, 'json')
    .done(function(data) {
      alert('JSON Data was able to Delete by system');
    })
    .fail(function() {alert('通信失敗')})
    .always(function() {alert('通信終了')});
  }catch (err) {
    await alert(err.message + "@cosmosdbHTMLControl@dataget");
  }
}
