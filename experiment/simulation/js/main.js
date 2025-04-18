var index;

        function getSelectedValue() {
            getdata(document.getElementById('userWord').value);
            return false;
        }

        function getdata(ind) {
            if (ind == 'null') {
                alert("Select word");
                document.getElementById("fldiv").innerHTML = "";
                return;
            }
            $('#fldiv').load('exp1.php?index=' + ind + '&root=%&category=%&gender=%&form=%&person=%&tense=%&reference=%&turn=%');
        }

        var lang;
        var src;

        function getOption(temp) {
            temp1 = temp.split("_");
            lang = temp1[0];
            scr = temp1[1];
            document.getElementById("option").innerHTML = "";
            document.getElementById("fldiv").innerHTML = "";

            if (lang == "null") {
                alert("Select language");
                return;
            }
            $('#option').load('exp1_opt.php?lang=' + lang + '&script=' + scr);
        }
    
        (function(i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r;
            i[r] = i[r] || function() {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date();
            a = s.createElement(o), m = s.getElementsByTagName(o)[0];
            a.async = 1;
            a.src = g;
            m.parentNode.insertBefore(a, m)
        })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
        ga('create', 'UA-67558473-1', 'auto');
        ga('send', 'pageview');


//     console.log("main.js is successfully connected!");
// let featuresData = [];

//     // Load features.txt when page loads
//     window.onload = function () {
//       fetch('features.txt')
//         .then(response => response.text())
//         .then(text => {
//           featuresData = text.trim().split("\n").map(line => line.split("\t"));
//         })
//         .catch(error => {
//           console.error("Error loading features.txt:", error);
//         });
//     };

//     function getOption(temp) {
//       const [lang, script] = temp.split("_");

//       document.getElementById("option").innerHTML = "";
//       document.getElementById("fldiv").innerHTML = "";

//       if (lang === "null") {
//         alert("Select language");
//         return;
//       }

//       const words = [];
//       for (const parts of featuresData) {
//         const word = parts[0];
//         const fileLang = parts[7];
//         const fileScript = parts[8];

//         if (!words.includes(word) && fileLang === lang && fileScript === script) {
//           words.push(word);
//         }
//       }

//       // Build dropdown
//       let html = `<p style="font-style:italic;color:blue;">Select a word from the below dropbox and do a morphological analysis on that word</p><br />`;
//       html += `<table width="100%" bgcolor="#FFD4A8"><tr><td align="center">`;
//       html += `<select name="word" id="userWord" onchange="getSelectedValue()">`;
//       html += `<option value="null" selected="selected">---Select Word---</option>`;
//       for (const word of words) {
//         html += `<option value="${word}">${word}</option>`;
//       }
//       html += `</select></td></tr></table>`;

//       document.getElementById("option").innerHTML = html;
//     }

// function getSelectedValue() {
//     const selectedWord = document.getElementById("userWord").value;
//     if (selectedWord === "null") {
//         alert("Select word");
//         document.getElementById("fldiv").innerHTML = "";
//         return;
//     }

//     document.getElementById("fldiv").innerHTML = `<p>You selected: <strong>${selectedWord}</strong></p>`;
// }

// Store features data
let featuresData = [];

// Load features.txt when page loads
window.onload = function () {
  fetch('features.txt')
    .then(response => response.text())
    .then(text => {
      featuresData = text.trim().split("\n").map(line => line.split("\t"));
      console.log("Features data loaded successfully");
    })
    .catch(error => {
      console.error("Error loading features.txt:", error);
    });
};

function getOption(temp) {
  const [lang, script] = temp.split("_");

  document.getElementById("option").innerHTML = "";
  document.getElementById("fldiv").innerHTML = "";

  if (lang === "null") {
    alert("Select language");
    return;
  }

  const words = [];
  for (const parts of featuresData) {
    const word = parts[0];
    const fileLang = parts[7];
    const fileScript = parts[8];

    if (!words.includes(word) && fileLang === lang && fileScript === script) {
      words.push(word);
    }
  }

  // Build dropdown
  let html = `<p style="font-style:italic;color:blue;">Select a word from the below dropbox and do a morphological analysis on that word</p><br />`;
  html += `<table width="100%" bgcolor="#FFD4A8"><tr><td align="center">`;
  html += `<select name="word" id="userWord" onchange="getSelectedValue()">`;
  html += `<option value="null" selected="selected">---Select Word---</option>`;
  for (const word of words) {
    html += `<option value="${word}">${word}</option>`;
  }
  html += `</select></td></tr></table>`;

  document.getElementById("option").innerHTML = html;
}

function getSelectedValue() {
  const selectedWord = document.getElementById("userWord").value;
  if (selectedWord === "null") {
    alert("Select word");
    document.getElementById("fldiv").innerHTML = "";
    return;
  }

  // Call the function that was handling the PHP load
  check(selectedWord, "%", "%", "%", "%", "%", "%", "%");
}

function checkValue(word) {
  document.getElementById("answer").innerHTML = "";
  const root = document.getElementById('root').value;
  const category = document.getElementById('category').value;
  const gender = document.getElementById('gender').value;
  const number = document.getElementById('number').value;
  const person = document.getElementById('person').value;
  const case1 = document.getElementById('case').value;
  const tense = document.getElementById('tense').value;
  
  check(word, root, category, gender, number, person, case1, tense);
  return false;
}

function check(word, root, category, gender, number, person, case1, tense) {
  // Instead of loading from PHP, we'll process the data directly
  displayMorphologicalAnalysis(word, root, category, gender, number, person, case1, tense, "1");
}

function getOptionValue(columnIndex) {
  const options = [];
  const naFlag = featuresData.some(row => row[columnIndex] === "na");
  
  featuresData.forEach(row => {
    if (!options.includes(row[columnIndex]) && row[columnIndex] && row[columnIndex].trim() !== "") {
      options.push(row[columnIndex]);
    }
  });
  
  if (naFlag && !options.includes("na")) {
    options.push("na");
  }
  
  return options;
}

function getOptionValueRestrict(rootValue) {
  const words = [];
  
  featuresData.forEach(row => {
    if (!words.includes(row[0]) && row[1] === rootValue) {
      words.push(row[0]);
    }
  });
  
  return words;
}

function showList(list, selectedValue, selectId) {
  let html = `<select name="${selectId}" id="${selectId}" class="spmHandler" onchange="change()">`;
  
  list.forEach(option => {
    if (option === selectedValue) {
      html += `<option selected="true" value="${option}">${option}</option>`;
    } else {
      html += `<option value="${option}">${option}</option>`;
    }
  });
  
  html += "</select>";
  return html;
}

function checkFeature(value, word, columnIndex) {
  const validValues = [];
  
  featuresData.forEach(row => {
    if (row[0] === word && !validValues.includes(row[columnIndex])) {
      validValues.push(row[columnIndex]);
    }
  });
  
  return validValues.includes(value);
}

function displayCheckIcon(isCorrect) {
  if (isCorrect) {
    return '<img src="right.png" height="25" width="25"/>';
  } else {
    return '<img src="wrong.png" height="25" width="25"/>';
  }
}

function displayMorphologicalAnalysis(word, rootValue, categoryValue, genderValue, formValue, personValue, referenceValue, tenseValue, turn) {
  // Get the root words for this word
  const roots = [];
  featuresData.forEach(row => {
    if (row[0] === word && !roots.includes(row[1])) {
      roots.push(row[1]);
    }
  });
  
  const rootWord = roots[0] || "";
  const myWord = word;

  // Get option lists
  const listROOT = getOptionValueRestrict(rootWord);
  const listCATEGORY = getOptionValue(2);
  const listGENDER = getOptionValue(3);
  const listFORM = getOptionValue(4);
  const listPERSON = getOptionValue(6);
  const listTENSE = getOptionValue(9);
  const listREFERENCE = getOptionValue(5);

  // Set default values
  let cROOT = rootValue;
  let flag = 1;
  if (rootValue === "%") {
    flag = 0;
    cROOT = listROOT[Math.floor(Math.random() * listROOT.length)];
  }
  
  let cCATEGORY = categoryValue;
  if (categoryValue === "%") {
    flag = 0;
    cCATEGORY = listCATEGORY[Math.floor(Math.random() * listCATEGORY.length)];
  }
  
  let cGENDER = genderValue;
  if (genderValue === "%") {
    flag = 0;
    cGENDER = listGENDER[Math.floor(Math.random() * listGENDER.length)];
  }
  
  let cFORM = formValue;
  if (formValue === "%") {
    flag = 0;
    cFORM = listFORM[Math.floor(Math.random() * listFORM.length)];
  }
  
  let cPERSON = personValue;
  if (personValue === "%") {
    flag = 0;
    cPERSON = listPERSON[Math.floor(Math.random() * listPERSON.length)];
  }
  
  let cTENSE = tenseValue;
  if (tenseValue === "%") {
    flag = 0;
    cTENSE = listTENSE[Math.floor(Math.random() * listTENSE.length)];
  }
  
  let cREFERENCE = referenceValue;
  if (referenceValue === "%") {
    flag = 0;
    cREFERENCE = listREFERENCE[Math.floor(Math.random() * listREFERENCE.length)];
  }

  // Build HTML for the morphological analysis form
  let html = '<p style="font-style:italic;color:blue;">Select the Correct morphological analysis for the above word using dropboxes (NOTE : na = not applicable)</p><br/>';
  html += '<style type="text/css">';
  html += '#tick_cross td img { width: 25px; height: 25px; }';
  html += '#outputT { width:921px!important; background-color:#FFD4A8; }';
  html += '#outputT tr td.hidden { display:none; }';
  html += '#outputT tr td img { height:25px; width: 25px; }';
  html += '</style>';
  html += '<table id="outputT">';

  // Flag to check if any answers are wrong
  let flag_chk = 0;

  // Default options
  const default_option = {
    "root": cROOT,
    "category": cCATEGORY,
    "gender": cGENDER,
    "form": cFORM,
    "person": cPERSON, 
    "tense": cTENSE,
    "reference": cREFERENCE
  };

  // Create table rows
  html += '<tr>';
  html += '<td>WORD</td>';
  html += `<td align="center" class="WORD" style="color:red;font-weight:bold">${myWord}</td>`;
  html += '</tr>';

  // ROOT row
  html += '<tr>';
  html += '<td>ROOT</td>';
  html += `<td align="center" class="ROOT">${showList(listROOT, default_option.root, "root")}</td>`;
  
  let checkFlag = checkFeature(cROOT, myWord, 1);
  if (!checkFlag) flag_chk = 1;
  html += `<td align="center" class="check ${!flag ? 'hidden' : ''}">${displayCheckIcon(checkFlag)}</td>`;
  html += '</tr>';

  // CATEGORY row
  html += '<tr>';
  html += '<td>CATEGORY</td>';
  html += `<td align="center" class="CATEGORY">${showList(listCATEGORY, default_option.category, "category")}</td>`;
  
  checkFlag = checkFeature(cCATEGORY, myWord, 2);
  if (!checkFlag) flag_chk = 1;
  html += `<td align="center" class="check ${!flag ? 'hidden' : ''}">${displayCheckIcon(checkFlag)}</td>`;
  html += '</tr>';

  // GENDER row
  html += '<tr>';
  html += '<td>GENDER</td>';
  html += `<td align="center" class="GENDER">${showList(listGENDER, default_option.gender, "gender")}</td>`;
  
  checkFlag = checkFeature(cGENDER, myWord, 3);
  if (!checkFlag) flag_chk = 1;
  html += `<td align="center" class="check ${!flag ? 'hidden' : ''}">${displayCheckIcon(checkFlag)}</td>`;
  html += '</tr>';

  // NUMBER row
  html += '<tr>';
  html += '<td>NUMBER</td>';
  html += `<td align="center" class="NUMBER">${showList(listFORM, default_option.form, "number")}</td>`;
  
  checkFlag = checkFeature(cFORM, myWord, 4);
  if (!checkFlag) flag_chk = 1;
  html += `<td align="center" class="check ${!flag ? 'hidden' : ''}">${displayCheckIcon(checkFlag)}</td>`;
  html += '</tr>';

  // PERSON row
  html += '<tr>';
  html += '<td>PERSON</td>';
  html += `<td align="center" class="PERSON">${showList(listPERSON, default_option.person, "person")}</td>`;
  
  checkFlag = checkFeature(cPERSON, myWord, 6);
  if (!checkFlag) flag_chk = 1;
  html += `<td align="center" class="check ${!flag ? 'hidden' : ''}">${displayCheckIcon(checkFlag)}</td>`;
  html += '</tr>';

  // CASE row
  html += '<tr>';
  html += '<td>CASE</td>';
  html += `<td align="center" class="CASE">${showList(listREFERENCE, default_option.reference, "case")}</td>`;
  
  checkFlag = checkFeature(cREFERENCE, myWord, 5);
  if (!checkFlag) flag_chk = 1;
  html += `<td align="center" class="check ${!flag ? 'hidden' : ''}">${displayCheckIcon(checkFlag)}</td>`;
  html += '</tr>';

  // TENSE row
  html += '<tr>';
  html += '<td>TENSE</td>';
  html += `<td align="center" class="TENSE">${showList(listTENSE, default_option.tense, "tense")}</td>`;
  
  checkFlag = checkFeature(cTENSE, myWord, 9);
  if (!checkFlag) flag_chk = 1;
  html += `<td align="center" class="check ${!flag ? 'hidden' : ''}">${displayCheckIcon(checkFlag)}</td>`;
  html += '</tr>';

  // Button row
  html += '<tr>';
  html += `<td align="center"><button onclick="checkValue('${myWord}');">Check</button></td>`;
  html += `<td class="${!flag ? 'hidden' : ''}">`;

  if (flag_chk === 0 && turn !== "%") {
    html += '<br/><br/><p id="right_wrong" style="text-align:center;font-size:30px;color:#008000">Right answer!!!</p>';
  } else if (flag_chk === 1) {
    html += '<br/><br/><p id="right_wrong" style="text-align:center;font-size:30px;color:#FF0000">Wrong answer!!!</p>';
    html += `<br/><br/><div id="get_hide"><button onclick="getAnswer('${myWord}');">Get Answers</button></div>`;
  }

  html += '</td></tr>';
  html += '</table>';
  html += '<br/><br/><div align="center" id="answer"></div>';

  // Set the HTML to the fldiv element
  document.getElementById("fldiv").innerHTML = html;

  // Show hidden elements if necessary
  if (flag === 1) {
    const hiddenElements = document.querySelectorAll('#outputT tr td.hidden');
    hiddenElements.forEach(element => {
      element.classList.remove('hidden');
    });
  }
}

function displayAnswers(word) {
  // Create a function to fetch and display answers for a given word
  fetch("features.txt")
    .then((response) => response.text())
    .then((text) => {
      const featuresData = text
        .trim()
        .split("\n")
        .map((line) => line.split("\t"));

      // Start building the HTML table
      let html = '<br/><table id="outputT" width="100%" bgcolor="#FFD4A8">';
      html += "<tr>";
      html += "<th>WORD</th>";
      html += "<th>ROOT</th>";
      html += "<th>CATEGORY</th>";
      html += "<th>GENDER</th>";
      html += "<th>NUMBER</th>";
      html += "<th>PERSON</th>";
      html += "<th>CASE</th>";
      html += "<th>TENSE</th>";
      html += "</tr>";

      // Filter the data for the selected word and add rows
      featuresData.forEach((row) => {
        if (row[0] === word) {
          html += "<tr>";
          html += `<td align="center" style="color:red;font-weight:bold">${row[0]}</td>`;
          html += `<td align="center">${row[1]}</td>`;
          html += `<td align="center">${row[2]}</td>`;
          html += `<td align="center">${row[3]}</td>`;
          html += `<td align="center">${row[4]}</td>`;
          html += `<td align="center">${row[6]}</td>`;
          html += `<td align="center">${row[5]}</td>`;
          html += `<td align="center">${row[9]}</td>`;
          html += "</tr>";
        }
      });

      html += "</table>";

      // Set the HTML content to the answer div
      document.getElementById("answer").innerHTML = html;
    })
    .catch((error) => {
      console.error("Error loading features.txt:", error);
      document.getElementById("answer").innerHTML = "<p>Error loading data</p>";
    });
}

// This function would be called when the "Get Answers" button is clicked
function getAnswer(word) {
  document.getElementById(
    "get_hide"
  ).innerHTML = `<button onclick="hideAnswer('${word}');">Hide Answers</button>`;
  displayAnswers(word);
}

// This function would be called when the "Hide Answers" button is clicked
function hideAnswer(word) {
  document.getElementById(
    "get_hide"
  ).innerHTML = `<button onclick="getAnswer('${word}');">Get Answers</button>`;
  document.getElementById("answer").innerHTML = "";
}