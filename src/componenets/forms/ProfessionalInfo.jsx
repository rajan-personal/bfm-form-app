import React, { useState } from "react";
import style from "../../styles/Form.module.css";
import { RxCross1 } from "react-icons/rx";

export default function ProfessionalInfo({ seller, setSeller, setPage }) {
  const [skillInput, setSkillInput] = useState("");
  const [serviceInput, setServiceInput] = useState("");

  const handleAddSkills = (e) => {
    if (e.key === "Enter") {
      const newSkill = skillInput.trim();
      if (newSkill !== "") {
        setSeller((prev) => {
          return { ...prev, skills: [...prev.skills, newSkill] };
        });
        setSkillInput("");
      }
    }
  };

  const handleAddServices = (e) => {
    if (e.key === "Enter") {
      const newService = serviceInput.trim();
      if (newService !== "") {
        setSeller((prev) => {
          return { ...prev, services: [...prev.services, newService] };
        });
        setServiceInput("");
      }
    }
  };

  const handleRemoveSkills = (index) => {
    setSeller((prev) => {
      const updatedSkills = prev.skills.filter((_, i) => i !== index);
      return { ...prev, skills: updatedSkills };
    });
  };

  const handleRemoveServices = (index) => {
    setSeller((prev) => {
      const updatedServices = prev.services.filter((_, i) => i !== index);
      return { ...prev, services: updatedServices };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(4);
  };
  return (
    <form onSubmit={handleSubmit} className="formLayout">
      <div className={style.Page}>
        <div className={style.TextField}>
          <label htmlFor="profession" className={style.Label}>
            Profession
          </label>
          <select
            name="profession"
            id="profession"
            required
            value={seller.profession}
            className={style.Dropdown}
            onChange={(e) =>
              setSeller((prev) => ({
                ...prev,
                profession: e.target.value,
              }))
            }
          >
            <option value="" disabled>
              Select your profession
            </option>
            <option value="Web Developer">Web Developer</option>
            <option value="Photo grapher">Photo grapher</option>
            <option value="Designer">Designer</option>
            <option value="Software Enginner">Software Enginner</option>
          </select>
        </div>
        <div className={style.TextField}>
          <label htmlFor="experience" className={style.Label}>
            Experience
          </label>
          <select
            name="experience"
            id="experience"
            className={style.Dropdown}
            required
            value={seller.experience}
            onChange={(e) =>
              setSeller((prev) => ({
                ...prev,
                experience: e.target.value,
              }))
            }
          >
            <option value="" disabled>
              Experience in Years
            </option>
            <option value="0-1">0-1</option>
            <option value="1-3">1-3</option>
            <option value="3-5">3-5</option>
            <option value="5-above">5-above</option>
          </select>
        </div>
        <div className={style.TextField}>
          <label htmlFor="services" className={style.Label}>
            Services Provided
          </label>
          <div className={style.TagsContainer}>
            {seller.services.map((service, index) => (
              <div key={index} className={style.Tag}>
                <button
                  className={style.Remove}
                  type="button"
                  onClick={() => handleRemoveServices(index)}
                >
                  <RxCross1 />
                </button>
                <span>{service}</span>
              </div>
            ))}
          </div>
          <input
            type="text"
            name="services"
            id="services"
            placeholder="Enter Service"
            className={style.TextInput}
            value={serviceInput}
            onChange={(e) => setServiceInput(e.target.value)}
            onKeyDown={handleAddServices}
          />
        </div>
        <div className={style.TextField}>
          <label htmlFor="skills" className={style.Label}>
            Skills
          </label>
          <div className={style.TagsContainer}>
            {seller.skills.map((skill, index) => (
              <div key={index} className={style.Tag}>
                <button
                  type="button"
                  className={style.Remove}
                  onClick={() => handleRemoveSkills(index)}
                >
                  <RxCross1 />
                </button>
                <span>{skill}</span>
              </div>
            ))}
          </div>
          <input
            type="text"
            name="skills"
            id="skills"
            className={style.TextInput}
            placeholder="Enter Skill"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleAddSkills}
          />
        </div>
        <div className={style.TextField}>
          <label htmlFor="collegeName" className={style.Label}>
            College Name
          </label>
          <input
            type="text"
            name="collegeName"
            id="collegeName"
            className={style.TextInput}
            placeholder="Select Your College"
            value={seller.collegeName}
            onChange={(e) =>
              setSeller((prev) => ({
                ...prev,
                collegeName: e.target.value,
              }))
            }
          />
        </div>
        <div className={style.Resume}>
          <label htmlFor="resume" className={style.Label}>
            Resume
          </label>
          <p>{seller.resume ? seller.resume.name : "Upload your Resume"}</p>
          <label htmlFor="resume">Upload</label>
          <input
            type="file"
            name="resume"
            id="resume"
            accept=".doc, .docx, .pdf"
            onChange={(e) =>
              setSeller((prev) => ({
                ...prev,
                resume: e.target.files[0],
              }))
            }
          />
        </div>
        <button
          className="PrimaryBtn"
          type="button"
          id="OtpButton"
          onClick={() => {
            setPage(4);
          }}
        >
          Save & Continue
        </button>
      </div>
    </form>
  );
}
