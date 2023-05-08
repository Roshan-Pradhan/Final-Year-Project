import React from "react";
import { AllOpenedJobs } from "../utills/AllOpenedJobs";

import JobBasedOnLocation from "./JobBasedOnLocation";
import { LoggedUserData } from "../utills/LoggedUserData";
const AlgoLocation = () => {
  const allJobsDetails = AllOpenedJobs();
  const LoggedUserDetails = LoggedUserData();



  //--------------------------------------------------------------------------------
  const locationJob = allJobsDetails.map((item,index)=>{
    const locationArr = item.selectedValueProvince + "," + item.selectedValueDistrict+ "," +item.selectedValueStreet
    return {id:item._id,location:locationArr.split(",")}
  });


  const userLocation = LoggedUserDetails?.selectedValueProvince + "," + LoggedUserDetails?.selectedValueDistrict+ "," +LoggedUserDetails?.selectedValueStreet;

  const splitwordLocation = userLocation?.split(",");


  const userA = splitwordLocation;
  const vocabularyA = new Set(userA);
  console.log(vocabularyA);

  // Step 2: Calculate vocabulary and vector representation for each array in b, and compute cosine similarity
  const calculateCosineSimilarity = (vectorA, vectorB) => {
    const dotProduct = (vectorA, vectorB) => {
      let product = 0;
      for (let i = 0; i < vectorA.length; i++) {
        product += vectorA[i] * vectorB[i];
      }
      return product;
    };

    const magnitude = (vector) => {
      let sum = 0;
      for (const value of vector) {
        sum += value * value;
      }
      return Math.sqrt(sum);
    };

    const cosineSimilarity = (vectorA, vectorB) => {
      const dotProd = dotProduct(vectorA, vectorB);
      const magnitudeA = magnitude(vectorA);
      const magnitudeB = magnitude(vectorB);
      return dotProd / (magnitudeA * magnitudeB);
    };

    return cosineSimilarity(vectorA, vectorB);
  };

  const similarities = locationJob.map((jobsB) => {
    const vocabularyB = new Set(jobsB.location);
    console.log(vocabularyB)
    const combinedVocabulary = new Set([...vocabularyA, ...vocabularyB]);
    console.log(combinedVocabulary);
    const vectorA = Array.from(combinedVocabulary).map((term) =>
      userA?.includes(term) ? 1 : 0
    );
    console.log(vectorA);
    const vectorB = Array.from(combinedVocabulary).map((term) =>
      jobsB.location?.includes(term) ? 1 : 0
    );
    console.log(vectorB);
    return {
      id: jobsB.id,
      similarity: calculateCosineSimilarity(vectorA, vectorB),
    };
  });
  const calculateScore = similarities.filter(item=>item.similarity>0.5)

  console.log(similarities);

  return (
    <>
      <JobBasedOnLocation
        recmndTitle={"Recommended For You Based On Your Location"}
        cosineSimilarity={calculateScore}
      />
    </>
  );
};

export default AlgoLocation;
