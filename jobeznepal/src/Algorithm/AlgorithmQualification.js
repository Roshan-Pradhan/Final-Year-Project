import React from "react";
import { AllOpenedJobs } from "../utills/AllOpenedJobs";
import JobBasedOnLocation from "../Recommendation/JobBasedOnLocation";
import { LoggedUserQualification } from "../utills/LoggedUserQualification";

const AlgorithmQualification = () => {
  const allJobsDetails = AllOpenedJobs();
  const LoggedUserSkillsDetails = LoggedUserQualification();


//--------------------------------------------------------------------------------
  const jobKeySkills = allJobsDetails.map((item) => {
    const getKeySkills = JSON.parse(item.Skills);
    const skillNames = getKeySkills.map((skill) => skill.name);
    const skillsString = skillNames.join(", ").toLowerCase();
    const Qualification = item?.selectedValueQualification.map((quali)=>quali)
    const QualificationString = Qualification.join(", ").toLowerCase();
    return { id: item._id, skills: QualificationString + ", " + skillsString };
  });

console.log(jobKeySkills)
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------
const userQualification = LoggedUserSkillsDetails?.userEducation;
const getUserQualification = userQualification?.map((quali)=>quali.Qualification + ", " +  quali.Course )
const finaluserEducation = getUserQualification?.join(", ").toLowerCase();
const splituserEducation = finaluserEducation?.split(",");
console.log(splituserEducation)
//--------------------------------------------------------------------------------




  const termFrequency = jobKeySkills.map((document) => {
    const words = document.skills.split(",");
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

  // Calculate the IDF for each word
  const idf = {};
  const N = jobKeySkills.length;

  splituserEducation?.forEach((w) => {
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

  // Calculate the TF-IDF for each document and word
  const tfIdf = termFrequency.map((document) => {
    const tfidf = {};

    splituserEducation?.forEach((w) => {
      tfidf[w] = document.counts[w] ? document.counts[w] * idf[w] : 0;
    });
    return { id: document.id, tfidf };
  });

  // Calculate the cosine similarity between the word and each document
  const wordVector = splituserEducation?.map((w) => {
    const idfValue = idf[w] ? idf[w] : 0;
    return idfValue;
  });

  const cosineSimilarity = tfIdf.map((document) => {
    const docVector = splituserEducation?.map((w) => {
      const tfIdfValue = document.tfidf[w] ? document.tfidf[w] : 0;
      return tfIdfValue;
    });

    const dotProduct = wordVector?.reduce(
      (accumulator, currentValue, index) =>
        accumulator + currentValue * docVector[index],
      0
    );

    const magnitudeDoc = Math.sqrt(
      docVector?.reduce((accumulator, currentValue) => accumulator + currentValue ** 2, 0)
    );

    const magnitudeWord = Math.sqrt(
      wordVector?.reduce((accumulator, currentValue) => accumulator + currentValue ** 2, 0)
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
      <JobBasedOnLocation recmndTitle={"Recommended For You Based On Your Qualification"} cosineSimilarity={calculateScore} />
      </>
    )
};

export default AlgorithmQualification;
