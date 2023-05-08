import React from "react";
import { AllOpenedJobs } from "../utills/AllOpenedJobs";
import { LoggedUserQualification } from "../utills/LoggedUserQualification";
import JobBasedOnLocation from "./JobBasedOnLocation";
const AlgoQualification = () => {
  const allJobsDetails = AllOpenedJobs();
  const LoggedUserSkillsDetails = LoggedUserQualification();

  //--------------------------------------------------------------------------------
  const jobQualification = allJobsDetails.map((item) => {
    const getKeySkills = JSON.parse(item.Skills);
    const skillNames = getKeySkills.map((skill) => skill.name);
    const skillsString = skillNames.join(", ").toLowerCase();
    const Qualification = item?.selectedValueQualification.map((quali)=>quali)
    const QualificationString = Qualification.join(", ").toLowerCase();
    const finalEduArr = QualificationString + "," + skillsString;
    return { id: item._id, education: finalEduArr.split(",") };
  });

      //--------------------------------------------------------------------------------
  const userQualification = LoggedUserSkillsDetails?.userEducation;
  console.log(userQualification)
  const getUserQualification = userQualification?.map((quali)=>quali.Qualification + ", " +  quali.Course )
  const finaluserEducation = getUserQualification?.join(", ").toLowerCase();
  const splituserEducation = finaluserEducation?.split(",");
  console.log(splituserEducation)

  const userA = splituserEducation;
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

  const similarities = jobQualification.map((jobsB) => {
    const vocabularyB = new Set(jobsB.education);
    console.log(vocabularyB)
    const combinedVocabulary = new Set([...vocabularyA, ...vocabularyB]);
    console.log(combinedVocabulary);
    const vectorA = Array.from(combinedVocabulary).map((term) =>
      userA?.includes(term) ? 1 : 0
    );
    console.log(vectorA);
    const vectorB = Array.from(combinedVocabulary).map((term) =>
      jobsB.education?.includes(term) ? 1 : 0
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
        recmndTitle={"Recommended For You Based On Your Qualification"}
        cosineSimilarity={calculateScore}
      />
    </>
  );
};

export default AlgoQualification;
