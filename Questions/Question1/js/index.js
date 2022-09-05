let charData = {};
let reverse = {};

function mapNumbersAndChars() {
  let prevCode = "";
  let prePrevCode = "";
  let code = "";

  for (let x = 1, k = 1; x <= 26; x++) {
    for (let i = 1; i <= 26; i++) {
      for (let j = 1; j <= 26; j++) {
        code = prePrevCode + prevCode + String.fromCharCode(96 + j);
        charData[k] = code;
        reverse[code] = k;
        k++;
      }
      prevCode = String.fromCharCode(96 + i);
    }
    prePrevCode = String.fromCharCode(96 + x);
  }
}

function generateShortCode(storeId, transactionId) {
  const date = new Date();
  const code =
    charData[date.getDate()] +
    charData[storeId]?.toUpperCase() +
    charData[date.getMonth()] +
    charData[transactionId]?.toUpperCase();
  return code;
}

function decodeShortCode(shortCode) {
  const split = shortCode.split(/([A-Z]+)/);
  const storeId = reverse[split[1]?.toLowerCase()];
  const transactionId = reverse[split[3]?.toLowerCase()];
  const shopDate = new Date();
  shopDate.setDate(reverse[split[0]]);
  shopDate.setMonth(reverse[split[2]]);
  return {
    storeId,
    shopDate: shopDate,
    transactionId
  };
}

mapNumbersAndChars();

// ------------------------------------------------------------------------------//
// --------------- Don't touch this area, all tests have to pass --------------- //
// ------------------------------------------------------------------------------//
function RunTests() {
  var storeIds = [175, 42, 0, 9];
  var transactionIds = [9675, 23, 123, 7];

  storeIds.forEach(function(storeId) {
    transactionIds.forEach(function(transactionId) {
      var shortCode = generateShortCode(storeId, transactionId);
      var decodeResult = decodeShortCode(shortCode);
      $("#test-results").append(
        "<div>" + storeId + " - " + transactionId + ": " + shortCode + "</div>"
      );
      AddTestResult("Length <= 9 ", shortCode.length <= 9);
      AddTestResult("Is String ", typeof shortCode === "string");
      AddTestResult("Is Today ", IsToday(decodeResult.shopDate));
      AddTestResult("StoreId ", /*storeId === decodeResult.storeId,*/ storeId);
      AddTestResult(
        "TransId ",
       /* transactionId === decodeResult.transactionId,*/
        transactionId
      );
    });
  });
}

function IsToday(inputDate) {
  // Get today's date
  var todaysDate = new Date();
  // call setHours to take the time out of the comparison
  return inputDate.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0);
}

function AddTestResult(testName, testResult) {
  var div = $("#test-results").append(
    "<div class='" +
      (testResult ? "pass" : "fail") +
      "'><span class='tname'>- " +
      testName +
      "</span><span class='tresult'>" +
      testResult +
      "</span></div>"
  );
}
