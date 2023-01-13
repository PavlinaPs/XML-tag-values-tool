const fileName = document.getElementById("fileName");
const tagName = document.getElementById("tagName");
const form = document.getElementById("form");
const tableBody = document.getElementById("tableBody");
const resetTag = document.getElementById("reset-tag");
const resetFilename = document.getElementById("reset-filename");

const fetchValues = async (name1, name2) => {
  let tagValuesArray = [];
  try {
    const response = await fetch(name1);
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

  for (const [key, value] of Object.entries(valuesObject)) {
    let row = `<tr>
                <td>${key}</td>
                <td>${value}</td>
              </tr>`;
    tableBody.innerHTML += row;
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetchValues(fileName.value, tagName.value);
});
