var JsonData;
var select = document.getElementById("sampleSelect");

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

    document.getElementById("firstname").value = decodeURI(JsonData[select.value].firstname);
    document.getElementById("lastname").value = decodeURI(JsonData[select.value].lastname);
    document.getElementById("mailaddress").value = decodeURI(JsonData[select.value].mailaddress);
    document.getElementById("passward").value = decodeURI(JsonData[select.value].passward);

  }catch (err) {await alert(err.message + "@cosmosdbHTMLControl@select");}
}



function selectboxChange(){
  document.getElementById("firstname").value = decodeURI(JsonData[select.value].firstname);
  document.getElementById("lastname").value = decodeURI(JsonData[select.value].lastname);
  document.getElementById("mailaddress").value = decodeURI(JsonData[select.value].mailaddress);
  document.getElementById("passward").value = decodeURI(JsonData[select.value].passward);
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
