import { useState } from "react";
import { joinCommunityRequest } from "../../services/communityServices";
import CenterOverlay from "../common/CenterOverlay";
import { useNavigate } from 'react-router-dom';
import LoaderOverlay from "../common/LoaderOverlay";
import GrayContainer from "../common/GrayContainer";

export default function JoinGroupChat({ closeWindow }) {
  const navigate = useNavigate();
  const [joiningLoading, setJoiningLoading] = useState(false);
  const [showJoined, setShowJoined] = useState(false);
  const [code, setCode] = useState("");
  const [joiningErrorMessage, setJoiningErrorMessage] = useState('');

  const close = () => {
    closeWindow(false);
  }

  const sendJoinCommunityRequest = async () => {
    try {
      setJoiningLoading(true);
      const response = await joinCommunityRequest(code);
      setJoiningLoading(false);

      if (response.status === 200) {
        setShowJoined(true);
      } else {
        setJoiningErrorMessage(response.data.message);
      }

    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <GrayContainer close={close} submit={sendJoinCommunityRequest} closeLabel={"Cancel"} submitLabel={"Join"}>
      <div className="w-[300px]">
        <div className="flex flex-col items-center gap-2">
          <div>
            <h1 className="text-lg font-bold text-center text-frostWhite">Join a Server</h1>
            <p className="text-center text-sm">Enter invitation code to join existing group chats</p>
          </div>

          <div className="w-full">
            <p className="font-bold uppercase text-xs mb-1 ml-1">Invitation Code <span className="text-red-600">*</span><span className="ml-4 text-red-600 normal-case font-normal">{joiningErrorMessage}</span></p>
            <input placeholder="hTKzmak" className="outline-none w-full bg-coal h-10 p-5  rounded-md" type="text" name="" id="" onChange={(e) => setCode(e.target.value)} />
          </div>

          <div className="text-left text-sm w-full">
            <p className="font-bold uppercase mt-3 mb-1">Invites should look like</p>
            <p className="text-frostWhite">B29E72065F</p>
            <p className="text-frostWhite">A76BA94E6D</p>
            <p className="text-frostWhite">C83RABZJ5W</p>
          </div>
        </div>

        {showJoined && <CenterOverlay>
          <div className="p-5 rounded-md bg-coal flex flex-col justify-center">
            <p className="font-medium text-lg">Joined New Community</p>
            <button onClick={() => navigate(0)} className="mt-4 px-6 py-2 rounded-md bg-blue">OK</button>
          </div>
        </CenterOverlay>}

        {joiningLoading && <LoaderOverlay />}
      </div>
    </GrayContainer>
  )
}