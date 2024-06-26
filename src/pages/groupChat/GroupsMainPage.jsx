import { redirectToLoginPage, supportsDynamicViewport } from "../../utils/pageUtil";
import CreateNewGroupChat from "../../components/group/CreateNewGroupChat";
import JoinGroupChat from "../../components/group/JoinGroupChat";
import CommunityButtons from "../../components/group/CommunityButtons";
import JoinedGroups from "../../components/group/JoinedGroups";
import ChatWindow from "../../components/chat/ChatWindow";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { communityUserInterfaceAtom, sideBarCommunitiesAtom, selectedChatAtom } from "../../recoil/atoms/communityAtoms";
import Wumpus from "../../components/common/Wumpus";
import MessageSendButton from "../../components/chat/MessageSendButton";
import GroupChatOptions from "../../components/group/GroupChatOptions";
import ExplorePublicCommunities from "../../components/group/ExplorePublicCommunities";
import InviteUser from "../../components/group/InviteUser";
import MembersList from "../../components/group/MembersList";
import { useEffect } from "react";
import { checkLoggedIn } from "../../utils/authUtil";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";

export default function GroupsMainPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const communityElements = useRecoilValue(communityUserInterfaceAtom);
  const selectedChat = useRecoilValue(selectedChatAtom);
  const joinedCommunitiesLoadable = useRecoilValueLoadable(sideBarCommunitiesAtom);

  useEffect(() => {
    if (!checkLoggedIn()) {
      redirectToLoginPage(location, navigate);
    }
  }, [navigate, location]);

  return (
    <div className={`flex pt-12 pb-12 w-full ${supportsDynamicViewport() ? 'h-[100dvh]' : 'h-screen '}`}>

      {/* Side Bar Background layer (not absolute, used to occupy space over page) */}
      <div
        className={`h-full py-2 ${communityElements.sideBarWidth === 0 ? "" : "mr-2"} bg-black items-center overflow-y-scroll transition-width duration-500 ease-in-out`}
        style={{
          width: `${communityElements.sideBarWidth}px`,
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      ></div>

      {/* SideBar, is absolute */}
      {joinedCommunitiesLoadable.state === 'hasValue' &&
        < div
          className={`z-30 fixed h-full py-2 bg-black items-center px-2 overflow-y-scroll border-r-[1pt] border-gray  transition-transform duration-500 ease-in-out`}
          style={{
            transform: communityElements.sideBarWidth === 0 ? 'translateX(-100%)' : 'translateX(0)',
            width: 56,
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <JoinedGroups />
          <CommunityButtons />
        </div>
      }

      {/* Community WorkSpace */}
      <div className="h-full flex flex-col flex-grow bg-midDark w-full relative">
        {selectedChat.communityId &&
          <>
            <GroupChatOptions communityId={selectedChat.communityId} />
            <ChatWindow />

            {!selectedChat.isTrial ?
              <MessageSendButton /> :
              <div className="px-3 pb-2 w-full">
                <div className="relative w-full h-12 rounded-md flex bg-black justify-center items-center">
                  <p>Click to Join & Start Chatting</p>
                </div>
              </div>
            }
          </>
        }

        {!selectedChat.communityId && <ExplorePublicCommunities />}
      </div>


      {communityElements.showInviteComponent && <InviteUser groupName={selectedChat.communityName} />}
      {communityElements.showMembersList && <MembersList communityId={selectedChat.communityId} />}

      {communityElements.showCreateChat && <CreateNewGroupChat />}
      {communityElements.showJoinChat && <JoinGroupChat />}
    </div >
  );
}
