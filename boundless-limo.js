function doGet(e) {
  var phone = e.parameter.phone;
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var rows = sheet.getDataRange().getValues();
  
  // Clean phone for matching (removes dashes)
  var cleanInput = phone.replace(/\D/g, "");

  for (var i = 1; i < rows.length; i++) {
    var cleanSheetPhone = rows[i][3].toString().replace(/\D/g, ""); // Column D (Phone)
    
    if (cleanSheetPhone === cleanInput) {
      var fullName = rows[i][4].toString().trim(); // Column E (Name)
      var firstName = fullName.split(" ")[0]; 

      return ContentService.createTextOutput(JSON.stringify({
        found: true,
        firstName: firstName
      })).setMimeType(ContentService.MimeType.JSON);
    }
  }
  return ContentService.createTextOutput(JSON.stringify({ found: false }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([new Date(), data.pickup, data.dropoff, data.phone, data.firstName + " " + data.lastName, data.email, data.passengers]);
  return ContentService.createTextOutput(JSON.stringify({"result": "success"})).setMimeType(ContentService.MimeType.JSON);
}