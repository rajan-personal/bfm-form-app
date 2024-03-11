import React from "react";
import style from "../../styles/Form.module.css";

export default function PersonalInfo({ seller, setSeller, setPage }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(3);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className={style.Page}>
          <div className={style.Image}>
            <input
              type="file"
              name="image"
              id="image"
              required
              onChange={(e) =>
                setSeller((prev) => ({
                  ...prev,
                  image: e.target.files[0],
                }))
              }
            />
          </div>
          <div>
            <div className={style.TextField}>
              <label htmlFor="name" className={style.Label}>
                Name*
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Harsh Singh"
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
                placeholder="Harsh Singh"
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
            </div>
          </div>
          <div>
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
            </div>
          </div>
          <div>
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
            <input
              className="PrimaryBtn"
              type="submit"
              value={"Save & Continue"}
              id="OtpButton"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
