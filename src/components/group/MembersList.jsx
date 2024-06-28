import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import CenterOverlay from "../common/CenterOverlay";
import MemberCard from "./MemberCard";
import { communityMembersAtomFamily, communityUserInterfaceAtom } from "../../recoil/atoms/communityAtoms";
import { useEffect, useRef } from "react";
import { handleCloseByClickOutside } from "../../utils/pageUtil";
import GrayContainer from "../common/GrayContainer";

export default function MembersList({ communityId }) {
  const memberWindowRef = useRef(null);
  const communityMembersLoadable = useRecoilValueLoadable(communityMembersAtomFamily(communityId));
  const setCommunityUIElements = useSetRecoilState(communityUserInterfaceAtom);

  const closeMemberWindow = () => {
    setCommunityUIElements((prev) => ({
      ...prev,
      showMembersList: false,
    }));
  }

  useEffect(() => {
    const cleanup = handleCloseByClickOutside(
      memberWindowRef,
      closeMemberWindow,
      []
    );

    return cleanup;
  }, []);

  return <GrayContainer close={closeMemberWindow} closeLabel={'Close'}>
    <div ref={memberWindowRef}
      className="max-w-[80dvw] min-w-[70dvw] max-h-[50dvh] px-4 py-5 overflow-scroll rounded-md"
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      {communityMembersLoadable.state === 'hasValue' &&
        communityMembersLoadable.contents.members.map((member) =>
          <MemberCard key={member.userId} id={member.userId} name={member.name} imageUrl={member.photoUrl} username={member.username} />)
      }

    </div>
  </GrayContainer>
}