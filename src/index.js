/* Course: CT30A3203 Web Applications
Week 3 excercises
Author: Niklas Kumpulainen
Date: 24.9.2021
Sources:
https://www.tabnine.com/academy/javascript/how-to-get-an-objects-keys-and-values/

*/

import "./styles.css";

if (document.readyState !== "loading") {
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initializeCode();
  });
}

async function initializeCode() {
  const genbtn = document.getElementById("generate-button");

  await genbtn.addEventListener("click", function () {
    AddWikiItem();
  });
  //loadJson();
}

async function AddWikiItem() {
  let breedname = await getRandomBreedName();
  let breedsrcimage = await getBreedImageSRC(breedname);
  let breedSummary = await getBreedWikiSummary(breedname);
  const _container = document.getElementsByClassName("container");
  let wikiitem = document.createElement("div");
  wikiitem.className = "wiki-item";

  let wikiheader = document.createElement("h1");
  wikiheader.className = "wiki-header";
  //ADD HEADER FROM JSON
  wikiheader.innerHTML = breedname;
  wikiitem.appendChild(wikiheader);

  let wikicontent = document.createElement("div");
  wikicontent.className = "wiki-content";

  let wikitext = document.createElement("p");
  //ADD TEXT FROM JSON
  wikitext.innerHTML = breedSummary;
  wikitext.className = "wiki-text";
  wikicontent.appendChild(wikitext);

  let imagecontainer = document.createElement("div");
  imagecontainer.className = "img-container";

  //ADD IMG SRC FROM JSON
  let wikiimg = document.createElement("img");
  wikiimg.className = "wiki-img";
  wikiimg.setAttribute("src", breedsrcimage);
  wikiimg.setAttribute("width", 200);
  wikiimg.setAttribute("height", 200);

  imagecontainer.appendChild(wikiimg);

  wikicontent.appendChild(imagecontainer);

  wikiitem.appendChild(wikicontent);

  _container[0].appendChild(wikiitem);
}

async function getRandomBreedName() {
  //fetch list of all breeds
  let url = "https://dog.ceo/api/breeds/list/all";
  let response = await fetch(url);

  let breeds = await response.json();
  //find random breed
  var randombreedname = Object.keys(breeds.message)[
    Math.floor(Math.random() * Object.keys(breeds.message).length)
  ];
  //console.log(randombreedname);
  return String(randombreedname);
}

async function getBreedImageSRC(breedname) {
  //fetch list of all breeds
  console.log(breedname);
  let url = String("https://dog.ceo/api/breed/" + breedname + "/images/random");
  let response = await fetch(url);

  let imagesrc = await response.json();
  return imagesrc.message;
}

async function getBreedWikiSummary(breedname) {
  let url = String(
    "https://en.wikipedia.org/api/rest_v1/page/summary/" + breedname
  );
  let response = await fetch(url);

  let summaryString = await response.json();
  //console.log(summaryString.extract);
  return summaryString.extract;
}
