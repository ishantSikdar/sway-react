import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { supportsDynamicViewport } from "../../utils/pageUtil";
import CenterOverlay from "../../components/common/CenterOverlay";
import CreateNewGroupChat from "../../components/group/CreateNewGroupChat";
import JoinGroupChat from "../../components/group/JoinGroupChat";
import CommunityButtons from "../../components/group/CommunityButtons";
import JoinedGroups from "../../components/group/JoinedGroups";
import { useParams } from "react-router-dom";
import ChatWindow from "../../components/group/ChatWindow";

export default function GroupsMainPage() {
  const chatDivRef = useRef(null);
  const { gcId } = useParams();
  const [showCreateChat, setShowCreateChat] = useState(false);
  const [showJoinChat, setShowJoinChat] = useState(false);
  const [showExploreGroups, setShowExploreGroups] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (chatDivRef.current) {
      chatDivRef.current.scrollTop = chatDivRef.current.scrollHeight;
    }
  }, []);

  const handleMessageInput = (event) => {
    setMessage(event.target.value);
  }

  return (
    <div className={`flex pt-14 ${supportsDynamicViewport() ? 'h-[100dvh]' : 'h-screen '}`}>

      <div className="w-16 h-full bg-coal items-center px-2 overflow-y-scroll" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <CommunityButtons setShowCreateChat={setShowCreateChat} setShowJoinChat={setShowJoinChat} setShowExploreGroups={setShowExploreGroups} />
        <div className="w-full h-[1px] bg-white mt-4 mb-2"></div>
        <JoinedGroups />
      </div>

      <div className="h-full flex flex-col flex-grow">
        <ChatWindow chatDivRef={chatDivRef} gcId={gcId} />

        <div className="px-3 pb-4 w-full">
          <div className="relative w-full rounded-lg h-[50px] flex bg-light-gray">
            <input
              type="text"
              onChange={handleMessageInput}
              placeholder="Message"
              className="rounded-lg p-4 flex-grow text-lg outline-none bg-light-gray h-full"
            />
            <button className="absolute right-3 bottom-2 z-10">
              <FontAwesomeIcon icon={faLocationArrow} className="text-3xl rotate-45" />
            </button>
          </div>
        </div>
      </div>

      {showCreateChat && <CenterOverlay>
        <CreateNewGroupChat closeWindow={setShowCreateChat} />
      </CenterOverlay>}

      {showJoinChat && <CenterOverlay>
        <JoinGroupChat closeWindow={setShowJoinChat} />
      </CenterOverlay>}

      {showExploreGroups && <CenterOverlay>
        <div className="bg-coal p-5">
          <p>Comming soon!</p>
          <button className="bg-blue p-2 rounded-full w-full" onClick={() => setShowExploreGroups(false)}>Ok</button>
        </div>
      </CenterOverlay>}
    </div >
  );
}
