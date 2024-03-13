import React, { useEffect, useState } from "react";
import style from "../../styles/Form.module.css";
import Bread from "../Bread";
import Login from "../forms/Login";
import PersonalInfo from "../forms/PersonalInfo";
import ProfessionalInfo from "../forms/ProfessionalInfo";
import WorkInfo from "../forms/WorkInfo";

export default function Home() {
  const [page, setPage] = useState(2);

  const [seller, setSeller] = useState({
    image: null,
    name: "",
    userName: "",
    email: "",
    city: "",
    profession: "",
    gender: "",
    experience: "",
    services: [],
    skills: [],
    collegeName: "",
    resume: null,
    description: "",
    socialMediaLinks: [],
    experienceDetails: [],
    images: [null, null, null, null, null, null],
    video: null,
    coordinates: { longitude: 0, latitude: 0 },
  });

  useEffect(() => {
    console.log(seller);
  }, [seller]);

  return (
    <div className={style.Container}>
      <div className={style.Center}>
        <div className={style.Wrapper}>
          <Bread page={page} />
          {page === 1 ? <Login setPage={setPage} /> : null}
          {page === 2 ? (
            <PersonalInfo
              seller={seller}
              setSeller={setSeller}
              setPage={setPage}
            />
          ) : null}
          {page === 3 ? (
            <ProfessionalInfo
              seller={seller}
              setSeller={setSeller}
              setPage={setPage}
            />
          ) : null}
          {page === 4 ? (
            <WorkInfo seller={seller} setSeller={setSeller} setPage={setPage} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
