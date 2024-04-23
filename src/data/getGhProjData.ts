import { auth } from "../lib/auth";

const fetchProject = async (projectName: string, session: any) => {
  const projectFullName = `${session.user.username}/${projectName}`;
  const headers: HeadersInit = {
    Authorization: `token ${session.user.accessToken}`,
  };

  const [projectDataRes, languagesRes, collaboratorsRes] = await Promise.all([
    fetch(`https://api.github.com/repos/${projectFullName}`, { headers }),
    fetch(`https://api.github.com/repos/${projectFullName}/languages`, { headers }),
    fetch(`https://api.github.com/repos/${projectFullName}/collaborators`, { headers }),
  ]);

  if (![projectDataRes, languagesRes, collaboratorsRes].every((res) => res.ok)) {
    throw new Error(`Failed to fetch data`);
  }

  const [projectData, languagesData, collaboratorsData] = await Promise.all([
    projectDataRes.json(),
    languagesRes.json(),
    collaboratorsRes.json(),
  ]);

  const languages = Object.keys(languagesData);
  const collaborators = collaboratorsData.map(
    (collaborator: any) => collaborator.login
  );

  return { ...projectData, languages, collaborators };
};

export const getGhProjData = async (proj: { title: string; repo: string }) => {
  try {
    const session = await auth();
    if (!session) throw new Error("User not authenticated");

    const projectData = await fetchProject(proj.repo, session);
    const { description, full_name, topics, languages, collaborators } =
      projectData;

    return {
      project: {
        username: session?.user.username as string,
        title: proj.title,
        description,
        repo: full_name,
        topics,
        languages,
        likes: [],
        collaborators,
      },
    };
  } catch (error) {
    console.error(`Error fetching project data: ${error}`);
    throw new Error(`Error fetching project data: ${error}`);
  }
};
