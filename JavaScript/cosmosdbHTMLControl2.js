var select = document.getElementById("sampleSelect");

async function ret(){
  try{
    await $.post('/post',
    {
      processing: 'Upload',
      firstname: document.getElementById("firstname").value,
      lastname: document.getElementById("lastname").value,
      mailaddress: document.getElementById("mailaddress").value,
      passward: document.getElementById("passward").value
    },
    'json')
    .done(function(data) {alert('JSON Data was able to Upload by system');})
    .fail(function() {alert('通信失敗')});
    //.always(function() {alert('通信終了')});
  }catch (err) {
    await alert(err.message + "@cosmosdbHTMLControl@dataup");
  }

  //alert(typeof document.getElementById("firstname").value) 型判定
}
