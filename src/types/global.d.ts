declare type Proj = {
    username: string;
    title: string;
    description: string;
    repo: string;
    // images: string[];
    topics: string[];
    languages: string[];
    demoVid: string?;
    likes: string[];
    // collaborators: { username: string; role: string }[];
    collaborators: string[];
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
