import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div>
      <h1 className="text-center text-3xl my-7 font-semibold">Profile</h1>
      <form className="flex flex-col max-w-lg mx-auto gap-4">
        <img
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
          src={currentUser.avatar}
          alt="profile"
        />
        <input
          type="text"
          placeholder="username"
          className="p-3 border rounded-lg"
          id="username"
        />
        <input
          type="email"
          placeholder="email"
          className="p-3 border rounded-lg"
          id="email"
        />
        <input
          type="password"
          placeholder="password"
          className="p-3 border rounded-lg"
          id="password"
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          update
        </button>
      </form>
    </div>
  );
};

export default Profile;
