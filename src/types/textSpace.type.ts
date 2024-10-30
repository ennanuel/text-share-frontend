

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
    owner: {
        _id: string;
        username: string;
        profileImage?: string;
    }
}