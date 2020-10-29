var JsonData;
var select = [];
select[0] = document.getElementById("sampleSelect");
select[1] = document.getElementById("sampleSelect2");
select[2] = document.getElementById("sampleSelect3");

async function ret(){
  var i = 0,j = 0,k = 0,IDSUM = 0;

  try{
    await $.post('/post', { processing: 'Download' }, 'json')
    .done(function(data) {
      JsonData = data;
      for (const itemDef of data) {IDSUM++;}
      alert('JSON Data was able to Download by system');
    })
    .fail(function() {alert('通信失敗')});
    //.always(function() {alert('通信終了')});
  }catch (err) {
    await alert(err.message + "@cosmosdbHTMLControl@dataget");
  }

  try{
    for(i = 0;i < 3;i++){
      k = await select[i].childElementCount;

      //await alert(k);

      if(Number(k) == 0 && IDSUM != 0){
        var option = await new Array(IDSUM);
        for(j = 0;j < IDSUM;j++){
          option[j] = await document.createElement("option");
          option[j].text = JsonData[j].id;
          option[j].value = j;
          await select[i].appendChild(option[j]);
        }
      }

      else if(k < IDSUM || k > IDSUM){
        while(select[i].firstChild){
          await select[i].removeChild(select[i].firstChild);
        }

        var option = await new Array(IDSUM);
        for(j = 0;j < IDSUM;j++){
          option[j] = await document.createElement("option");
          option[j].text = JsonData[j].id;
          option[j].value = j;
          await select[i].appendChild(option[j]);
        }
      }

      else{
        alert("Data is Not Store");
        break;
      }

      if(i < 2)select[i].selectedIndex = 0;
      else select[i].selectedIndex = IDSUM - 1;


    }

    document.getElementById("id").value = decodeURI(JsonData[select[0].value].id);
    document.getElementById("dog").value = decodeURI(JsonData[select[0].value].dog);
    document.getElementById("cat").value = decodeURI(JsonData[select[0].value].cat);
  }catch (err) {await alert(err.message + "@cosmosdbHTMLControl@select");}
}



function selectboxChange(){
  document.getElementById("id").value = decodeURI(JsonData[select[0].value].id);
  document.getElementById("dog").value = decodeURI(JsonData[select[0].value].dog);
  document.getElementById("cat").value = decodeURI(JsonData[select[0].value].cat);
}



async function del(){
  try{
    await $.post('/post', { processing: 'Delete', id: JsonData[select[0].value].id}, 'json')
    .done(function(data) {
      alert('JSON Data was able to Delete by system');
    })
    .fail(function() {alert('通信失敗')})
    .always(function() {alert('通信終了')});
  }catch (err) {
    await alert(err.message + "@cosmosdbHTMLControl@dataget");
  }
}

async function del_all(){
  try{
    await $.post('/post', { processing: 'Delete-ALL', id1: JsonData[select[1].value].id, id2: JsonData[select[2].value].id}, 'json')
    .done(function(data) {
      alert('JSON Data was able to Delete by system');
    })
    .fail(function() {alert('通信失敗')})
    .always(function() {alert('通信終了')});
  }catch (err) {
    await alert(err.message + "@cosmosdbHTMLControl@dataget");
  }
}
