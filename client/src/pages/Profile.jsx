import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase/firebase";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice";

const Profile = () => {
  const dispatch = useDispatch();

  const { currentUser, isLoading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePercent, setFilePercent] = useState(0);
  const [isFileUploadErr, setIsFileUploadErr] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercent(Math.round(progress));
        setIsFileUploadErr(false);
      },
      (error) => {
        setIsFileUploadErr(true);
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateUserStart());
      const res = await fetch(`/server/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  return (
    <div className="">
      <h1 className="text-center text-3xl my-7 font-semibold">Profile</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col max-w-lg mx-auto gap-4 px-3"
      >
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
          src={formData?.avatar || currentUser.avatar}
          alt="profile"
        />
        <p className="text-sm self-center font-semibold">
          {isFileUploadErr ? (
            <span className="text-red-700">
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePercent > 0 && filePercent < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePercent}%`}</span>
          ) : filePercent === 100 ? (
            <span className="text-green-700 ">
              Image successfully uploaded!
            </span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="username"
          defaultValue={currentUser.username}
          className="p-3 border rounded-lg"
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          defaultValue={currentUser.email}
          className="p-3 border rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="p-3 border rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          {isLoading ? "Loading..." : "update"}
        </button>
        <p className=" text-red-700 font-semibold">{error ? error : ""}</p>
        <p className=" text-green-700 font-semibold">
          {updateSuccess ? "User is Updated Successfully" : ""}
        </p>
        <div className="flex justify-between text-red-700">
          <button className="cursor-pointer font-semibold">Sign Out</button>
          <button className="cursor-pointer font-semibold">
            Delete Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
