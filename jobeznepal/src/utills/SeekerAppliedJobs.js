

import { useEffect, useState } from "react";
import { GetApplicants } from "./GetApplicants"
import { idFunction } from "./LoggedInUserID"

export const SeekerAppliedJobs = () => {
  const ApplicantsDetails = GetApplicants();
  const LoggedInUserID = idFunction();
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    const filterAppliedJobs = ApplicantsDetails?.filter((item) => item.applicantID === LoggedInUserID);
    const getAppliedJobsID = filterAppliedJobs?.map(item => item.appliedJobID);
    setAppliedJobs(getAppliedJobsID);
  }, [ApplicantsDetails, LoggedInUserID]);

  return appliedJobs;
}
