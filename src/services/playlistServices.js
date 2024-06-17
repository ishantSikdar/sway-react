import { API_BASE_URL, API_URI_PLAYLIST_SUBJECT, API_URI_PLAYLIST_SUBJECTS, API_URI_PLAYLIST_SUBJECT_TOPIC } from "../constants/api";
import { getNoOptionsRequest } from "./apiServices";

export const fetchAllSubjects = async () => {
    try {
        return await getNoOptionsRequest(`${API_BASE_URL}${API_URI_PLAYLIST_SUBJECTS}`);

    } catch (error) {
        console.error(`Failed fetching all subjects, ${error.message}`);
        throw new Error(`Failed fetching all subjects, ${error.message}`);
    }
}

export const fetchSubjectsByName = async (name) => {
    try {
        return await getNoOptionsRequest(`${API_BASE_URL}${API_URI_PLAYLIST_SUBJECTS}?searchTag=${name}`);

    } catch (error) {
        console.error(`Failed fetching subjects by name, ${error.message}`);
        throw new Error(`Failed fetching subjects by name, ${error.message}`);
    }
}

export const fetchSubjectDetailsById = async (subjectId) => {
    try {
        return await getNoOptionsRequest(`${API_BASE_URL}${API_URI_PLAYLIST_SUBJECT}?subjectId=${subjectId}`);

    } catch (error) {
        console.error(`Failed fetching subject by Id, ${error.message}`);
        throw new Error(`Failed fetching subject by Id ${error.message}`);
    }
}

export const fetchYoutubeVideosByTitle = async (title) => {
    try {
        return await getNoOptionsRequest(`${API_BASE_URL}${API_URI_PLAYLIST_SUBJECT_TOPIC}?title=${title}`);

    } catch (error) {
        console.error(`Failed fetching video by title, ${error.message}`);
        throw new Error(`Failed fetching video by title ${error.message}`);
    }
}