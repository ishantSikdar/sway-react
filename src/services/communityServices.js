import { API_BASE_URL, API_URI_COMMUNITY_COMMUNITY_CHATS, API_URI_COMMUNITY_COMMUNITY_DETAILS, API_URI_COMMUNITY_COMMUNITY_MEMBERS, API_URI_COMMUNITY_CREATE_COMMUNITY, API_URI_COMMUNITY_EDIT_COMMUNITY, API_URI_COMMUNITY_GENERATE_INVITATION_CODE, API_URI_COMMUNITY_JOINED_COMMUNITIES, API_URI_COMMUNITY_JOIN_COMMUNITY, API_URI_COMMUNITY_JOIN_COMMUNITY_EXPLORE, API_URI_COMMUNITY_PUBLIC_COMMUNITIES } from "../constants/api";
import { getAuthToken } from "../utils/authUtil";
import { getAuthenticatedRequest, patchAuthenticatedNoOptionsRequest, postMultipartFormDataAuthenticatedRequest, putMultipartFormDataAuthenticatedRequest } from "./apiServices";

export const createNewCommunityRequest = async (communityDetails) => {
    try {
        const localToken = getAuthToken();
        const formData = new FormData();
        formData.append('image', communityDetails.image);
        formData.append('json', JSON.stringify(JSON.stringify({
            name: communityDetails.name,
            visibility: communityDetails.visibility ? 'public' : 'private'
        })));
        return await postMultipartFormDataAuthenticatedRequest(`${API_BASE_URL}${API_URI_COMMUNITY_CREATE_COMMUNITY}`, formData, localToken);

    } catch (error) {
        console.error(`Create community request failed, ${error.message}`);
        throw new Error(`${error.message}`);
    }
}

export const joinCommunityRequest = async (invitationCode) => {
    try {
        const localToken = getAuthToken();
        return await patchAuthenticatedNoOptionsRequest(`${API_BASE_URL}${API_URI_COMMUNITY_JOIN_COMMUNITY}?code=${invitationCode}`, localToken);

    } catch (error) {
        console.error(`Join community request failed, ${error.message}`);
        throw new Error(`${error.message}`);
    }
}

export const generateInvitationRequest = async (communityId) => {
    try {
        const localToken = getAuthToken();
        return await getAuthenticatedRequest(`${API_BASE_URL}${API_URI_COMMUNITY_GENERATE_INVITATION_CODE}?communityId=${communityId}`, localToken);

    } catch (error) {
        console.error(`Join community request failed, ${error.message}`);
        throw new Error(`${error.message}`);
    }
}

export const fetchJoinedCommunities = async () => {
    try {
        const localToken = getAuthToken();
        return await getAuthenticatedRequest(`${API_BASE_URL}${API_URI_COMMUNITY_JOINED_COMMUNITIES}`, localToken);

    } catch (error) {
        console.error(`Failed fetching joined communities, ${error.message}`);
        throw new Error(`Failed fetching joined communities, ${error.message}`);
    }
}

export const fetchCommunityDetailsById = async (communityId) => {
    try {
        const localToken = getAuthToken();
        return await getAuthenticatedRequest(`${API_BASE_URL}${API_URI_COMMUNITY_COMMUNITY_DETAILS}?communityId=${communityId}`, localToken);

    } catch (error) {
        console.error(`Failed fetching joined communities, ${error.message}`);
        throw new Error(`Failed fetching joined communities, ${error.message}`);
    }
}

export const fetchChatMessagesByCommunityId = async (communityId, page) => {
    try {
        const localToken = getAuthToken();
        return await getAuthenticatedRequest(`${API_BASE_URL}${API_URI_COMMUNITY_COMMUNITY_CHATS}?communityId=${communityId}&page=${page}`, localToken);

    } catch (error) {
        console.error(`Failed fetching joined communities, ${error.message}`);
        throw new Error(`Failed fetching joined communities, ${error.message}`);
    }
}

export const fetchCommunityMembersByCommunityId = async (communityId) => {
    try {
        const localToken = getAuthToken();
        return await getAuthenticatedRequest(`${API_BASE_URL}${API_URI_COMMUNITY_COMMUNITY_MEMBERS}?communityId=${communityId}`, localToken);

    } catch (error) {
        console.error(`Failed fetching members of communities, ${error.message}`);
        throw new Error(`Failed fetching members of communities, ${error.message}`);
    }
}

export const sendGenerateInvitationCodeRequest = async (communityId) => {
    try {
        const localToken = getAuthToken();
        return await getAuthenticatedRequest(`${API_BASE_URL}${API_URI_COMMUNITY_GENERATE_INVITATION_CODE}?communityId=${communityId}`, localToken);

    } catch (error) {
        console.error(`Failed generating invite code, ${error.message}`);
        throw new Error(`Failed generating invite code, ${error.message}`);
    }
}

export const sendFetchPublicCommunitiesByNameRequest = async (communityName) => {
    try {
        const localToken = getAuthToken();
        return await getAuthenticatedRequest(`${API_BASE_URL}${API_URI_COMMUNITY_PUBLIC_COMMUNITIES}?communityName=${communityName}`, localToken);

    } catch (error) {
        console.error(`Failed generating invite code, ${error.message}`);
        throw new Error(`Failed generating invite code, ${error.message}`);
    }
}

export const joinCommunityByExploreRequest = async (communityId) => {
    try {
        const localToken = getAuthToken();
        return await patchAuthenticatedNoOptionsRequest(`${API_BASE_URL}${API_URI_COMMUNITY_JOIN_COMMUNITY_EXPLORE}?communityId=${communityId}`, localToken);

    } catch (error) {
        console.error(`Failed joining community, ${error.message}`);
        throw new Error(`Failed joining community, ${error.message}`);
    }
}

export const sendEditCommunityRequest = async (communityId, communityDetails) => {
    try {
        const localToken = getAuthToken();
        const formData = new FormData();
        formData.append('image', communityDetails.image);
        formData.append('json', JSON.stringify(JSON.stringify({
            communityId,
            name: communityDetails.name,
            visibility: communityDetails.visibility ? 'public' : 'private'
        })));
        return await putMultipartFormDataAuthenticatedRequest(`${API_BASE_URL}${API_URI_COMMUNITY_EDIT_COMMUNITY}`, formData, localToken);

    } catch (error) {
        console.error(`Edit community request failed, ${error.message}`);
        throw new Error(`${error.message}`);
    }
}