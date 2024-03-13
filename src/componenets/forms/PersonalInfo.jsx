import React, { useEffect, useState } from "react";
import style from "../../styles/Form.module.css";
import axios from "axios";
import { IoCameraOutline } from "react-icons/io5";

export default function PersonalInfo({ seller, setSeller, setPage }) {
  let emailValidateTimeOut;
  let userNameValidateTimeOut;
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isUserNameValid, setIsUserNameValid] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(3);
  };

  const checkEmail = async (value) => {
    try {
      if (value === "") return Promise.resolve(false);
      const uid = sessionStorage.getItem("bfm-form-seller-uid");
      const response = await axios.get(
        `https://api.blackfoxmetaverse.io/check/email?uid=${uid}&email=${value}`
      );
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const checkUserName = async (value) => {
    try {
      if (value === "") return Promise.resolve(false);
      const uid = sessionStorage.getItem("bfm-form-seller-uid");
      const response = await axios.get(
        `https://api.blackfoxmetaverse.io/check/userName?uid=${uid}&userName=${value}`
      );
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  useEffect(() => {
    if (emailValidateTimeOut) {
      clearTimeout(emailValidateTimeOut);
    }
    emailValidateTimeOut = setTimeout(() => {
      checkEmail(seller.email)
        .then((res) => setIsEmailValid(res))
        .catch((err) => setIsEmailValid(false));
    }, 500);
  }, [seller.email]);

  useEffect(() => {
    if (userNameValidateTimeOut) {
      clearTimeout(userNameValidateTimeOut);
    }
    userNameValidateTimeOut = setTimeout(() => {
      checkUserName(seller.userName)
        .then((res) => setIsUserNameValid(res))
        .catch((err) => setIsUserNameValid(false));
    }, 500);
  }, [seller.userName]);

  return (
    <form onSubmit={handleSubmit} className="formLayout">
      <div className={style.Page}>
        <div className={style.Image}>
          {imageUrl ? (
            <img src={imageUrl} alt="" srcset="" />
          ) : (
            <img
              src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSNny9UzO6PL9io1c-dOKkcKACQSsCpmU14Au-kBC1TqIHy4EBO"
              alt=""
              srcset=""
            />
          )}
          <label htmlFor="image">
            <IoCameraOutline />
            <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              required
              onChange={(e) => {
                setSeller((prev) => ({
                  ...prev,
                  image: e.target.files[0],
                }));
                setImageUrl(URL.createObjectURL(e.target.files[0]));
              }}
            />
          </label>
        </div>
        <div className={style.TextField}>
          <label htmlFor="name" className={style.Label}>
            Name*
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Full Name"
            required
            value={seller.name}
            className={style.TextInput}
            onChange={(e) =>
              setSeller((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />
        </div>
        <div className={style.TextField}>
          <label htmlFor="userName" className={style.Label}>
            Username
          </label>
          <input
            type="text"
            name="userName"
            id="userName"
            placeholder="username@2024"
            className={style.TextInput}
            required
            value={seller.userName}
            onChange={(e) =>
              setSeller((prev) => ({
                ...prev,
                userName: e.target.value,
              }))
            }
          />
          {seller.userName === "" ? null : isUserNameValid ? (
            <h4 style={{ color: "green", margin: 0 }}>Username available</h4>
          ) : (
            <h4 style={{ color: "red", margin: 0 }}>Username already taken</h4>
          )}
        </div>
        <div className={style.TextField}>
          <label htmlFor="gender" className={style.Label}>
            Gender
          </label>
          <select
            name="gender"
            id="gender"
            value={seller.gender}
            className={style.Dropdown}
            onChange={(e) =>
              setSeller((prev) => ({
                ...prev,
                gender: e.target.value,
              }))
            }
            required
          >
            <option value="" disabled>
              Select a gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
        </div>
        <div className={style.TextField}>
          <label htmlFor="email" className={style.Label}>
            Email Address*
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="randomemail@gmail.com"
            className={style.TextInput}
            required
            value={seller.email}
            onChange={(e) =>
              setSeller((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
          />
          {seller.email === "" ? null : isEmailValid ? (
            <h4 style={{ color: "green", margin: 0 }}>Email available</h4>
          ) : (
            <h4 style={{ color: "red", margin: 0 }}>Email Invalid</h4>
          )}
        </div>
        <div className={style.TextField}>
          <label htmlFor="phone_number" className={style.Label}>
            Phone Number
          </label>
          <input
            type="number"
            name="phone_number"
            id="phone_number"
            className={style.TextInput}
            placeholder="+91 1234567890"
            required
            disabled
            value={seller.phone_number}
          />
        </div>
        <div className={style.TextField}>
          <label htmlFor="city" className={style.Label}>
            City
          </label>
          <input
            type="text"
            name="city"
            id="city"
            className={style.TextInput}
            placeholder="Enter your current city"
            required
            value={seller.city}
            onChange={(e) =>
              setSeller((prev) => ({
                ...prev,
                city: e.target.value,
              }))
            }
          />
        </div>
        <button className="PrimaryBtn" type="submit">
          Save & Continue
        </button>
      </div>
    </form>
  );
}
