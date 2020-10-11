
let accessToken = '';
const clientID = 'deed3d661ebd421f88d219d8ee5890b5';
const redirectURI = 'http://localhost:3000/';
// const redirectURI = 'http://ianuriel.surge.sh';

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);

            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        }
        if (!accessTokenMatch) {

            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            window.location = accessUrl;


        }

    },

    search(term) {
        const accessToken = Spotify.getAccessToken();
        const searchUrl = `https://api.spotify.com/v1/search?type=track&q=${term}`;
        console.log(`searchUrl: ${searchUrl}`);
        return fetch(searchUrl,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            .then(response => response.json())
            .then(jsonResponse => {
                if (!jsonResponse) {
                    return [];
                }
                return jsonResponse.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artists: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                }))
            })
            ;
    },

    savePlayList(name, trackUris) {
        if (!name || !trackUris.length) {
            return;
        }
        const accessToken = Spotify.getAccessToken();
        const headers = {
            Authorization: `Bearer ${accessToken}`
        };
        let userId;
        return fetch('https://api.spotify.com/v1/me', { headers: headers })
            .then(response => response.json())
            .then(jsonResponse => {
                userId = jsonResponse.id;
                console.log(`userId: ${userId}`);
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
                    {
                        headers: headers,
                        method: 'POST',
                        body: JSON.stringify({ name : name })

                    })
                    .then(response => response.json())
                    .then(jsonResponse => {
                        const playlistId = jsonResponse.id;
                        console.log(`playlistId: ${playlistId}`);
                        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
                            {
                                headers: headers,
                                method: 'POST',
                                body: JSON.stringify({
                                    uris: trackUris
                                })
                            })
                    });
            })
    }


};

export default Spotify;