const baseUrl = "https://developer.nps.gov/api/v1/";

async function getJson(endpoint) {
  const apiKey = "api key"; 
  const url = baseUrl + endpoint;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": apiKey
    }
  };
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data); 
  return data;
}

function listTemplate(item) {
  return `<li><a href="${item.url}" target="_blank">${item.fullName}</a> (${item.states})</li>`;
}

async function renderClimbingList() {
  const endpoint = "activities/parks?q=climbing";
  const listElement = document.getElementById("outputList");
  const data = await getJson(endpoint);

  const parks = data.data.flatMap(activity => activity.parks);

  const uniqueParks = Array.from(
    new Map(parks.map(park => [park.parkCode, park])).values()
  );

  const listHtml = uniqueParks.map(listTemplate).join("");
  listElement.innerHTML = listHtml;
}

renderClimbingList();
