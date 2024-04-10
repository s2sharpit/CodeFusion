declare type Project = {
    userId: string;
    title: string;
    description: string;
    repo: string;
    images: string[];
    tags: string[];
    techStacks: string[];
    likes: string[];
    collaborators: { username: string; role: string }[];
}