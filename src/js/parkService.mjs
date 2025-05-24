const baseUrl = "https://developer.nps.gov/api/v1/";
const apiKey = import.meta.env.VITE_NPS_API_KEY;

async function getJson(url) {
  const options = {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey
    }
  };
  const response = await fetch(baseUrl + url, options);
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error("API response not ok");
  }
}

export async function getParkData() {
  const parkData = await getJson("parks?parkCode=yell"); // Change parkCode as desired
  return parkData.data[0]; // Return first park in the result
}

export function getInfoLinks(images) {
  const defaultLinks = [
    {
      name: "Current Conditions &#x203A;",
      link: "conditions.html",
      description:
        "See what conditions to expect in the park before leaving on your trip!"
    },
    {
      name: "Fees and Passes &#x203A;",
      link: "fees.html",
      description: "Learn about the fees and passes that are available."
    },
    {
      name: "Visitor Centers &#x203A;",
      link: "visitor_centers.html",
      description: "Learn about the visitor centers in the park."
    }
  ];

  // Match image to each link by index offset (skip banner image)
  return defaultLinks.map((item, index) => {
    return {
      ...item,
      image: images[index + 2]?.url || "" // fallback to blank if undefined
    };
  });
}
