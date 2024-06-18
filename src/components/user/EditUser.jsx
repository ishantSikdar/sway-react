import { faX, faSpinner, faCheck, faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { sendEditUserDetailsRequest } from "../../services/userServices";
import CenterOverlay from "../common/CenterOverlay";
import GrayContainer from "../common/GrayContainer";

export default function EditUser({ setShowEditUser }) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [newDetails, setNewDetails] = useState({
    name: "",
    image: null,
    username: "",
    mobile: "",
    email: "",
  });

  const handleInput = (event) => {
    const { name, value, files } = event.target;

    if (name === "image") {
      setNewDetails({
        ...newDetails,
        image: files[0]
      });

    } else {
      setNewDetails({
        ...newDetails,
        [name]: value
      });
    }
  }

  const handleEditRequest = async () => {
    try {
      setLoading(true);
      const response = await sendEditUserDetailsRequest(newDetails);
      setLoading(false);

      if (response.status === 200) {
        setShowSuccess(true);
      }

    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <GrayContainer submitLabel={'Done'} close={() => setShowEditUser(false)} closeLabel={"Cancel"} submit={handleEditRequest} width={350}>
      {!showSuccess ?
        (<div className="">
          <h1 className="text-center uppercase text-lg font-medium mb-5 text-frostWhite">Edit your details</h1>

          <label htmlFor="imageUpload" className="w-[100px] mx-auto cursor-pointer  rounded-full border-[3px] border-dashed border-white p-5 aspect-square flex justify-center items-center">
            {!newDetails.image ? (<FontAwesomeIcon icon={faCamera} className="text-4xl" />) : (<FontAwesomeIcon icon={faCheck} className="text-green-500 text-4xl" />)}
            <input
              type="file"
              id="imageUpload"
              className="hidden"
              name="image"
              onChange={handleInput}
            />
          </label>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <p>New Name</p>
              <input type="text" name="name" onChange={handleInput} value={newDetails.name} className="h-14 rounded-md outline-none bg-coal p-2" placeholder="Rick Ashtley" />
            </div>

            <div className="flex flex-col gap-2">
              <p>New Username</p>
              <input type="text" name="username" onChange={handleInput} value={newDetails.username} className="h-14 rounded-md outline-none bg-coal p-2" placeholder="richyRick$" />
            </div>

            <div className="flex flex-col gap-2">
              <p>New Mobile</p>
              <input type="text" name="mobile" onChange={handleInput} value={newDetails.mobile} className="h-14 rounded-md outline-none bg-coal p-2" placeholder="0000000000" />
            </div>

            <div className="flex flex-col gap-2">
              <p>New Email</p>
              <input type="text" name="email" onChange={handleInput} value={newDetails.email} className="h-14 rounded-md outline-none bg-coal p-2" placeholder="something@some-domain.com" />
            </div>
          </div>

        </div>) : (<div className="bg-coal p-10 flex flex-col gap-2 justify-center items-center rounded-md">
          <p>Your Details have been Updated</p>
          <button onClick={() => navigate(0)} className="bg-blue px-5 py-2 rounded-full">OK</button>
        </div>)}

      {loading && <div className="fixed inset-0 bg-opacity-50 z-50 flex justify-center items-center bg-black">
        <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
      </div>}
    </GrayContainer>
  )


}