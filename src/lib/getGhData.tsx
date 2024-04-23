import { FaGithub, FaGlobe, FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { auth } from "./auth";

const fetchUserData = async (username: string) => {
  try {
    const session = await auth();
    const headers: HeadersInit = session ? {
      Authorization: `token ${session?.user.accessToken}`,
    } : {};

    const [userDataResponse, socialAccountsResponse] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, { headers }),
      fetch(`https://api.github.com/users/${username}/social_accounts`, { headers }),
    ]);

    if (!userDataResponse.ok || !socialAccountsResponse.ok) {
      throw new Error(`Failed to fetch data - user: ${userDataResponse.status}, social accounts: ${socialAccountsResponse.status}`);
    }

    const [userData, socialAccountsData] = await Promise.all([
      userDataResponse.json(),
      socialAccountsResponse.json(),
    ]);

    // Append GitHub and website social accounts directly to socialAccountsData
    const websiteUrl = userData.blog.startsWith("https://") ? userData.blog : `https://${userData.blog}`;

    socialAccountsData.push(
      { provider: "github", url: `https://github.com/${username}` },
      ...(userData.blog ? [{ provider: "website", url: websiteUrl }] : [])
    );

    return { userData, socialAccountsData };
  } catch (error) {
    throw new Error(`Error fetching user data: ${error}`);
  }
};

const mapSocialAccounts = (socialAccounts: SocialAccount[]) => {
  const socialAccountsMap: { [key: string]: JSX.Element | null } = {
    linkedin: <FaLinkedin />,
    twitter: <FaXTwitter />,
    x: <FaXTwitter />,
    // instagram: <FaInstagram />,
    github: <FaGithub />,
    website: <FaGlobe /> // <SlGlobe />,
  };

  return socialAccounts
    .filter(account => socialAccountsMap.hasOwnProperty(account.provider))
    .map(account => ({
      provider: account.provider,
      url: account.url,
      icon: socialAccountsMap[account.provider],
    }));
};

export const getGhUser = async (username: string) => {
  try {
    const { userData, socialAccountsData } = await fetchUserData(username);
    const socialAccounts = mapSocialAccounts(socialAccountsData);

    return {
      ...userData,
      social_accounts: socialAccounts,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
