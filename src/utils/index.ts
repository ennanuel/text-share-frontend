import { Client, Databases, ID } from "appwrite";
import { COLLECTION_ID, DB_ID, ENDPOINT_URL, IP_URL, PROJECT_ID } from "../assets/constants";
import { fetchOptions } from "../assets/data";
import { User } from "../types/textSpace.type";

type Payload = {
    [key: string]: string;
};

export async function checkAuthentication (): Promise<User|null> {
    try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/check`, fetchOptions);
        if (response.status !== 200) null;

        const result = await response.json();
        return { id: result.userId, username: result?.username, profilePicture: result?.profilePicture };
    } catch (error) {
        return null;
    }
  };

export async function clearUserAuthentication () { 
    try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/logout`, { ...fetchOptions, method: "POST" });
        if(response.status !== 204) return false;
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};


export function recordUser(avoidVisitor: boolean) {
    const skipVisitor = avoidVisitor || Date.now() <= Number(localStorage.getItem('omit'));

    if(skipVisitor) {
        const nextThreeDays = Date.now() + 259200000;
        localStorage.setItem('omit', String(nextThreeDays));
    } else {
        getIpAddress()
            .then((location) => {
                const payload = {
                    location,
                    userAgent: navigator.userAgent,
                    platform: "Tekst",
                    url: window.location.href
                };

                saveToDB(payload, COLLECTION_ID);
            })
            .catch((error) => {
                console.error(error.message);
            })
    }
};

async function getIpAddress () {
    try {
        const response = await fetch(IP_URL);
        const data = await response.json();

        return data.ip;
    } catch (error) {
        return "Unable to retrieve IP address.";
    }
};

function saveToDB (payload: Payload, collectionId: string) {
    return new Promise(
        async (resolve, reject) => {
            try {
                const client = new Client();
                client
                    .setEndpoint(ENDPOINT_URL)
                    .setProject(PROJECT_ID);

                const database = new Databases(client);

                await database.createDocument(
                    DB_ID, 
                    collectionId, 
                    ID.unique(), 
                    payload
                );
                resolve(null);
            } catch (error) {
                reject(error);
            }
    });
}