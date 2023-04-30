import React from "react";
import { AllOpenedJobs } from "../utills/AllOpenedJobs";
import { LoggedUserData } from "../utills/LoggedUserData";
import JobBasedOnLocation from "../Recommendation/JobBasedOnLocation";
import ReactLoading from "react-loading";

const AlgorithmLocation = () => {
  const allJobsDetails = AllOpenedJobs();
  const LoggedUserDetails = LoggedUserData();

  const locationJob = allJobsDetails.map((item,index)=>{
    return {id:item._id,text:item.selectedValueProvince + "," + item.selectedValueDistrict+ "," +item.selectedValueStreet}
  });
  // console.log(locationJob)

  const wordLocation = LoggedUserDetails?.selectedValueProvince + "," + LoggedUserDetails?.selectedValueDistrict+ "," +LoggedUserDetails?.selectedValueStreet;

  const splitwordLocation = wordLocation?.split(",");

  // console.log(splitwordLocation)

const termFrequency = locationJob.map((document) => {
  const words = document.text.split(",");
  const counts = {};
  const totalWords = words.length;

  words.forEach((word) => {
    counts[word] = counts[word] ? counts[word] + 1 : 1;
  });

  Object.keys(counts).forEach((word) => {
    counts[word] = counts[word] / totalWords;
  });

  return { id: document.id, counts };
});

console.log(termFrequency)
// Calculate the IDF for each word
const idf = {};
const N = locationJob.length;

splitwordLocation.forEach((w) => {
  let count = 0;
  termFrequency.forEach((document) => {
    if (document.counts[w]) {
      count++;
    }
  });
  idf[w] = Math.log(N / count);
  if (!isFinite(idf[w])) {
    idf[w] = 0;
  }
});

console.log(idf)
// Calculate the TF-IDF for each document and word
const tfIdf = termFrequency.map((document) => {
  const tfidf = {};

  splitwordLocation.forEach((w) => {
    tfidf[w] = document.counts[w] ? document.counts[w] * idf[w] : 0;
  });
  return { id: document.id, tfidf };
});

console.log(tfIdf)
// Calculate the cosine similarity between the word and each document
const wordVector = splitwordLocation.map((w) => {
  const idfValue = idf[w] ? idf[w] : 0;
  return idfValue;
});
console.log(wordVector)

const cosineSimilarity = tfIdf.map((document) => {
  const docVector = splitwordLocation.map((w) => {
    const tfIdfValue = document.tfidf[w] ? document.tfidf[w] : 0;
    return tfIdfValue;
  });

  const dotProduct = wordVector.reduce(
    (accumulator, currentValue, index) =>
      accumulator + currentValue * docVector[index],
    0
  );

  const magnitudeDoc = Math.sqrt(
    docVector.reduce((accumulator, currentValue) => accumulator + currentValue ** 2, 0)
  );

  const magnitudeWord = Math.sqrt(
    wordVector.reduce((accumulator, currentValue) => accumulator + currentValue ** 2, 0)
  );

  let similarity = dotProduct / (magnitudeDoc * magnitudeWord);
  if (isNaN(similarity)) {
    similarity = 0;
  }
  else {
    similarity = Number(similarity.toFixed(2));
  }

  return { id: document.id, similarity };
});

console.log(cosineSimilarity);
const calculateScore = cosineSimilarity.filter(item=>item.similarity>0.4)

  return (  
    <>
    <JobBasedOnLocation recmndTitle={"Recommended For You Based On Your Location"} cosineSimilarity={calculateScore} />
    </>
  )
}

export default AlgorithmLocation