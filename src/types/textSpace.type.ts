

export type User = {
    id: string; 
    username: string; 
    profilePicture: string; 
};

export interface TextSpace {
    _id: string;
    index: number;
    title: string;
    desc: string;
    content: string;
    links: string[];
    secured: boolean;
    views: number;
    createdAt: string;
    color: string;
    isYours: boolean;
    isInYourFavorites: boolean;
    owner: {
        _id: string;
        username: string;
        profileImage?: string;
    }
};

export type TextSpacesFetchResult = {
    page: number;
    limit: number;
    sortedBy: string;
    totalPages: number;
    textSpaces: TextSpace[];
};