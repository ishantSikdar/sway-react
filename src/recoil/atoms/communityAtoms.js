import { atom, atomFamily } from "recoil";
import { fetchCommunityDetailsByIdSelectorFamily, fetchCommunityMembersByCommunityIdSelectorFamily, fetchJoinedCommunitiesSelector, fetchPublicCommunitiesByNameSelectorFamily } from "../selectors/communitySelectors";

export const sideBarCommunitiesAtom = atom({
    key: "sideBarCommunitiesAtom",
    default: fetchJoinedCommunitiesSelector
});

export const actualJoinedCommunitiesAtom = atom({
    key: 'actualJoinedCommunities',
    default: fetchJoinedCommunitiesSelector
})

export const chatTextMesssageAtom = atom({
    key: 'chatTextMesssageAtom',
    default: '',
});

export const communityUserInterfaceAtom = atom({
    key: 'communityUserInterfaceAtom',
    default: {
        sideBarWidth: 56,

        showCreateChat: false,
        showJoinChat: false,
        showMembersList: false,
        
        showInviteComponent: false,
        invitationCode: '',
        inviteCodeApiError: '',
        copyInviteCodeSuccess: false,
        inviteCodeLoading: false,
        
        communitySearchTag: '',
    }
});

export const publicCommunitiesAtomFamily = atomFamily({
    key: "publicCommunitiesAtomFamily",
    default: (name) => fetchPublicCommunitiesByNameSelectorFamily(name)
})

export const selectedChatAtom = atom({
    key: 'selectedChat',
    default: {
        communityId: null,
        communityName: null,
        iconUrl: null,
        isTrial: false,
    },
});

export const chatPageAtom = atom({
    key: 'chatPageAtom',
    default: {
        chatPageNumber: 1,
        isFetchingNewPage: false,
    },
})

export const communityDetailsAtomFamily = atomFamily({
    key: 'communityDetailsAtomFamily',
    default: (id) => fetchCommunityDetailsByIdSelectorFamily(id)
});

export const communityMembersAtomFamily = atomFamily({
    key: 'communityMembersAtomFamily',
    default: (id) => fetchCommunityMembersByCommunityIdSelectorFamily(id)
})