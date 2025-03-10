// import { getAllUsers, getAllAlbums, getAllSongs, getAllArtists } from "../api";

export const actionType = {

    SET_ISSONG_PLAYING:"SET_ISSONG_PLAYING",
    SET_ISCHATBOX_OPEN:"SET_ISCHATBOX_OPEN",
    SET_GAME_TEXT:"SET_GAME_TEXT",
    SET_ALL_CHARACTERS:"SET_ALL_CHARACTERS",
    SET_CURRENT_CHARACTER:"SET_CURRENT_CHARACTER",
    SET_AUDIO_BASE_64:"SET_AUDIO_BASE_64"

    // SET_NEW_CHARACTER_
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

        case actionType.SET_ALL_CHARACTERS:
            return {
                ...state,
                allCharacters : action.allCharacters,
            }

        case actionType.SET_GAME_TEXT:
            return {
                ...state,
                gameText : action.gameText,
            }

        case actionType.SET_CURRENT_CHARACTER:
            return {
                ...state,
                currentCharacter : action.currentCharacter,
            }

        case actionType.SET_AUDIO_BASE_64:
            return {
                ...state,
                audioBase64 : action.audioBase64,
            }
        
        default :
                return state;
    }
};

export default reducer;