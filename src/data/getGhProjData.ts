import { auth } from "../lib/auth";

const fetchProject = async (repo: string, session: any) => {
  const headers: HeadersInit = {
    Authorization: `token ${session.user.accessToken}`,
  };

  const [projectDataRes, languagesRes, collaboratorsRes] = await Promise.all([
    fetch(`https://api.github.com/repos/${repo}`, { headers }),
    fetch(`https://api.github.com/repos/${repo}/languages`, { headers }),
    fetch(`https://api.github.com/repos/${repo}/collaborators`, { headers }),
  ]);

  if (![projectDataRes, languagesRes, collaboratorsRes].every((res) => res.ok)) {
    return { error: "GitHub Repository not found or unable to fetch!" };
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
    if (!session) return {error: "Login before adding a project!"};

    const projectData = await fetchProject(proj.repo, session);

    if (projectData.error) return { error: projectData.error };

    const { description, topics, languages, collaborators } =
      projectData;

    return {
      project: {
        username: session?.user.username as string,
        title: proj.title,
        description: description as string,
        repo: proj.repo,
        topics,
        languages,
        likes: [],
        collaborators,
      },
    };
  } catch (error) {
    // console.error();
    return {error:'Error fetching project data!'};
  }
};
