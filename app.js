const fileName = document.getElementById("fileName");
const tagName = document.getElementById("tagName");
const form = document.getElementById("form");
const tableBody = document.getElementById("tableBody");
let valuesObject = {};

async function fetchValues(name1, name2) {
  let tagValuesArray = [];

  try {
    const response = await fetch(name1);
    data = await response.text();
    const parser = new DOMParser();
    const xmlDOM = parser.parseFromString(data, "text/xml");
    const entries = xmlDOM.querySelectorAll("book");
    entries.forEach((entry) => {
      console.log(entry.getElementsByTagName(name2)[0].innerHTML);
      let tagValue = entry.getElementsByTagName(name2)[0].innerHTML;
      tagValuesArray.push(tagValue);
    });
  } catch (err) {
    console.log(err);
  }
  organizeValues(tagValuesArray);
  displayValues(valuesObject);
}

function organizeValues(array) {
  valuesObject = array.reduce((acc, cur) => {
    return {
      ...acc,
      [cur]: Number(acc[cur] || []) + 1,
    };
  }, {});
}

const displayValues = (object) => {
  console.log(object);
  for (const [key, value] of Object.entries(object)) {
    let row = `<tr>
                <td>${key}</td>
                <td>${value}</td>
              </tr>`;
    tableBody.innerHTML += row;
  }
};

form.addEventListener("submit", () => {
  fetchValues(fileName.value, tagName.value);
});
