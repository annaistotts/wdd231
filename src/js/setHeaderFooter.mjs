import { parkInfoTemplate, footerTemplate } from "./templates.mjs";

function setHeaderInfo(data) {
  document.querySelector(".disclaimer a").href = data.url;
  document.querySelector(".disclaimer a").innerHTML = data.fullName;
  document.querySelector("head > title").textContent = data.fullName;

  const heroImage = document.querySelector(".hero-banner > img");
  heroImage.src = data.images[0].url;
  heroImage.alt = data.images[0].altText;

  document.querySelector(".hero-banner__content").innerHTML =
    parkInfoTemplate(data);
}

function setFooter(data) {
  document.querySelector("#park-footer").innerHTML = footerTemplate(data);
}

export default function setHeaderFooter(data) {
  setHeaderInfo(data);
  setFooter(data);
}
