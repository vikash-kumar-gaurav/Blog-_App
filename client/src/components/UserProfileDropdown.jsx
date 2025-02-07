import { useState } from "react";
import userApi from '../utils/userApi'
import { logOut } from "../Redux/featers/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const UserProfileDropdown = ({ imageUrl, username, role }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const LogoutSubmit = async() => {
    try {
        const response = await userApi.get('/logout')
        if(response.data?.success){
            dispatch(logOut());
            toast.success("LogOut successful")
            setTimeout(() => {
                navigate('/')
            }, 1500);
            
        }
    } catch (error) {
        console.log(error);
        
    }
  }

  return (
    <div className="relative z-50">
      {/* Profile Picture */}
      <div
        className="rounded-full w-20 h-20 m-auto pt-2 cursor-pointer"
        onClick={toggleDropdown}
      >
        <img
          src={imageUrl}
          alt="User Profile"
          className="rounded-full w-full h-full object-cover border-2 border-orange-500 hover:shadow-md"
        />
      </div>

      {/* Dropdown Content */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="p-4 text-center">
            <img
              src={imageUrl}
              alt="User Thumbnail"
              className="rounded-full w-16 h-16 mx-auto border-2 border-gray-300"
            />
            <h2 className="text-lg font-bold mt-2">{username}</h2>
            <p className="text-sm text-gray-500">{role}</p>
          </div>

          <div className="border-t border-gray-200">
            <button
              className="w-full text-center py-2 text-white bg-red-500 hover:bg-red-600 transition-colors rounded-b-lg"
              onClick={LogoutSubmit}
            >
              Log Out
            </button>
            <button
              className="w-full text-center py-2 text-white bg-red-500 hover:bg-red-600 transition-colors rounded-b-lg"
              onClick={() => navigate('/update-userDetails')}
            >
              Update Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;
