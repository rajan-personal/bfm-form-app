import React, { useRef, useState } from "react";
import style from "../../styles/Form.module.css";
import { FaDribbble, FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { SiBehance } from "react-icons/si";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";

const SocialTypes = [
  {
    name: "Linked In",
    icon: <FaLinkedinIn />,
  },
  {
    name: "Instagram",
    icon: <RiInstagramFill />,
  },
  {
    name: "Behance",
    icon: <SiBehance />,
  },
  {
    name: "Dribble",
    icon: <FaDribbble />,
  },
  {
    name: "Github",
    icon: <FaGithub />,
  },
];

export default function WorkInfo({ seller, setSeller, setPage }) {
  const [isLoading, setIsLoading] = useState(false);

  const [socialType, setSocialType] = useState("");
  const [socialLink, setSocialLink] = useState("");

  const imagesRef = useRef([]);

  const handleAddExperinces = () => {
    setSeller((prev) => {
      return {
        ...prev,
        experienceDetails: [
          ...prev.experienceDetails,
          { title: "", link: "", content: "" },
        ],
      };
    });
  };

  const handleExpFields = ({ index, field, value }) => {
    setSeller((prev) => {
      let expArr = prev.experienceDetails;
      expArr[index][field] = value;
      return { ...prev, experienceDetails: expArr };
    });
  };

  const handleRemoveExp = (index) => {
    setSeller((prev) => {
      const newExpArr = prev.experienceDetails.filter((_, i) => i !== index);
      return { ...prev, experienceDetails: newExpArr };
    });
  };

  function getIconByName(name) {
    const socialType = SocialTypes.find(
      (social) => social.name.toLowerCase() === name?.toLowerCase()
    );
    return socialType ? socialType.icon : null;
  }

  function addSocials({ type, link }) {
    setSeller((prev) => {
      return {
        ...prev,
        socialMediaLinks: [
          ...prev.socialMediaLinks,
          { platformType: type, link: link },
        ],
      };
    });
    setSocialLink("");
    setSocialType("");
  }

  function removeSocials(index) {
    let arr = seller.socialMediaLinks;
    arr.splice(index, 1);
    setSeller({ ...seller, socialMediaLinks: arr });
  }

  const hamdleImagesAdd = ({ index, file }) => {
    setSeller((prev) => {
      let imgsArr = prev.images;
      imgsArr[index] = file;
      return { ...prev, images: imgsArr };
    });
  };

  const handleRemoveImages = (index) => {
    setSeller((prev) => {
      let imgsArr = prev.images;
      imgsArr[index] = null;
      return { ...prev, images: imgsArr };
    });

    if (imagesRef.current[index] && imagesRef.current[index].current) {
      imagesRef.current[index].current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const formData = new FormData();
    formData.append("image", seller.image);
    formData.append("resume", seller.resume);
    formData.append("name", seller.name);
    formData.append("userName", seller.userName);
    formData.append("gender", seller.gender);
    formData.append("email", seller.email);
    formData.append("phone_number", seller.phone_number);
    formData.append("city", seller.city);
    formData.append("profession", seller.profession);
    formData.append("experience", seller.experience);
    formData.append("collegeName", seller.collegeName);
    formData.append("description", seller.description);
    formData.append("services", JSON.stringify(seller.services));
    formData.append("skills", JSON.stringify(seller.skills));
    formData.append(
      "experienceDetails",
      JSON.stringify(seller.experienceDetails)
    );
    formData.append(
      "socialMediaLinks",
      JSON.stringify(seller.socialMediaLinks)
    );

    // Append images
    seller.images.forEach((img, index) => {
      formData.append("images", img);
    });

    if (seller.video) {
      formData.append("video", seller.video);
    }

    // Append coordinates
    formData.append("coordinates", JSON.stringify(seller.coordinates));

    try {
      const token = sessionStorage.getItem("bfm-form-seller-token");
      const response = await axios.post(
        "https://api.blackfoxmetaverse.io/main/seller",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: token,
          },
        }
      );
      console.log(response.data);
      setIsLoading(false);
      alert("seller created!!");
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className={style.page}>
          <div className={style.TextField}>
            <label htmlFor="description" className={style.Label}>
              Description
            </label>
            <input
              type="text"
              name="description"
              id="description"
              placeholder=" "
              className={style.TextInput}
              required
              value={seller.description}
              onChange={(e) =>
                setSeller((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </div>
          <div className={style.TextField}>
            <label htmlFor="experienceDetails" className={style.Label}>
              Experinces
            </label>
            <div>
              {seller.experienceDetails.map((obj, index, idx) => (
                <div key={idx}>
                  <div>
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      name="title"
                      required
                      value={obj.title}
                      onChange={(e) =>
                        handleExpFields({
                          index,
                          field: "title",
                          value: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="link">Link</label>
                    <input
                      type="text"
                      name="link"
                      required
                      value={obj.link}
                      onChange={(e) =>
                        handleExpFields({
                          index,
                          field: "link",
                          value: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="content">Details</label>
                    <input
                      type="text"
                      name="content"
                      required
                      value={obj.content}
                      onChange={(e) =>
                        handleExpFields({
                          index,
                          field: "content",
                          value: e.target.value,
                        })
                      }
                    />
                  </div>
                  <button type="button" onClick={() => handleRemoveExp(index)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button type="button" onClick={handleAddExperinces}>
              Add Experiences
            </button>
          </div>
          <div>
            <label htmlFor="socialMediaLinks">Social Types</label>
            <ul>
              {seller?.socialMediaLinks?.map((social, index) => (
                <li key={index}>
                  <div>
                    <div>
                      <div>{getIconByName(social.platformType)}</div>
                    </div>
                    <span>{social.platformType}</span>
                  </div>
                  <div>
                    <span>{social.link}</span>
                    <button type="button" onClick={() => removeSocials(index)}>
                      <RxCross2 />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div>
              <select
                name="social-media"
                id="social-media"
                value={socialType}
                onChange={(e) => setSocialType(e.target.value)}
              >
                <option value="" disabled>
                  Select a platform
                </option>
                {SocialTypes.map((social, index) => (
                  <option key={index} value={social.name}>
                    {social.name}
                  </option>
                ))}
              </select>
              <input
                placeholder="Enter your profile URL"
                type="text"
                value={socialLink}
                onChange={(e) => setSocialLink(e.target.value)}
              />
              <button
                type="button"
                onClick={() =>
                  addSocials({ type: socialType, link: socialLink })
                }
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => {
                  setSocialLink("");
                  setSocialType("");
                }}
              >
                Clear
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="images">Images</label>
            {seller.images.map((img, index) => (
              <div key={index}>
                <input
                  type="file"
                  onChange={(e) =>
                    hamdleImagesAdd({ index, file: e.target.files[0] })
                  }
                  ref={imagesRef.current[index]}
                />
                <button type="button" onClick={() => handleRemoveImages(index)}>
                  x
                </button>
              </div>
            ))}
          </div>
          <div>
            <label htmlFor="video">Video (Optional)</label>
            <input
              type="file"
              onChange={(e) =>
                setSeller((prev) => {
                  return { ...prev, video: e.target.files[0] };
                })
              }
              accept="video/*"
            />
            {seller.video && (
              <div>
                <p>Video uploaded</p>
                <button
                  type="button"
                  onClick={() =>
                    setSeller((prev) => {
                      return { ...prev, video: null };
                    })
                  }
                >
                  Remove Video
                </button>
              </div>
            )}
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
