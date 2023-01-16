const fileName = document.getElementById("fileName");
const tagName = document.getElementById("tagName");
const form = document.getElementById("form");
const tableBody = document.getElementById("tableBody");
const resetTag = document.getElementById("reset-tag");
const resetFilename = document.getElementById("reset-filename");
const resetResult = document.getElementById("reset-result");
const clearAll = document.getElementById("clear-all");

const fetchValues = async (name1, name2) => {
  let tagValuesArray = [];
  try {
    const response = await fetch(`../${name1}`);
    if (name1 === "") {
      alert(
        "XML soubor není k dispozici. Zkontrolujte, prosím, zda je xml soubor ve složce xml-tag-values"
      );
    }
    data = await response.text();
    const parser = new DOMParser();
    const xmlDOM = parser.parseFromString(data, "text/xml");
    const entries = xmlDOM.querySelectorAll("book");
    entries.forEach((entry) => {
      let tagValue = entry.getElementsByTagName(name2)[0].innerHTML;
      tagValuesArray.push(tagValue);
    });
  } catch (err) {
    console.log(err);
  }

  let valuesObject = tagValuesArray.reduce((acc, cur) => {
    return {
      ...acc,
      [cur]: Number(acc[cur] || []) + 1,
    };
  }, {});

  let entries = Object.entries(valuesObject);
  let sortedEntries = entries.sort((a, b) => b[1] - a[1]);

  for (const entry of sortedEntries) {
    let row = `<tr>
                <td>${entry[0]}</td>
                <td>${entry[1]}</td>
              </tr>`;
    tableBody.innerHTML += row;
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetchValues(fileName.value, tagName.value);
});

resetTag.addEventListener("click", () => {
  tagName.value = "";
  tagValuesArray = [];
});

resetFilename.addEventListener("click", () => (fileName.value = ""));

resetResult.addEventListener("click", () => {
  tagValuesArray = [];
  tableBody.innerHTML = "";
});

clearAll.addEventListener("click", () => {
  tagName.value = "";
  fileName.value = "";
  tagValuesArray = [];
  tableBody.innerHTML = "";
});
