declare type Project = {
    username: string;
    title: string;
    description: string;
    repo: string;
    images: string[];
    tags: string[];
    techStacks: string[];
    likes: string[];
    collaborators: { username: string; role: string }[];
}

declare type UserType = {
  bio?: string;
  social_accounts: socialMedia[];
}

declare type SocialAccount = {
  provider: string;
  url: string;
  icon?: JSX.Element;
}
