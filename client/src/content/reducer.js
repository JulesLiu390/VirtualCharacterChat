// import { getAllUsers, getAllAlbums, getAllSongs, getAllArtists } from "../api";

export const actionType = {

    SET_ISSONG_PLAYING:"SET_ISSONG_PLAYING",
    SET_ISCHATBOX_OPEN:"SET_ISCHATBOX_OPEN",
}

const reducer = (state, action) => {
    console.log(action);

    switch(action.type) {
        case actionType.SET_ISSONG_PLAYING:
            return {
                ...state,
                isSongPlaying : action.isSongPlaying,
            }

        case actionType.SET_ISCHATBOX_OPEN:
            return {
                ...state,
                isChatBoxOpen : action.isChatBoxOpen,
            }
        
        default :
                return state;
    }
};

export default reducer;