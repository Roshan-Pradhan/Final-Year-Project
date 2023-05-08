import React from "react";
import { AllOpenedJobs } from "../utills/AllOpenedJobs";
import { LoggedUserSkills } from "../utills/LoggedUserSkills";
import JobBasedOnLocation from "./JobBasedOnLocation";
const AlgoSkills = () => {
  const allJobsDetails = AllOpenedJobs();
  const LoggedUserSkillsDetails = LoggedUserSkills();
  //--------------------------------------------------------------------------------
  const jobKeySkills = allJobsDetails.map((item) => {
    const getKeySkills = JSON.parse(item.Keyskills);
    const skillNames = getKeySkills.map((skill) => skill.name);
    const skillsString = skillNames.join(", ").toLowerCase();
    return { id: item._id, skills: skillsString?.split(",") };
  });
  //--------------------------------------------------------------------------------
  const userSkills = LoggedUserSkillsDetails?.skills;
  const stringSkills = JSON.parse(userSkills ? userSkills : null);
  const joinSkills = stringSkills?.map((skill) => skill.name);
  const finaluserSkills = joinSkills?.join(", ").toLowerCase();
  const splitfinaluserSkills = finaluserSkills?.split(",");

  const userA = splitfinaluserSkills;
  const vocabularyA = new Set(userA);

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

  const similarities = jobKeySkills.map((jobsB) => {
    const vocabularyB = new Set(jobsB.skills);
    const combinedVocabulary = new Set([...vocabularyA, ...vocabularyB]);
    const vectorA = Array.from(combinedVocabulary).map((term) =>
      userA?.includes(term) ? 1 : 0
    );
    const vectorB = Array.from(combinedVocabulary).map((term) =>
      jobsB.skills?.includes(term) ? 1 : 0
    );
    return {
      id: jobsB.id,
      similarity: calculateCosineSimilarity(vectorA, vectorB),
    };
  });


  return (
    <>
      <JobBasedOnLocation
        recmndTitle={"Recommended For You Based On Your Skills"}
        cosineSimilarity={similarities}
      />
    </>
  );
};

export default AlgoSkills;
